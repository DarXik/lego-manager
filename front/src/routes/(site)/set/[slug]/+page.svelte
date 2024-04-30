<script lang="ts">
    import { onMount } from "svelte";
    import { navbarHeight } from "$lib/store";
    import InfoCardwIcon from "./components/InfoCardwIcon.svelte";

    export let data;

    // let set = $userSets.find((set) => set.id == data.slug);
    let set = data.set;
</script>

<section>
    {#if set}
        <article class="h-[100vh] flex flex-row">
            <div
                class="w-1/2 h-full flex flex-col justify-between bg-gradient-to-br from-black from-50% to-red-950 px-20"
            >
                <div>
                    <p
                        class="text-gray-500 text-xs break-normal mb-1"
                        style="padding-top: {$navbarHeight + 32}px;"
                    >
                        name
                    </p>
                    <h1
                        class="font-extrabold text-4xl lg:text-6xl uppercase mb-20"
                    >
                        {set.name}
                    </h1>
                    <p class="text-gray-500 text-xs break-normal mb-1">
                        description
                    </p>
                    <p class="font-semibold text-xl mb-16 lg:w-10/12">
                        {#if set.description}
                            {set.description}
                        {:else}
                            <span class="italic text-gray-400"
                                >No description</span
                            >
                        {/if}
                    </p>
                </div>
                <div class="">
                    <div
                        class="flex flex-wrap gap-6 gap-x-8 mb-12 border-t-2 pt-4 border-zinc-300"
                    >
                        <InfoCardwIcon
                            title="Set number"
                            path="number-icon.svg"
                            text={set.setNumber}
                        />

                        <InfoCardwIcon
                            title="bricks"
                            path="bricks-icon.svg"
                            text={set.partsAmount}
                        />

                        <InfoCardwIcon
                            title="yr. of relased"
                            path="year-released-icon.svg"
                            text={set.yearReleased}
                        />

                        <InfoCardwIcon
                            title="yr. of purchase"
                            path="year-bough-icon.svg"
                            text={set.yearBought}
                        />

                        <InfoCardwIcon
                            title="Theme ID"
                            path="number-icon.svg"
                            text={set.themeId}
                        />

                        <InfoCardwIcon
                            title="Theme name"
                            path="collection-icon.svg"
                            text={set.themeName}
                        />

                        <InfoCardwIcon
                            title="Price"
                            path="price-euro-icon.svg"
                            text={set.price}
                        />

                        <InfoCardwIcon
                            title="Added on"
                            path="collection-icon.svg"
                            text={new Date(set.addedOn)
                                .toLocaleString({
                                    timeZone: "Europe/Paris",
                                })
                                .split(",")[0]}
                        />
                    </div>
                </div>
            </div>
            <div class="w-1/2 h-full bg-no-repeat bg-cover bg-center bg-black">
                <img
                    loading="lazy"
                    class="h-full w-full object-cover"
                    src={set.image
                        ? `http://localhost:3000/api/v1/image/${set.image}`
                        : "../../../placeholder.webp"}
                    alt={set.image ? "image" : "no image"}
                />
            </div>
        </article>
        {#if set.allInstructions}
            <article
                class="px-20 mb-16 w-1/2 mt-24 flex flex-col items-start justify-center h-[100vh]"
            >
                <div
                    class="flex flex-col mb-16 border-b-2 border-zinc-300 pb-4 w-full"
                >
                    <h2 class="text-4xl font-bold mb-8">Instructions</h2>
                    <di class="flex flex-row gap-6">
                        <button
                            class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700"
                            ><a
                                href="http://localhost:3000/api/v1/instructions/{set
                                    .allInstructions[0].instructions}"
                                target="_blank">Open</a
                            ></button
                        >
                        <button
                            class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700"
                            ><a
                                href="http://localhost:3000/api/v1/instructions/download/{set
                                    .allInstructions[0].instructions}"
                                target="_self"
                                download>Download</a
                            ></button
                        >
                    </di>
                </div>
                <object
                    title="instructions"
                    class="w-full h-full"
                    data="http://localhost:3000/api/v1/instructions/{set
                        .allInstructions[0].instructions}"
                    type="application/pdf"
                ></object>
            </article>
        {/if}
    {/if}
</section>
