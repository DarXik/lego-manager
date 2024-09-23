<script lang="ts">
    import "../../app.css";
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let form: any;
    export let data: any;

    let password: any = "";
    let confirm_password: any = "";
    let passwordMatch: boolean = true;
    let showPassword: boolean = false;
    let username: any = "";

    onMount(() => {
        password = document.getElementById("password");
        confirm_password = document.getElementById("confirm_password");

        console.log(password);
    });

    // nekontroluje na frontu
    $: if (password && password.length > 0 && confirm_password.length > 0) {
        passwordMatch = password == confirm_password;
        console.log(passwordMatch);
    } else if (
        password &&
        password.length === 0 &&
        confirm_password.length === 0
    ) {
        passwordMatch = true;
    }

    $: if (form) {
        username = form?.username;
        console.log(username);
    }

    $: if (form?.status === 201) {
        setInterval(() => {
            goto("/login");
        }, 1000);
    } else if (form?.problem || (form?.message && form?.status !== 201)) {
        

        setTimeout(() => {
            form = null;
        }, 3000);
    }
</script>

<svelte:head>
    <title>Register</title>
    <meta name="description" content="Register for an account" />
</svelte:head>

<section
    class="flex items-center justify-center min-h-screen mx-10"
    in:fade={{ delay: 50, duration: 300 }}
>
    <div
        class:border-red-500={form?.problem}
        class="w-full max-w-md p-8 space-y-4 bg-gray-950 border border-transparent shadow-lg"
    >
        <h1 class="text-2xl font-semibold text-center">Register</h1>
        {#if (form?.status !== 201 && form?.message) || form?.problem}
            <p class="text-lg text-center font-semibold error text-red-500">
                {form?.message || form?.problem}
            </p>
        {/if}
        {#if form?.status === 201 && form?.message}
            <p class="text-lg text-center font-semibold success text-green-500">
                {form?.message}
            </p>
        {/if}
        <form method="POST" class="" use:enhance>
            <div class="flex flex-col space-y-1 mb-4">
                <label for="email" class="text-sm font-medium">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    autocomplete="off"
                    class="my-input"
                    bind:value={username}
                />
            </div>
            <div class="flex flex-col space-y-1 mb-4">
                <label for="password" class="text-sm font-medium"
                    >Password</label
                >
                <div class="w-full h-fit relative">
                    <input
                        name="password"
                        required
                        autocomplete="off"
                        class="my-input"
                        type={showPassword ? "text" : "password"}
                    />
                    <input
                        type="checkbox"
                        id="passwordCheckbox"
                        bind:checked={showPassword}
                        src="../../../signin/slashed-eye.svg"
                        alt="eye"
                        tabindex="-1"
                        class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"
                    />
                </div>
            </div>
            <div class="flex flex-col space-y-1 mb-8">
                <label for="password" class="text-sm font-medium"
                    >Confirm Password
                </label>
                <div class="w-full h-fit relative">
                    <input
                        id="confirm_password"
                        name="confirm_password"
                        required
                        autocomplete="off"
                        class="my-input"
                        type={showPassword ? "text" : "password"}
                    />
                    <input
                        type="checkbox"
                        id="passwordCheckbox"
                        bind:checked={showPassword}
                        src="../../../signin/slashed-eye.svg"
                        alt="eye"
                        tabindex="-1"
                        class="w-6 absolute top-1/2 -translate-y-1/2 right-0 -translate-x-2 z-20 cursor-pointer active:scale-90 transition-all"
                    />
                </div>
                <p
                    class:hidden={passwordMatch}
                    class="text-red-500 text-sm visible"
                >
                    Passwords do not match
                </p>
            </div>
            <button
                type="submit"
                disabled={!passwordMatch}
                class="text-base my-button-2 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed mb-8"
            >
                <span class="relative z-10">Register</span>
            </button>
        </form>
        <p class="text-sm text-center pt-4">
            Already have an account? <a
                href="/login"
                class="text-purple-500 hover:underline select-none">Log In</a
            >
        </p>
    </div>
</section>
