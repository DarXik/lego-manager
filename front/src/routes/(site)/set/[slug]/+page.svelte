<script>
    import { onMount } from "svelte";
    import { userSets } from "$lib/store";
    import InfoCardwIcon from "./components/InfoCardwIcon.svelte";

    export let data;

    let navbarHeight;

    onMount(() => {
        navbarHeight = document.getElementsByTagName("nav")[0].offsetHeight;
    });

    console.log($userSets);
    console.log(data.slug);
    $: console.log(navbarHeight);

    let set = $userSets.find((set) => set.id == data.slug);
</script>

<section>
    {#if navbarHeight}
        <article class="h-[100vh] flex flex-row">
            <div
                class="w-1/2 h-full flex flex-col justify-between bg-gradient-to-br from-black from-50% to-red-950 px-20 pb-10"
            >
                <div>
                    <p
                        style="margin-top: {navbarHeight + 32}px"
                        class="text-gray-500 text-xs break-normal mb-1"
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
                    src={set.imageThumbnail.imageThumbnail}
                    alt={set.imageThumbnail.filename}
                />
            </div>
        </article>
    {/if}
</section>
