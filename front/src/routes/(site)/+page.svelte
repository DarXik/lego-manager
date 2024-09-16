<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";

    export let data: PageData;
    let sets: any = [];
    let w: number;
    let ascending: boolean = true;
    let currentKey: string = "name";

    console.log(data);

    $: sort = (filter: string) => {
        ascending = !ascending;
        let order = !ascending;
        currentKey = filter;

        sets = sets.slice().sort((a: any, b: any) => {
            if (a[filter] < b[filter]) {
                return -1 * (order ? 1 : -1);
            }
            if (a[filter] > b[filter]) {
                return 1 * (order ? 1 : -1);
            }
            return 0;
        });
    };

    onMount(() => {
        w = window.innerWidth;
        if (data.sets.length > 0 || sets.length > 0) {
            sets = data.sets.slice().sort((a: any, b: any) => a.name > b.name);

            for (const key in sets) {
                sets[key].localId = parseInt(key);
            }
        }
    });
</script>

<section in:fade={{ delay: 50, duration: 300 }}>
    <article class="flex max-md:flex-col">
        <div class="p-8 border-r-3 border-zinc-600 w-full md:w-1/2">
            <h1 class="font-bold uppercase text-3xl md:text-4xl lg:text-5xl">
                Your sets <span class="text-xl text-zinc-400"
                    >({sets.length})</span
                >
            </h1>
        </div>
        <div
            class="w-full md:w-1/2 flex h-full justify-center md:justify-start md:self-end border-main"
        >
            <div class="flex border-zinc-600">
                <button
                    on:click={() => sort("name")}
                    class:currentKey={currentKey === "name"}
                    class="uppercase max-md:border-l-3 border-r-3 border-zinc-600 p-2 flex items-center gap-2"
                    ><p>name</p>
                    <svg
                        class="w-3.5 h-3.5 transition-all"
                        class:rotate-180={ascending && currentKey === "name"}
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill={currentKey === "name" ? "#fffffff" : "#e4e4e7"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.16496 4.49747L10.5275 21.0072C11.1178 22.3309 12.8822 22.3309 13.4725 21.0072L20.835 4.49747C21.5021 3.00163 20.0209 1.45006 18.6331 2.19099L12.7294 5.34303C12.2702 5.58818 11.7298 5.58818 11.2706 5.34303L5.36689 2.19099C3.97914 1.45007 2.49789 3.00163 3.16496 4.49747Z"
                            stroke={currentKey === "name"
                                ? "#fffffff"
                                : "#e4e4e7"}
                            stroke-width="1.5"
                        />
                    </svg>
                </button>
                <button
                    on:click={() => sort("themeName")}
                    class:currentKey={currentKey === "themeName"}
                    class="uppercase border-r-3 border-zinc-600 p-2 flex items-center gap-2"
                    ><p>Theme</p>
                    <svg
                        class="w-3.5 h-3.5 transition-all"
                        class:rotate-180={ascending &&
                            currentKey === "themeName"}
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill={currentKey === "themeName"
                            ? "#fffffff"
                            : "#e4e4e7"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.16496 4.49747L10.5275 21.0072C11.1178 22.3309 12.8822 22.3309 13.4725 21.0072L20.835 4.49747C21.5021 3.00163 20.0209 1.45006 18.6331 2.19099L12.7294 5.34303C12.2702 5.58818 11.7298 5.58818 11.2706 5.34303L5.36689 2.19099C3.97914 1.45007 2.49789 3.00163 3.16496 4.49747Z"
                            stroke={currentKey === "themeName"
                                ? "#fffffff"
                                : "#e4e4e7"}
                            stroke-width="1.5"
                        />
                    </svg>
                </button>
                <button
                    on:click={() => sort("setNumber")}
                    class:currentKey={currentKey === "setNumber"}
                    class="uppercase border-r-3 border-zinc-600 p-2 flex items-center gap-2"
                    ><p>Set number</p>
                    <svg
                        class="w-3.5 h-3.5 transition-all"
                        class:rotate-180={ascending &&
                            currentKey === "setNumber"}
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill={currentKey === "setNumber"
                            ? "#fffffff"
                            : "#e4e4e7"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.16496 4.49747L10.5275 21.0072C11.1178 22.3309 12.8822 22.3309 13.4725 21.0072L20.835 4.49747C21.5021 3.00163 20.0209 1.45006 18.6331 2.19099L12.7294 5.34303C12.2702 5.58818 11.7298 5.58818 11.2706 5.34303L5.36689 2.19099C3.97914 1.45007 2.49789 3.00163 3.16496 4.49747Z"
                            stroke={currentKey === "setNumber"
                                ? "#fffffff"
                                : "#e4e4e7"}
                            stroke-width="1.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </article>
    <article class="p-8 border-main">
        <div
            class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:auto-rows-fr gap-6 md:w-fit max-md:flex flex-col items-center w-full"
        >
            {#if sets.length > 0}
                {#each sets as set}
                    <button
                        class="w-64 h-fit md:w-72 md:h-72 group"
                        on:click={() => goto(`/set/${set.id}`)}
                    >
                        <div
                            class="group-hover:border-zinc-100 transition-all group-active:scale-95 group-focus:border-zinc-100 bg-black/50 border border-gray-600/50 h-full w-full"
                        >
                            <div
                                class="border-b border-gray-600/50 group-hover:border-zinc-100 transition-all py-2 px-4 h-[15%]"
                            >
                                <p class="text-start">{set.localId + 1}</p>
                            </div>
                            <div
                                class="flex flex-col justify-between py-2 px-4 md:h-[85%]"
                            >
                                <div>
                                    <p
                                        class="text-xl font-bold text-start max-md:mb-8"
                                    >
                                        {set.name}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-start h-fit max-md:hidden">
                                        <span class="text-gray-500 text-sm"
                                            >theme</span
                                        >
                                        {set.themeName}
                                    </p>
                                    <p class="text-start">
                                        <span class="text-gray-500 text-sm"
                                            >set no.</span
                                        >
                                        {set.setNumber}
                                    </p>
                                    <p class="text-start">
                                        <span class="text-gray-500 text-sm"
                                            >added on</span
                                        >
                                        {new Date(set.addedOn)
                                            .toLocaleString("de-DE")
                                            .split(",")[0]}
                                    </p>
                                    <p class="text-start" class:hidden={set.addedBy == data.username}>
                                        <span class="text-gray-500 text-sm"
                                            >owned by</span
                                        >
                                        <span>
                                            {set.addedBy}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </button>
                {/each}
            {:else}
                <p class="italic text-gray-400 bg-red">No sets found</p>
            {/if}
        </div>
    </article>
</section>

<style lang="postcss">
    .currentKey {
        @apply bg-zinc-400 text-black transition-all;
    }
</style>
