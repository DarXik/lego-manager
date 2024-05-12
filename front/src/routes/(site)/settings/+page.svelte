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

<section in:fade={{ delay: 50, duration: 300 }}>
    <h1
        class="font-bold text-3xl lg:text-5xl px-6 pr-32 py-8 border-r-3 border-zinc-600 w-fit"
    >
        Settings
    </h1>
    <article class="flex max-md:flex-col">
        <section class="border-main md:border-r-3 border-b-3 md:w-1/3 px-6 py-8">
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
        <section class="md:border-main border-gray-600 md:border-r-3 border-b-3 md:w-1/3 px-4 py-8">
            <h2 class="text-2xl">Password</h2>
            <div class="mt-3">
                <div>
                    <form class="max-w-xs flex flex-col">
                        <label for="currentPassword"
                            >Your current password</label
                        >
                        <input
                            class="mb-3 mt-1 my-input"
                            type="text"
                            bind:value={currentPassword}
                            id="currentPassword"
                            placeholder="current password"
                        />
                        <div class="flex flex-col mb-6">
                            <label for="newPassword">New password</label>
                            <input
                                class="mb-2 mt-1  my-input"
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
                                class="my-input mt-1 "
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
                            class="my-button-2 w-fit mt-4"
                        >
                            <span class="relative z-10">Update</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
        <section class="md:border-main md:border-b-3 md:w-1/3 px-4 py-8">
            <h3 class="text-2xl mb-3">Account:</h3>
            <button
                class="px-4 py-2  relative overflow-hidden border-2 border-red-600 bg-none text-red-600 transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-300 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-300 hover:text-zinc-100 hover:before:w-2/4 hover:before:bg-red-600 hover:after:w-2/4 hover:after:bg-red-600 select-none uppercase font-bold"
                ><span class="relative z-10">Delete account</span>
            </button>
        </section>
    </article>
</section>
