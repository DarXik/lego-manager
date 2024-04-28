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
    <div class="flex justify-between items-center relative z-40">
        <div
            class=" flex flex-row items-center justify-between w-full gap-3 px-20 py-4"
        >
            <button class="active:scale-90 transition-all"
                ><a href="/"
                    ><img
                        src="../../LEGO_logo.svg"
                        alt="lego"
                        class="w-12 cursor-pointer mr-8"
                    /></a
                ></button
            >
        </div>
        <div class="w-full flex items-center justify-end gap-3 h-full px-20">
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
            <div class="h-6 ml-4 pl-4 w-fit border-l-2 bg-transparent">
                <p class="text-gray-400 text-sm">
                    user: <span class="text-lg font-bold text-zinc-100"
                        >{$userInfo.username}</span
                    >
                </p>
            </div>
        </div>
    </div>
    <div
        class="h-full w-full absolute top-0 left-0 z-20 backdrop-blur-lg bg-black/50 shadow-lg"
    ></div>
</nav>
