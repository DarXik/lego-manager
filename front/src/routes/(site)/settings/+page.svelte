<script>
    import { enhance } from "$app/forms";
    import { userInfo } from "$lib/store";

    let currencies = ["CZK", "EUR", "USD", "GBP"];
    let languages = ["Čeština", "English", "Deutsch"];

    async function handleCurrencyChange(e) {
        const currency = currencies.indexOf(e.target.value);

        const response = await fetch("/api/updatePreference", {
            method: "PATCH",
            body: JSON.stringify({
                currency,
            }),
        });

        if (response.ok) {
            console.log(await response.json());

            $userInfo.currency = currency;
        }
    }

    async function handleLanguageChange(e) {
        const language = languages.indexOf(e.target.value);

        const response = await fetch("/api/updatePreference", {
            method: "PATCH",
            body: JSON.stringify({
                language,
            }),
        });
 
        if (response.ok) {
            console.log(await response.json());

            $userInfo.language = language;
        }
    }
</script>

<section class="px-20 mb-16 pt-32">
    <h1 class="font-bold text-3xl mb-8">Settings</h1>
    <article class="mb-12">
        <h2 class="text-2xl">Preferences</h2>
        <div class="mb-12 pt-4 border-t-2 border-gray-300 w-1/3">
            <h3 class="text-xl">Currency:</h3>

            <form class="max-w-xs mt-3">
                <!-- <label
                    for="currencies"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Select currency</label
                > -->
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
            </form>
        </div>
        <div class="">
            <h3 class="text-xl">Language:</h3>

            <form class="max-w-xs mt-3">
                <!-- <label
                    for="currencies"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Select currency</label
                > -->
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
            </form>
        </div>
    </article>
    <article>
        <h2 class="text-2xl">Account</h2>
        <div class="mb-12 pt-4 border-t-2 border-gray-300 w-1/3">
            <h3 class="text-xl">Password:</h3>

            <form
                class="max-w-xs mt-3 flex flex-col"
                method="POST"
                action="?/searchLegoSet"
                use:enhance
            >
                <label for="currentPassword">Your current password</label>
                <input
                    class="mb-3"
                    type="text"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="current password"
                />
                <div class="flex flex-col mb-6">
                    <label for="newPassword">New password</label>
                    <input
                        class="mb-1"
                        type="text"
                        name="newPassword"
                        id="newPassword"
                        placeholder="new password"
                    />
                    <label for="newPasswordRepeat">Repeat new password</label>
                    <input
                        type="text"
                        name="newPasswordRepeat"
                        id="newPasswordRepeat"
                        placeholder="repeat new password"
                    />
                </div>
                <button
                    type="submit"
                    class="end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium px-6 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:cursor-default disabled:opacity-75 disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:active:bg-gray-600 disabled:text-gray-300 select-none"
                >
                    Search
                </button>
            </form>
        </div>
    </article>
</section>

<style lang="postcss">
    input {
        @apply placeholder:italic  placeholder:text-gray-600 text-sm text-zinc-100 w-full px-3 py-2 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none  transition-all;
    }
</style>
