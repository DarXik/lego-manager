<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";
    import type { PageData } from "./$types";

    export let data: PageData;

    let currencies = ["CZK", "EUR", "USD", "GBP"];
    let languages = ["Čeština", "English", "Deutsch"];
    let newPassword: String, newPasswordRepeat: String, currentPassword: String;
    let passwordMatch: boolean = true;
    let passwordUpdated: boolean,
        currencyUpdated: boolean,
        languageUpdated: boolean = false;
    let newUsername: String;
    let usernameUpdatedStatus: any = "";

    let deletingAccount: boolean = false;
    let modalDelete: HTMLDialogElement;
    $: if (deletingAccount) modalDelete.showModal();

    let sending: boolean = false;

    async function handleCurrencyChange(e: any) {
        const currency = currencies.indexOf(e.target.value).toString();

        const response = await fetch("/api/updatePreference", {
            method: "PATCH",
            body: JSON.stringify({
                currency,
            }),
        });

        if (response.ok) {
            console.log(await response.json());

            data.currency = currency; // neupdatuje - použít store

            currencyUpdated = true;

            setTimeout(() => {
                currencyUpdated = false;
            }, 2000);
        }
    }

    async function handleLanguageChange(e: any) {
        const language = languages.indexOf(e.target.value).toString();

        const response = await fetch("/api/updatePreference", {
            method: "PATCH",
            body: JSON.stringify({
                language,
            }),
        });
        console.log(await response.json());

        if (response.ok) {
            data.language = language;

            languageUpdated = true;

            setTimeout(() => {
                languageUpdated = false;
            }, 2000);
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
            }, 2000);
        }
    }

    async function deleteSession(id: string) {
        const response = await fetch("/api/deleteSession", {
            method: "DELETE",
            body: JSON.stringify({
                id,
            }),
        });

        console.log(await response.json())

        if (response.ok) {
            console.log(await response.json());
            window.location.reload();
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

    let sessions: any[] = data.sessions;
    sessions.sort(
        (a: any, b: any) =>
            new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime(),
    );
</script>

<svelte:head>
    <title>Settings</title>
    <meta name="description" content="Settings" />
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- 
<dialog
    class="border-3 border-zinc-600 bg-black
        text-zinc-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%]"
    bind:this={modalDelete}
    on:close={() => (deletingAccount = false)}
    on:click|self={() => modalDelete.close()}
>
    <div on:click|stopPropagation>
        <div class="border-b-3 border-zinc-600 p-2 pb-8 text-white">
            <p class="mb-1 text-3xl font-bold">Delete account:</p>
        </div>
        <div class="p-2 text-lg">
            <p>
                &bull; Account will be deleted and no one can reverse it.<br />
                &bull; Your sets already added by others will not be deleted.
                <br />
                &bull; This action cannot be undone.
            </p>
        </div>

        <form
            method="POST"
            class="flex flex-row justify-evenly mt-12 border-main"
            action="?/deleteAccount"
        >
            <button
                type="submit"
                class="w-full py-2 font-bold text-red-600 hover:text-black hover:bg-red-600 transition-all border-r-[1.5px] border-zinc-600"
                >I am sure</button
            >
            <button
                class="w-full py-2 text-zinc-100 hover:text-black hover:bg-zinc-300 transition-all p-2 px-4 border-l-[1.5px] border-zinc-600"
                on:click={() => modalDelete.close()}>Go back</button
            >
        </form>
    </div>
</dialog> -->

<div in:fade={{ delay: 50, duration: 300 }}>
    <h1
        class="font-bold text-3xl lg:text-5xl px-6 pr-32 py-8 border-r-3 border-zinc-600 w-fit"
    >
        Settings
    </h1>
    <div class="flex flex-col">
        <div class="flex max-md:flex-col">
            <div
                class="border-main md:border-r-3 border-b-3 md:w-1/3 px-6 py-8"
            >
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
                                    selected={index === data.currency}
                                    value={currency}>{currency}</option
                                >
                            {/each}
                        </select>
                        <p class="italic text-gray-400 text-sm">
                            *experimental feature
                        </p>
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
                                    selected={index === data.language}
                                    value={language}>{language}</option
                                >
                            {/each}
                        </select>
                        <p class="italic text-gray-400 text-sm">
                            *not working yet
                        </p>
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
            </div>
            <div
                class="md:border-main border-gray-600 md:border-r-3 border-b-3 md:w-1/3 px-4 py-8"
            >
                <h2 class="text-2xl">Username</h2>
                <div class="mt-3">
                    <form
                        method="POST"
                        action="?/updateUsername"
                        enctype="multipart/form-data"
                        use:enhance={() => {
                            sending = true;
                            return async ({ result }) => {
                                if (result) {
                                    sending = false;
                                    usernameUpdatedStatus = result.data;
                                    console.log(usernameUpdatedStatus);
                                    // data.username = newUsername;

                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000);
                                }
                            };
                        }}
                    >
                        <p class="mb-3">
                            Your current username is <span
                                class="text-lg text-purple-400"
                            >
                                {data.username}</span
                            >
                        </p>
                        <div class="flex flex-col mb-6">
                            <label for="newUsername">New username</label>
                            <input
                                class="mb-2 mt-1 my-input"
                                name="newUsername"
                                type="text"
                                required
                                bind:value={newUsername}
                                id="newUsername"
                                placeholder="new username"
                                autocomplete="off"
                            />
                            {#if usernameUpdatedStatus.message}
                                <p
                                    transition:fade={{ duration: 200 }}
                                    class="mt-2 text-green-600"
                                >
                                    {usernameUpdatedStatus.message}
                                </p>
                            {:else if usernameUpdatedStatus.problem}
                                <p
                                    transition:fade={{ duration: 200 }}
                                    class="mt-2 text-red-600"
                                >
                                    {usernameUpdatedStatus.problem}
                                </p>
                            {/if}
                        </div>

                        <button class="my-button-2 w-fit mt-4">
                            <span class="relative z-10">Update</span>
                        </button>
                    </form>
                </div>
            </div>
            <div
                class="md:border-main border-gray-600 md:border-r-3 border-b-3 md:w-1/3 px-4 py-8"
            >
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
                                    class="mb-2 mt-1 my-input"
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
                                    class="my-input mt-1"
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
            </div>
        </div>
        <div class=" border-gray-600 md:border-r-3 border-b-3 px-4 py-8">
            <h2 class="text-2xl">
                Sessions <span class="text-sm text-zinc-400"
                    >({sessions.length})</span
                >
            </h2>
            <div class="mt-3">
                <div class="flex flex-row gap-x-12">
                    <div class="flex flex-col">
                        <p class="mb-1.5">Active since</p>
                        {#each sessions as session}
                            {#if session.addedOn}
                                <p class="text-sm mb-1">
                                    {new Date(session.addedOn).toLocaleString(
                                        "de-DE",
                                        {
                                            dateStyle: "short",
                                            timeStyle: "short",
                                        },
                                    )}
                                </p>
                            {:else}
                                <p class="text-sm italic mb-1 text-zinc-400">
                                    Unknown
                                </p>
                            {/if}
                        {/each}
                    </div>
                    <div class="flex flex-col">
                        <p class="mb-1.5">Device</p>
                        {#each sessions as session}
                            {#if session.os && session.browser}
                                <p class="text-sm mb-1">
                                    {session.os}
                                    <span class="text-zinc-400">&bull;</span>
                                    {session.browser}
                                </p>
                            {:else}
                                {#if session.os}
                                    <p class="text-sm mb-1">{session.os}</p>
                                {:else}
                                    <p
                                        class="text-sm italic mb-1 text-zinc-400"
                                    >
                                        Unknown
                                    </p>
                                {/if}
                                {#if session.browser}
                                    <p class="text-sm mb-1">
                                        {session.browser}
                                    </p>
                                {:else}
                                    <p
                                        class="text-sm italic mb-1 text-zinc-400"
                                    >
                                        Unknown
                                    </p>
                                {/if}
                            {/if}
                        {/each}
                    </div>
                    <div>
                        <p class="mb-1.5">Location</p>
                        {#each sessions as session}
                            <div class="flex flex-row gap-x-6">
                                {#if session.location}
                                    <p class="text-sm mb-1">
                                        {session.location}
                                    </p>
                                {:else}
                                    <p
                                        class="text-sm italic mb-1 text-zinc-400"
                                    >
                                        Unknown
                                    </p>
                                {/if}
                                <button
                                    title="Delete session"
                                    on:click={() => deleteSession(session.id)}
                                    class="pr-4 self-center hover:scale-105 transition-all active:scale-95"
                                >
                                    <img
                                        src="../../../../settings/remove.svg"
                                        alt={session.id}
                                        class="w-5"
                                    />
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- <section class="md:border-main md:border-b-3 md:w-1/3 px-4 py-8">
            <h3 class="text-2xl mb-3">Account:</h3>
            <button
                on:click={() => (deletingAccount = !deletingAccount)}
                class="px-4 py-2 relative overflow-hidden border-2 border-red-600 bg-none text-red-600 transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-300 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-300 hover:text-zinc-100 hover:before:w-2/4 hover:before:bg-red-600 hover:after:w-2/4 hover:after:bg-red-600 select-none uppercase font-bold"
                ><span class="relative z-10">Delete account</span>
            </button>
        </section> -->
    </div>
</div>

<!-- <style>
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style> -->
