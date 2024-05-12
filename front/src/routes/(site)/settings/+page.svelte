<script lang="ts">
    import { enhance } from "$app/forms";
    import { userInfo } from "$lib/store";
    import { fade } from "svelte/transition";

    let currencies = ["CZK", "EUR", "USD", "GBP"];
    let languages = ["Čeština", "English", "Deutsch"];
    let newPassword: String, newPasswordRepeat: String, currentPassword: String;
    let passwordMatch: boolean = true;
    let passwordUpdated: boolean,
        currencyUpdated: boolean,
        languageUpdated: boolean = false;

    async function handleCurrencyChange(e) {
        const currency = currencies.indexOf(e.target.value).toString();

        const response = await fetch("/api/updatePreference", {
            method: "PATCH",
            body: JSON.stringify({
                currency,
            }),
        });

        if (response.ok) {
            console.log(await response.json());

            $userInfo.currency = currency;

            currencyUpdated = true;

            setTimeout(() => {
                currencyUpdated = false;
            }, 4000);
        }
    }

    async function handleLanguageChange(e) {
        const language = languages.indexOf(e.target.value).toString();

        const response = await fetch("/api/updatePreference", {
            method: "PATCH",
            body: JSON.stringify({
                language,
            }),
        });
        console.log(await response.json());

        if (response.ok) {
            $userInfo.language = language;

            languageUpdated = true;

            setTimeout(() => {
                languageUpdated = false;
            }, 4000);
        }
    }

    async function handlePasswordChange() {
        const response = await fetch("/api/updatePreference", {
            method: "PATCH",
            body: JSON.stringify({
                newPassword: newPassword,
                newPasswordRepeat: newPasswordRepeat,
                currentPassword: currentPassword,
            }),
        });

        if (response.ok) {
            console.log(await response.json());

            currentPassword = "";
            newPassword = "";
            newPasswordRepeat = "";
            passwordUpdated = true;

            setTimeout(() => {
                passwordUpdated = false;
            }, 4000);
        }
    }

    $: if (
        newPassword &&
        newPasswordRepeat &&
        newPassword.length > 0 &&
        newPasswordRepeat.length > 0
    ) {
        if (newPassword === newPasswordRepeat) {
            passwordMatch = true;
        } else {
            passwordMatch = false;
        }
    }
</script>

<section class="">
    <h1
        class="font-bold text-3xl lg:text-5xl px-6 pr-32 py-8 border-r-3 border-zinc-600 w-fit"
    >
        Settings
    </h1>
    <article class="flex">
        <section class="border-main border-r-3 border-b-3 w-1/3 px-6 py-8">
            <h2 class="text-2xl">Preferences</h2>
            <div class="mb-6 mt-3">
                <h3 class="">Currency:</h3>
                <form class="max-w-xs mt-3">
                    <select
                        id="currencies"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        on:change={(e) => handleCurrencyChange(e)}
                    >
                        {#each currencies as currency, index}
                            <option
                                selected={index === $userInfo.currency}
                                value={currency}>{currency}</option
                            >
                        {/each}
                    </select>
                    {#if currencyUpdated}
                        <p
                            transition:fade={{ duration: 200 }}
                            class="pt-2 text-green-600"
                        >
                            Currency updated
                        </p>
                    {/if}
                </form>
            </div>
            <div class="">
                <h3 class="">Language:</h3>
                <form class="max-w-xs mt-3">
                    <select
                        id="currencies"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        on:change={(e) => handleLanguageChange(e)}
                    >
                        {#each languages as language, index}
                            <option
                                selected={index === $userInfo.language}
                                value={language}>{language}</option
                            >
                        {/each}
                    </select>
                    {#if languageUpdated}
                        <p
                            transition:fade={{ duration: 200 }}
                            class="pt-2 text-green-600"
                        >
                            Language updated
                        </p>
                    {/if}
                </form>
            </div>
        </section>
        <section class="border-main border-r-3 border-b-3 w-1/3 px-4 py-8">
            <h2 class="text-2xl">Password</h2>
            <div class="mt-3">
                <div>
                    <form class="max-w-xs flex flex-col">
                        <label for="currentPassword"
                            >Your current password</label
                        >
                        <input
                            class="mb-3 my-input"
                            type="text"
                            bind:value={currentPassword}
                            id="currentPassword"
                            placeholder="current password"
                        />
                        <div class="flex flex-col mb-6">
                            <label for="newPassword">New password</label>
                            <input
                                class="mb-1 my-input"
                                type="password"
                                bind:value={newPassword}
                                id="newPassword"
                                placeholder="new password"
                            />
                            <label for="newPasswordRepeat"
                                >Repeat new password</label
                            >
                            <input
                                type="password"
                                class="my-input"
                                bind:value={newPasswordRepeat}
                                id="newPasswordRepeat"
                                placeholder="repeat new password"
                            />
                            {#if !passwordMatch}
                                <p class="mt-2 text-red-600">
                                    Passwords do not match
                                </p>
                            {/if}
                            {#if passwordUpdated}
                                <p
                                    transition:fade={{ duration: 200 }}
                                    class="mt-2 text-green-600"
                                >
                                    Password updated
                                </p>
                            {/if}
                        </div>

                        <button
                            on:click={handlePasswordChange}
                            class="end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium px-6 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:cursor-default disabled:opacity-75 disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:active:bg-gray-600 disabled:text-gray-300 select-none"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </section>
        <section class="border-main  border-b-3 w-1/3 px-4 py-8">
            <h3 class="text-2xl mb-3">Delete account:</h3>
            <button
                class="px-4 py-2 text-red-500 border-2 border-red-500 cursor-pointer select-none transition-all hover:text-black hover:bg-red-500 active:scale-90 focus:bg-red-500 focus:text-black uppercase"
                >Delete account</button
            >
        </section>
    </article>
</section>
