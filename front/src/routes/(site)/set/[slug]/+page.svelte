<script lang="ts">
    import { onMount } from "svelte";
    import InfoCardwIcon from "./components/InfoCardwIcon.svelte";
    import { enhance } from "$app/forms";
    import { userInfo } from "$lib/store";

    export let data;

    // let set = $userSets.find((set) => set.id == data.slug);
    let set = data.set;
    let currentInstructions: any = [];
    let instructiosPref = "";
    let deletingSet = false;
    let editingSet = false;
    let descriptionEdit = "";
    let yearBoughtEdit = "";
    let priceEdit = "";

    onMount(() => {
        if (set) {
            currentInstructions = set.myInstructions;
            instructiosPref = "Your";
        }
    });

    function editSet() {
        editingSet = true;
        descriptionEdit = set?.description;
        yearBoughtEdit = set?.yearBought;
        priceEdit = set?.price;
    }

    async function deleteSet() {
        const request = await fetch("/api/deleteSet", {
            method: "POST",
            body: JSON.stringify({
                id: data.slug,
            }),
        });

        if (request.ok) {
            console.log((await request.json()).message);
        }
    }

    let modalDelete: any;
    let modalEdit: any;

    $: if (modalDelete && deletingSet && !editingSet) modalDelete.showModal();
    $: if (modalEdit && editingSet && !deletingSet) modalEdit.showModal();

    let currencies = ["czk.svg", "euro.svg", "usd.svg", "gbp.svg"];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="border-2 border-zinc-600 bg-gradient-to-tl bg-black from-black from-10% to-purple-950/50 to-90%
     text-zinc-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm min-w-[25%] w-fit p-2"
    bind:this={modalDelete}
    on:close={() => (deletingSet = false)}
    on:click|self={() => modalDelete.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <!-- <slot name="header" /> -->
        <h2 class="text-2xl font-bold uppercase mb-4">Are you sure?</h2>
        <p>
            Set will be deleted only from your account, those already added by
            others will not be deleted.
        </p>

        <!-- svelte-ignore a11y-autofocus -->
        <div class="flex flex-row justify-between mt-12">
            <button
                on:click={deleteSet}
                class="p-2 px-4 border-2 border-green-400">I am sure</button
            >
            <button
                class="border-2 border-red-400 p-2 px-4"
                on:click={() => modalDelete.close()}>Go back</button
            >
        </div>
    </div>
</dialog>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="border-2 border-zinc-600 bg-gradient-to-tl bg-black from-black from-10% to-purple-950/50 to-90%
     text-zinc-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm min-w-[25%] w-fit p-2"
    bind:this={modalEdit}
    on:close={() => (editingSet = false)}
    on:click|self={() => modalEdit.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <!-- <slot name="header" /> -->
        <h2 class="uppercase mb-6">
            You are editing set: <br />
            <span class="text-2xl font-bold">{set.name} | {set.setNumber}</span>
        </h2>
        <form
            method="POST"
            action="?/updateSet"
            class="flex flex-col gap-4"
            use:enhance
        >
            <input
                type="text"
                class="hidden w-0 h-0"
                name="setId"
                bind:value={set.id}
            />
            {#if set.description}
                <textarea
                    name="descriptionEdit"
                    id="descriptionEdit"
                    bind:value={descriptionEdit}
                    autocomplete="off"
                    rows="4"
                    maxlength="256"
                    placeholder="..."
                    class="resize-none"
                ></textarea>
            {/if}
            {#if set.yearBought}
                <input
                    type="text"
                    name="yearBoughtEdit"
                    id="yearBoughtEdit"
                    bind:value={yearBoughtEdit}
                    autocomplete="off"
                    maxlength="4"
                    placeholder="..."
                />
            {/if}
            {#if set.price}
                <input
                    type="text"
                    name="priceEdit"
                    id="priceEdit"
                    bind:value={priceEdit}
                    autocomplete="off"
                    maxlength="30"
                    placeholder="..."
                />
            {/if}
            <button type="submit" class="p-2 px-4 border-2 border-green-400"
                >Update</button
            >
        </form>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="flex flex-row justify-between mt-12">
            <slot name="button"></slot>
            <button
                class="border-2 border-red-400 p-2 px-4"
                on:click={() => modalEdit.close()}>Go back</button
            >
        </div>
    </div>
</dialog>

<section class="relative z-0">
    {#if set}
        <article class="h-[100vh] flex flex-row">
            <div
                class="w-full h-full flex flex-col justify-between bg-gradient-to-br from-black from-50% to-red-950 px-20"
            >
                <div>
                    <p class="text-gray-500 text-xs break-normal mb-1 mt-32">
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
                    <p class="font-normal text-xl mb-16 lg:w-10/12">
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
                        class="flex flex-wrap gap-6 gap-x-8 border-t-2 pt-4 border-zinc-300"
                    >
                        <InfoCardwIcon
                            title="Set number"
                            path="set/number-icon.svg"
                            text={set.setNumber}
                        />

                        <InfoCardwIcon
                            title="Bricks"
                            path="set/bricks-icon.svg"
                            text={set.partsAmount}
                        />

                        <InfoCardwIcon
                            title="Yr. of relased"
                            path="set/year-released-icon.svg"
                            text={set.yearReleased}
                        />

                        <InfoCardwIcon
                            title="Yr. of purchase"
                            path="set/year-bough-icon.svg"
                            text={set.yearBought}
                        />

                        <InfoCardwIcon
                            title="Theme/Collection"
                            path="set/collection-icon.svg"
                            text={set.themeName}
                        />

                        <InfoCardwIcon
                            title="Price"
                            path="currencies/{currencies[$userInfo.currency]}"
                            text={set.price}
                        />

                        <InfoCardwIcon
                            title="Added on"
                            path="set/collection-icon.svg"
                            text={new Date(set.addedOn).toLocaleDateString(
                                "cz-CZ",
                            )}
                        />
                    </div>
                    <div class="flex flex-row gap-4 mb-12 mt-12">
                        <button
                            on:click={editSet}
                            class="text-white end-3 bottom-1.5 border-2 border-transparent bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Edit set
                        </button>
                        <button
                            on:click={() => (deletingSet = !deletingSet)}
                            class="text-white end-3 bottom-1.5 border-2 border-transparent bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Delete set
                        </button>
                    </div>
                </div>
            </div>
        </article>
        {#if set.allInstructions.length > 0 || set.myInstructions.length > 0}
            <article
                class="px-20 pb-16 pt-20 flex flex-col items-start justify-center bg-gradient-to-t from-black from-30% to-red-950"
            >
                <div class="mb-12">
                    <h2 class="text-4xl font-bold mb-4">
                        Choose instructions:
                    </h2>
                    <div class="flex flex-row gap-4">
                        <button
                            on:click={() =>
                                (currentInstructions = set.myInstructions)}
                            on:click={() => (instructiosPref = "Your")}
                            class:!border-white={instructiosPref == "Your"}
                            class="text-white end-3 bottom-1.5 border-2 border-transparent bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >Your instructions</button
                        >
                        <button
                            on:click={() =>
                                (currentInstructions = set.allInstructions)}
                            on:click={() => (instructiosPref = "Public")}
                            class:!border-white={instructiosPref == "Public"}
                            class="text-white end-3 bottom-1.5 border-2 border-transparent bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >Public instructions</button
                        >
                    </div>
                </div>
                <div class="flex flex-col mb-16 pb-4 w-full">
                    <h3 class="text-3xl font-bold mb-8">
                        {instructiosPref} instructions ({currentInstructions.length})
                    </h3>
                    <!-- <div class="flex flex-row gap-6"> -->
                    {#each currentInstructions as instruction, i}
                        <div
                            class="flex flex-col gap-4 mb-8 border-b-2 border-l-2 border-zinc-300 p-4"
                        >
                            <div class="flex flex-row items-center gap-4">
                                <p class="text-2xl font-bold">
                                    &bull; {i + 1}
                                </p>

                                <button
                                    class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    ><a
                                        href="http://localhost:3000/api/v1/instructions/{instruction.instructions}"
                                        target="_blank">Open</a
                                    ></button
                                >
                                <button
                                    class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    ><a
                                        href="http://localhost:3000/api/v1/instructions/download/{instruction.instructions}"
                                        target="_self"
                                        download>Download</a
                                    ></button
                                >
                            </div>

                            {#if currentInstructions.length == 1}
                                <object
                                    title="instructions"
                                    class="w-full 2xl:max-w-[50%] h-[50em] p-8"
                                    data="http://localhost:3000/api/v1/instructions/{currentInstructions[0]
                                        .instructions}"
                                    type="application/pdf"
                                ></object>
                            {/if}
                        </div>
                    {/each}
                </div>
            </article>
        {/if}
    {/if}
</section>

<!-- {#if deletingSet}
    <div class="w-full h-full absolute top-0 left-0 opacity-50"></div>
    <div class="absolute top-0 left-0 z-40 h-full w-full bg-black text-zinc-300">
        <p>Are you sure?</p>
        <p>
            You are about to delete this set and all its data from your account.
        </p>
        <p>If your set is public, others will retain it.</p>
    </div>
{/if} -->

<style>
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
