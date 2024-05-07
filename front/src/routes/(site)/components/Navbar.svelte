<script lang="ts">
    import { slide } from "svelte/transition";
    import { clickOutside } from "../../../utils/clickOutside";

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
        if (request.ok) {
            window.location.href = "/login";
        }
    }
</script>

<nav class="w-full fixed top-0 left-0 z-10 border-b-2 border-zinc-400">
    <div class="flex justify-between items-center relative z-40 px-20">
        <div
            class=" flex flex-row items-center justify-start w-full gap-6 py-4"
        >
            <a href="/" class="active:scale-90 transition-all" title="go home"
                ><img
                    src="../../lego-logo.png"
                    alt="lego"
                    class="w-12 cursor-pointer"
                /></a
            >
            <div class="w-[2px] h-6 bg-gray-400"></div>
            <a
                href="/add-set"
                class="select-none cursor-pointer border-2 border-gray-300 p-2 px-4 hover:bg-gray-300 hover:text-black focus:bg-gray-300 focus:text-black transition-all"
                >Add set</a
            >
        </div>
        <div class="w-full flex items-center justify-end gap-3 h-full">
            <!-- <button
                class="border-2 border-gray-300 p-2 px-4 hover:bg-gray-300 hover:text-black focus:bg-gray-300 focus:text-black transition-all"
                ><a href="/settings" class="select-none cursor-pointer"
                    >Settings</a
                ></button
            > -->

            <div class=" flex flex-col items-center justify-center">
                <button
                    class="active:scale-90 transition-all select-none cursor-pointer w-9 h-9"
                    title="account"
                    on:click={clickHandler}
                >
                    <!-- <a href="/account"
                        > -->
                    <img
                        class=" fill-black bg-[#ffd502d0] bg-yellow-[#ffd502] rounded-xl p-1"
                        src="../../../../lego-head.svg"
                        alt="account"
                    />
                    <!-- </a> -->
                </button>
            </div>
            {#if isExpanded}
                <div
                    use:clickOutside={() => (isExpanded = isExpanded)}
                    class="absolute z-0 bg-black top-full border-2 border-zinc-400 p-3 pr-14"
                >
                    <ul
                        class="flex flex-col gap-y-2"
                        transition:slide={{ duration: 200, axis: "y" }}
                    >
                        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
                        <li
                            on:click={clickHandler}
                            class="hover:text-white transition-all text-gray-400 hover:translate-x-2 cursor-pointer"
                        >
                            <a href="/account">Account</a>
                        </li>
                        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
                        <li
                            on:click={clickHandler}
                            class="hover:text-white transition-all text-gray-400 hover:translate-x-2 cursor-pointer"
                        >
                            <a href="/settings">Settings</a>
                        </li>
                        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
                        <li
                            on:click={clickHandler}
                            class="hover:text-white transition-all text-gray-400 hover:translate-x-2 cursor-pointer"
                        >
                            <button on:click={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>
    <div
        class="h-full w-full absolute top-0 left-0 z-20 backdrop-blur-lg bg-black/85 shadow-lg"
    ></div>
</nav>
