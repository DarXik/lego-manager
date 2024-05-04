<script>
    import { onMount } from "svelte";
    import { userSets, navbarHeight } from "$lib/store";
    import { goto } from "$app/navigation";

    export let form;
    export let data;
</script>

<section class="px-20 mb-16 pt-32" >
    <div class=" mb-12">
        <h1 class="font-bold text-3xl mb-8">Added sets:</h1>
    </div>

    <article class="flex flex-wrap gap-6 grow h-full">
        {#if $userSets.length > 0}
            {#each $userSets as set}
                <button on:click={() => goto(`/set/${set.id}`)}>
                    <div
                        class="flex flex-col w-[20em] hover:scale-105 transition-all hover:cursor-pointer"
                    >
                        <!-- <div class="h-1/3">
                            nefunguje
                            <img
                                src={set.imageThumbnail &&
                                set.imageThumbnail !== ""
                                    ? `http://localhost:3000/api/v1/image/${set.imageThumbnail}`
                                    : "../../../placeholder.webp"}
                                alt={set.imageThumbnail
                                    ? set.imageThumbnail
                                    : "no image"}
                                class=" w-fit bg-gray-600 h-full object-cover"
                                loading="lazy"
                            /> -->
                        <!-- </div> -->
                        <div
                            class="h-[20em] bg-no-repeat bg-cover bg-gradient-to-tl from-gray-950 to-gray-900 p-6 px-8 select-none flex flex-col justify-between items-start"
                        >
                            <div
                                class="flex flex-col justify-start items-start"
                            >
                                <p class="text-sm text-gray-500 font-normal">
                                    name
                                </p>
                                <h3 class="text-2xl font-bold">
                                    {set.name}
                                </h3>
                            </div>
                            <div
                                class="mt-6 flex flex-col items-start justify-start"
                            >
                                <p class="text-lg">
                                    <span class="text-sm text-gray-500"
                                        >set no.
                                    </span>{set.setNumber}
                                </p>
                                <p class="text-lg">
                                    <span class="text-sm text-gray-500"
                                        >theme
                                    </span>{set.themeName}
                                </p>
                                <p class="text-lg">
                                    <span class="text-sm text-gray-500"
                                        >added on
                                    </span>{new Date(set.addedOn)
                                        .toLocaleString({
                                            timeZone: "Europe/Prague",
                                        })
                                        .split(",")[0]}
                                </p>
                                {#if set.bought}
                                    <p class="text-lg">
                                        <span class="text-sm text-gray-500"
                                            >bought in
                                        </span>{set.yearBought}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </div>
                </button>
            {/each}
        {:else}
            <p class="italic text-gray-400 bg-red">No sets found</p>
        {/if}
    </article>
</section>
