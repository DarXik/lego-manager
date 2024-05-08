<script lang="ts">
    import { userSets } from "$lib/store";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    // export let form;
    // export let data;
    let sets: any = [];

    $: if ($userSets) sets = $userSets;

    let ascending: boolean = true;
    let currentKey: string = "name";

    $: sort = (filter: string) => {
        ascending = !ascending;
        let order = !ascending;
        currentKey = filter;

        sets = sets.slice().sort((a, b) => {
            if (a[filter] < b[filter]) {
                return -1 * (order ? 1 : -1);
            }
            if (a[filter] > b[filter]) {
                return 1 * (order ? 1 : -1);
            }
            return 0;
        });
    };

    $: console.log(currentKey);
</script>

<section class="">
    <article class="flex">
        <div class="px-6 py-8 border-r-3 border-zinc-600 w-1/2">
            <h1
                class="font-bold uppercase text-center text-3xl md:text-4xl lg:text-5xl"
            >
                added sets
            </h1>
        </div>
        <div class="w-1/2 flex h-full justify-start self-end border-main">
            <div class="flex border-zinc-600">
                <button
                    on:click={() => sort("name")}
                    class:currentKey={currentKey === "name"}
                    class="uppercase border-r-3 border-zinc-600 p-2 flex items-center gap-2"
                    ><p>name</p>
                    <svg
                        class="w-3.5 h-3.5"
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
                        class="w-3.5 h-3.5"
                        class:rotate-180={ascending && currentKey === "themeName"}
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
                        class="w-3.5 h-3.5"
                        class:rotate-180={ascending && currentKey === "setNumber"}
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
            class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:auto-rows-fr gap-6 w-fit"
        >
            {#if sets.length > 0}
                {#each sets as set, index}
                    <button
                        class="w-64 h-64 md:w-72 md:h-72 group"
                        on:click={() => goto(`/set/${set.id}`)}
                    >
                        <div
                            class="group-hover:border-zinc-100 transition-all group-active:scale-95 group-focus:border-zinc-100 bg-black/50 border border-gray-600/50 h-full w-full"
                        >
                            <div
                                class="border-b border-gray-600/50 group-hover:border-zinc-100 transition-all py-2 px-4 h-[15%]"
                            >
                                <p class="text-start">{index + 1}</p>
                            </div>
                            <div
                                class="flex flex-col justify-between py-2 px-4 h-[85%]"
                            >
                                <div>
                                    <p class="text-xl font-bold text-start">
                                        {set.name}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-start h-fit">
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
