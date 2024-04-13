<script lang="ts">
    import "../../app.css";
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    export let form: any;
    export let data: any;

    let password: any = "";
    let confirm_password: any = "";
    let passwordMatch: boolean = false;
    let showPassword: boolean = false;

    onMount(() => {
        password = document.getElementById("password");
        confirm_password = document.getElementById("confirm_password");
    });

    function submit() {}
    $: if (password.length > 0 && confirm_password.length > 0) {
        passwordMatch = password !== confirm_password;
    } else if (password.length === 0 && confirm_password.length === 0) {
        passwordMatch = false;
    }
</script>

<div
    class="flex items-center justify-center min-h-screen"
    in:fade={{ delay: 50, duration: 300 }}
>
    <div
        class:border-red-500={form?.problem}
        class="w-full max-w-md p-8 space-y-4 bg-white border border-transparent rounded-2xl shadow-lg"
    >
        <h1 class="text-2xl font-semibold text-center">Sign Up</h1>
        {#if form?.problem}
            <p class="text-lg text-center font-semibold error text-red-500">
                {form?.problem}
            </p>
        {/if}
        <form method="POST" class="space-y-4" use:enhance>
            <div class="flex flex-col space-y-1">
                <label for="email" class="text-sm font-medium">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    autocomplete="off"
                    class="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
            </div>
            <div class="flex flex-col space-y-1">
                <label for="email" class="text-sm font-medium"
                    >Email address</label
                >
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={form?.email ?? ""}
                    required
                    autocomplete="off"
                    class="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
            </div>
            <div class="flex flex-col space-y-1">
                <label for="password" class="text-sm font-medium"
                    >Password</label
                >
                <div class="w-full h-fit relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        autocomplete="off"
                        class="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 relative z-10 w-full"
                    />
                    <input
                        type="checkbox"
                        id="paswwordCheckbox"
                        bind:checked={showPassword}
                        src="../../../signin/slashed-eye.svg"
                        alt="eye"
                        class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"
                    />
                </div>
            </div>
            <div class="flex flex-col space-y-1">
                <label for="password" class="text-sm font-medium"
                    >Confirm Password
                </label>
                <div class="w-full h-fit relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirm_password"
                        name="password"
                        required
                        autocomplete="off"
                        class="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 relative z-10 w-full"
                    />
                    <input
                        type="checkbox"
                        bind:checked={showPassword}
                        src="../../../signin/slashed-eye.svg"
                        alt="eye"
                        class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"
                    />
                </div>
                <p class:hidden={!passwordMatch} class="text-red-500 text-sm">
                    Passwords do not match
                </p>
            </div>
            <button
                type="submit"
                on:click={submit}
                disabled={passwordMatch}
                class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
                Sign Up
            </button>
        </form>
        <p class="text-sm text-center">
            Already have an account? <a
                href="/login"
                class="text-blue-600 hover:underline select-none">Log In</a
            >
        </p>
    </div>
</div>
