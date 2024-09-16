<script lang="ts">
    import "../../app.css";
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let form: any;
    export let data: any;

    let password: any = "";
    let passwordMatch: boolean = false;
    let showPassword: boolean = false;

    onMount(() => {
        password = document.getElementById("password");
    });

    $: if (password.length === 0) {
        passwordMatch = false;
    }

    $: if (form?.success) goto("/");
</script>

<section
    class="flex items-center justify-center min-h-screen mx-10"
    in:fade={{ delay: 50, duration: 300 }}
>
    <div
        class:border-red-500={form?.problem}
        class="w-full max-w-md p-8 space-y-4 bg-gray-950 border border-gray-900 shadow-lg"
    >
        <h1 class="text-2xl font-semibold text-center">Log In</h1>
        {#if form?.problem}
            <p class="text-lg text-center font-semibold error text-red-500">
                {form?.problem.message}
            </p>
        {/if}
        <form method="POST" class="" use:enhance>
            <div class="flex flex-col space-y-1 mb-4">
                <label for="email" class="text-sm font-medium"
                    >Username</label
                >
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={form?.email ?? ""}
                    required
                    autocomplete="off"
                    class="my-input"
                />
            </div>
            <div class="flex flex-col space-y-1 mb-8">
                <label
                    for="password"
                    class="text-sm font-medium peer-focus:text-white -order-last transition-all duration-200"
                    >Password</label
                >
                <div class="w-full h-fit relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        autocomplete="off"
                        class="my-input"
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
            <button
                type="submit"
                disabled={passwordMatch}
                class="text-base my-button-2 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed mb-8 mt-4"
            >
                <span class="relative z-10">Sign In</span>
            </button>
        </form>
        <p class="text-sm text-center pt-4">
            Don't have an account? <a
                href="/register"
                class="text-purple-500 hover:underline select-none"
                >Register here</a
            >
        </p>
    </div>
</section>
