<script lang="ts">
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";

    // $: isInSlug = $page.url.pathname.includes("/set/");

    let isExpanded: boolean = false;

    function clickHandler() {
        isExpanded = !isExpanded;
    }

    async function logout() {
        isExpanded = false;

        const request = await fetch("/api/logout", {
            method: "PATCH",
        });
        console.log(request.status);
        if (request) {
            window.location.href = "/login";
        }
    }

    let accountHover: boolean = false;
    let addHover: boolean = false;
    let isVisible: boolean = true;
    let w: number;

    onMount(() => {
        w = window.innerWidth;
    });

    $: if (w > 768) isVisible = false;
</script>

<!-- <svelte:window bind:scrollY={y} /> -->

<nav
    
    class=" fixed md:hidden z-30 top-0 w-full bg-gray-950 h-20 border-gray-600"
>
    <div class="flex justify-between items-center px-3 h-full">
        <a href="/" title="home">
            <img
                src="../../../../navbar/lego-logo.svg"
                alt="lego logo"
                class="w-12 h-12 transition-all active:scale-90"
            />
        </a>
        <button on:click={() => (isVisible = !isVisible)}
            ><img
                src="../../../../navbar/hamburger.svg"
                alt="hamburger"
                class="w-12 h-12 md:hidden"
            /></button
        >
    </div>
</nav>
{#if isVisible}
    <div
        in:slide={{ duration: 400 }}
        out:slide={{ duration: 200 }}
        class="z-20 absolute md:hidden top-0 left-0 w-screen h-screen bg-gray-950 flex flex-col justify-center items-center gap-y-16"
    >
        <div class="flex flex-col gap-y-4">
            <a on:click={() => isVisible = !isVisible}
                class="text-zinc-100 px-10 py-3 border-2 border-zinc-100"
                href="/add-set">Add set</a
            >
            <a on:click={() => isVisible = !isVisible}
                class="text-zinc-100 px-10 py-3 border-2 border-zinc-100"
                href="/account">Account</a
            >
        </div>
        <div class="flex flex-col gap-y-4">
            <a on:click={() => isVisible = !isVisible}
                class="text-zinc-100 px-10 py-3 border-2 border-zinc-100"
                href="/settings">Settings</a
            >
            <button class="text-zinc-100 px-10 py-3 border-2 border-zinc-100" title="logout" on:click={logout}>
                Logout
            </button>
        </div>
    </div>
{/if}

<nav
    class="md:h-screen max-md:hidden fixed z-20 top-0 w-full md:w-24 bg-gray-950 border-r-[3px] border-zinc-600 flex flex-row md:flex-col justify-between py-6"
>
    <div>
        <div class="md:pb-6 px-6 md:border-b-3 border-zinc-600 items-center">
            <a href="/" title="home">
                <img
                    src="../../../../navbar/lego-logo.svg"
                    alt="lego logo"
                    class="w-12 h-12 transition-all active:scale-90"
                />
            </a>
        </div>
        <div
            class="hidden md:visible md:flex flex-col items-center py-6 px-6 gap-y-6"
        >
            <a
                title="account"
                href="/account"
                class=" active:scale-90 transition-all"
                on:mouseenter={() => (accountHover = true)}
                on:mouseleave={() => (accountHover = false)}
            >
                <svg
                    class="w-9 h-9 transition-all"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        class="transition-all"
                        cx="12"
                        cy="9"
                        r="3"
                        stroke={accountHover ? "#1f53c2" : "#e4e4e7"}
                        stroke-width="1.5"
                    />
                    <circle
                        class="transition-all"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke={accountHover ? "#1f53c2" : "#e4e4e7"}
                        stroke-width="1.5"
                    />
                    <path
                        class="transition-all"
                        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                        stroke={accountHover ? "#1f53c2" : "#e4e4e7"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </a>
            <a
                title="add new set"
                href="/add-set"
                class=" active:scale-90 transition-all"
                on:mouseenter={() => (addHover = true)}
                on:mouseleave={() => (addHover = false)}
            >
                <svg
                    class="w-9 h-9 transition-all"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        class="transition-all"
                        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                        stroke={addHover ? "#37a314" : "#e4e4e7"}
                        stroke-width="1.5"
                    />
                    <path
                        class="transition-all"
                        d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                        stroke={addHover ? "#37a314" : "#e4e4e7"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </a>
        </div>
    </div>
    <div
        class="hidden md:visible md:flex flex-col gap-y-3 items-center border-t-[3px] border-zinc-600 pt-6"
    >
        <a title="settings" href="/settings">
            <img
                src="../../../../navbar/settings.svg"
                alt="settings"
                class="w-7 h-7 hover:rotate-45 transition-all active:scale-90"
            />
        </a>
        <button title="logout" on:click={logout}>
            <img
                src="../../../../navbar/logout.svg"
                alt="logout"
                class="w-8 h-8 hover:translate-x-1 transition-all active:scale-90"
            />
        </button>
    </div>
</nav>
