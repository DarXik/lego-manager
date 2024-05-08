<script lang="ts">
    import { onMount } from "svelte";
    import InfoCardwIcon from "./components/InfoCardwIcon.svelte";
    import { enhance } from "$app/forms";
    import { userInfo } from "$lib/store";

    export let data;

    let set = data.set;
    let currentInstructions: any = [];
    let instructiosPref = "";
    let deletingSet = false;
    let editingSet = true;
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

    console.log(set);
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
    class="border-3 border-zinc-600 bg-black/80
     text-zinc-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm min-w-[25%]"
    bind:this={modalEdit}
    on:close={() => (editingSet = false)}
    on:click|self={() => modalEdit.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div class="border-b-3 border-zinc-600 p-2">
            <p class="mb-2">You are editing set:</p>
            <p class="uppercase">{set.name}</p>
        </div>
        <form
            method="POST"
            action="?/updateSet"
            class="flex flex-col gap-4 p-2"
            use:enhance
        >
            <input
                type="text"
                class="hidden w-0 h-0"
                name="setId"
                bind:value={set.id}
            />
            {#if set.description}
                <div class="flex flex-col">
                    <textarea
                        name="descriptionEdit"
                        id="descriptionEdit"
                        bind:value={descriptionEdit}
                        autocomplete="off"
                        rows="4"
                        maxlength="256"
                        placeholder="Very secret description..."
                        class="resize-none bg-transparent peer focus:outline-2 outline-white"
                    ></textarea>
                    <label class="-order-last text-gray-400 peer-focus:text-zinc-100 transition-all" for="descriptionEdit"
                        >New description</label
                    >
                </div>
            {/if}
            {#if set.yearBought}
                <div class="flex flex-col">
                    <input
                        type="text"
                        name="yearBoughtEdit"
                        id="yearBoughtEdit"
                        bind:value={yearBoughtEdit}
                        autocomplete="off"
                        maxlength="4"
                        placeholder="2019"
                    />
                    <label class="-order-last" for="yearBoughtEdit"
                        >New year of purchase</label
                    >
                </div>
            {/if}
            {#if set.price}
                <div class="flex flex-col">
                    <input
                        type="text"
                        name="priceEdit"
                        id="priceEdit"
                        bind:value={priceEdit}
                        autocomplete="off"
                        maxlength="30"
                        placeholder="199"
                    />
                    <label class="-order-last" for="priceEdit">New price</label>
                </div>
            {/if}
        </form>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="flex flex-row justify-evenly mt-12 border-main">
            <button
                type="submit"
                class="w-full py-2 text-green-600 hover:text-black hover:bg-green-600 transition-all border-r-[1.5px] border-zinc-600"
                >Update</button
            >
            <button
                class="w-full py-2 text-zinc-100 hover:text-black hover:bg-zinc-300 transition-all p-2 px-4 border-l-[1.5px] border-zinc-600"
                on:click={() => modalEdit.close()}>Go back</button
            >
        </div>
    </div>
</dialog>

<section>
    <div class="flex">
        <div
            class="border-b-3 border-r-3 lg:w-3/5 border-zinc-600 flex flex-col justify-between"
        >
            <div class="px-4 py-8">
                <h1
                    class="font-bold uppercase text-3xl md:text-4xl lg:text-5xl"
                >
                    {set.name}
                </h1>
                <p class="font-normal mt-20">
                    {#if set.description}
                        {set.description}
                    {:else}
                        <span class="italic text-gray-400">No description</span>
                    {/if}
                </p>
            </div>
            <!-- <div class="mt-20 flex w-fit gap-12 border-main border-r-3 p-4">
            </div> -->
        </div>
        {#if set.image}
            <div class="lg:w-[40%] h-fit border-b-3 border-zinc-600">
                <img
                    src="http://localhost:3000/api/v1/image/{set.image}"
                    alt="set"
                    class="h-[480px] object-cover"
                />
            </div>
        {/if}
    </div>
    <div class="w-full border-b-3 border-zinc-600">
        <div
            class="border-zinc-600 border-r-3 border-l-3 w-fit mx-auto flex justify-center flex-wrap gap-x-14 gap-y-7 p-4"
        >
            <InfoCardwIcon
                path="set/number-icon.svg"
                text={set.setNumber}
                title="Set number"
            ></InfoCardwIcon>
            <InfoCardwIcon
                path="set/collection-icon.svg"
                text={set.themeName}
                title="Theme/Collection"
            ></InfoCardwIcon>
            <InfoCardwIcon
                path="set/bricks-icon.svg"
                text={set.partsAmount}
                title="No. of bricks"
            ></InfoCardwIcon>
            <InfoCardwIcon
                path="currencies/{currencies[$userInfo.currency]}"
                text={set.price}
                title="Price"
            ></InfoCardwIcon>
            <InfoCardwIcon
                path="set/year-released-icon.svg"
                text={set.yearReleased}
                title="Year released"
            ></InfoCardwIcon>
            <InfoCardwIcon
                path="set/year-bought-icon.svg"
                text={set.year}
                title="Year bought"
            ></InfoCardwIcon>
            <InfoCardwIcon
                path="set/added.svg"
                text={new Date(set.addedOn).toLocaleDateString("de-DE")}
                title="Added on"
            ></InfoCardwIcon>
            <InfoCardwIcon
                path="set/last-modified.svg"
                text={new Date(set.lastModified).toLocaleDateString("de-DE")}
                title="Last modified"
            ></InfoCardwIcon>
        </div>
    </div>
    <div class="flex flex-row">
        {#if set.allInstructions.length > 0 || set.myInstructions.length > 0}
            <div
                class="lg:w-1/2 border-r-3 border-zinc-600"
                class:border-b-3={currentInstructions == 0}
            >
                <div class="px-4 py-4">
                    <h2 class="text-3xl font-bold mb-12">
                        Available instructions:
                    </h2>
                    <div class="flex flex-row gap-4">
                        <button
                            on:click={() =>
                                (currentInstructions = set.myInstructions)}
                            on:click={() => (instructiosPref = "Your")}
                            class:!border-white={instructiosPref == "Your"}
                            class="text-white end-3 bottom-1.5 border-2 uppercase border-transparent bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >Your instructions ({set.myInstructions
                                .length})</button
                        >
                        <button
                            on:click={() =>
                                (currentInstructions = set.allInstructions)}
                            on:click={() => (instructiosPref = "Public")}
                            class:!border-white={instructiosPref == "Public"}
                            class="text-white end-3 bottom-1.5 border-2 uppercase border-transparent bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >Public instructions ({set.allInstructions
                                .length})</button
                        >
                    </div>
                </div>
                {#each currentInstructions as instruction, i}
                    <div class="flex flex-row items-center border-main">
                        <p
                            class="text-2xl font-bold border-r-3 border-zinc-600 h-full p-4 w-12"
                        >
                            {i + 1}
                        </p>
                        <div class="ml-4 flex gap-4">
                            <a
                                class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                                href="http://localhost:3000/api/v1/instructions/{instruction.instructions}"
                                target="_blank">Open</a
                            ><a
                                class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium w-fit text-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                                href="http://localhost:3000/api/v1/instructions/download/{instruction.instructions}"
                                target="_self"
                                download>Download</a
                            >
                        </div>
                    </div>
                    <div class="flex flex-col">
                        {#if currentInstructions.length == 1}
                            <object
                                title="instructions"
                                class="h-screen"
                                data="http://localhost:3000/api/v1/instructions/{currentInstructions[0]
                                    .instructions}"
                                type="application/pdf"
                            ></object>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
        <div>
            <div class="flex flex-row gap-4 p-4">
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
</section>

<style>
    dialog > div {
        /* padding: 1em; */
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
