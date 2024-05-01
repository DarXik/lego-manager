<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { isSearching } from "$lib/store";
    import { userInfo } from "$lib/store";

    let isInSlug: boolean = false;

    $: isInSlug = $page.url.pathname.includes("/set/");
</script>

<nav class="w-full fixed top-0 left-0 z-10">
    <div class="flex justify-between items-center relative z-40 px-20">
        <div
            class=" flex flex-row items-center justify-between w-full gap-3 py-4"
        >
            <button class="active:scale-90 transition-all" title="go home"
                ><a href="/"
                    ><img
                        src="../../lego-logo.png"
                        alt="lego"
                        class="w-12 cursor-pointer"
                    /></a
                ></button
            >
        </div>
        <div class="w-full flex items-center justify-end gap-3 h-full">
            <button
                class="border-2 border-gray-300 p-2 px-4 hover:bg-gray-300 hover:text-black focus:bg-gray-300 focus:text-black transition-all"
                ><a href="/add-set" class="select-none cursor-pointer"
                    >Add set</a
                ></button
            >
            <button
                class="border-2 border-gray-300 p-2 px-4 hover:bg-gray-300 hover:text-black focus:bg-gray-300 focus:text-black transition-all"
                ><a href="/settings" class="select-none cursor-pointer"
                    >Settings</a
                ></button
            >

            <div
                class="border-l-2 borde-white pl-3 flex flex-col items-center justify-center"
            >
                <button
                    class="active:scale-90 transition-all select-none cursor-pointer w-8 h-8"
                    title="account"
                >
                    <a href="/account"
                        ><img
                            class=" fill-black bg-[#ffd502d0] bg-yellow-[#ffd502] rounded-xl p-1"
                            src="../../../../lego-head.svg"
                            alt="account"
                        />
                    </a>
                </button>
            </div>
        </div>
    </div>
    <div
        class="h-full w-full absolute top-0 left-0 z-20 backdrop-blur-lg bg-black/85 shadow-lg"
    ></div>
</nav>
