<script lang="ts">
    import { onMount } from "svelte";
    import InfoCardwIcon from "./components/InfoCardwIcon.svelte";
    import { enhance } from "$app/forms";
    import { userInfo } from "$lib/store";
    import { fade } from "svelte/transition";

    export let data;
    export let form;

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

        updateStatus = await request;

        if (request.ok) {
            setTimeout(() => {
                deletingSet = false;

                window.location.reload();
            }, 2500);
        }
    }

    let modalDelete: any;
    let modalEdit: any;

    $: if (modalDelete && deletingSet && !editingSet) modalDelete.showModal();
    $: if (modalEdit && editingSet && !deletingSet) modalEdit.showModal();

    let currencies = ["czk.svg", "euro.svg", "usd.svg", "gbp.svg"];
    let loading = false;

    function handleSubmit() {
        loading = true;
    }

    let updateStatus: any = "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="border-3 border-zinc-600 bg-black
        text-zinc-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%]"
    bind:this={modalDelete}
    on:close={() => (deletingSet = false)}
    on:click|self={() => modalDelete.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <!-- <slot name="header" /> -->
        <div class="border-b-3 border-zinc-600 p-2 pb-8 text-white">
            <p class="mb-1">Delete:</p>
            <p class="uppercase italic text-xl">{set.name}</p>
            {#if updateStatus.status === 200}
                <p
                    transition:fade={{ duration: 200 }}
                    class="pt-2 text-green-600"
                >
                    Successfully deleted
                </p>
            {:else if updateStatus.status !== 200 && updateStatus.status}
                <p
                    transition:fade={{ duration: 200 }}
                    class="pt-2 text-red-600"
                >
                    Error deleting set <br />
                    <span class="italic">→ {updateStatus.message}</span>
                </p>
            {/if}
        </div>
        <div class="p-2 text-lg">
            <p>
                &bull; Set will be deleted only from your account. <br />
                &bull; Those already added by others will not be deleted. <br />
                &bull; This action cannot be undone.
            </p>
        </div>

        <!-- svelte-ignore a11y-autofocus -->
        <div class="flex flex-row justify-evenly mt-12 border-main">
            <button
                on:click={deleteSet}
                class="w-full py-2 font-bold text-red-600 hover:text-black hover:bg-red-600 transition-all border-r-[1.5px] border-zinc-600"
                >I am sure</button
            >
            <button
                class="w-full py-2 text-zinc-100 hover:text-black hover:bg-zinc-300 transition-all p-2 px-4 border-l-[1.5px] border-zinc-600"
                on:click={() => modalDelete.close()}>Go back</button
            >
        </div>
    </div>
</dialog>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog 
    class="border-3 border-zinc-600 bg-black
     text-zinc-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]"
    bind:this={modalEdit}
    on:close={() => (editingSet = false)}
    on:click|self={() => modalEdit.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div class="border-b-3 border-zinc-600 p-2 pb-8 text-white">
            <p class="mb-1">Editing:</p>
            <p class="uppercase italic text-xl">{set.name}</p>
            {#if updateStatus.status === 200}
                <p
                    transition:fade={{ duration: 200 }}
                    class="pt-2 text-green-600"
                >
                    Successfully updated
                </p>
            {:else if updateStatus.status !== 200 && updateStatus.status}
                <p
                    transition:fade={{ duration: 200 }}
                    class="pt-2 text-red-600"
                >
                    Error deleting set <br />
                    <span class="italic">→ {updateStatus.message}</span>
                </p>
            {/if}
        </div>
        <form
            method="POST"
            action="?/updateSet"
            on:submit|preventDefault={handleSubmit}
            use:enhance={() => {
                return async ({ result }) => {
                    if (result) {
                        updateStatus = result;
                        setTimeout(() => {
                            editingSet = false;
                            loading = false;

                            window.location.reload();
                        }, 2500);
                    }
                };
            }}
        >
            <input
                type="text"
                class="hidden w-0 h-0"
                name="setId"
                bind:value={set.id}
            />

            <div class="flex flex-col gap-6 p-2">
                <div class="flex flex-col">
                    <textarea
                        name="descriptionEdit"
                        id="descriptionEdit"
                        bind:value={descriptionEdit}
                        autocomplete="off"
                        rows="4"
                        maxlength="256"
                        placeholder="Very secret description..."
                        class="my-input resize-none peer"
                    ></textarea>
                    <label
                        class="text-gray-400 peer-focus:text-white -order-last transition-all duration-200 mb-1"
                        for="descriptionEdit">New description</label
                    >
                </div>

                <div class="flex flex-col">
                    <input
                        type="text"
                        name="yearBoughtEdit"
                        id="yearBoughtEdit"
                        bind:value={yearBoughtEdit}
                        autocomplete="off"
                        maxlength="4"
                        placeholder="2019"
                        class="my-input peer"
                    />
                    <label
                        class="text-gray-400 peer-focus:text-white -order-last transition-all duration-200 mb-1"
                        for="yearBoughtEdit">New year of purchase</label
                    >
                </div>

                <div class="flex flex-col">
                    <input
                        type="text"
                        name="priceEdit"
                        id="priceEdit"
                        bind:value={priceEdit}
                        autocomplete="off"
                        maxlength="30"
                        placeholder="199"
                        class="my-input peer"
                    />
                    <label
                        class="text-gray-400 peer-focus:text-white -order-last transition-all duration-200 mb-1"
                        for="priceEdit">New price</label
                    >
                </div>
            </div>

            <div class="flex flex-row justify-evenly mt-12 border-main">
                <button
                    type="submit"
                    disabled={loading}
                    class="w-full py-2 font-bold text-green-600 hover:text-black hover:bg-green-600 transition-all border-r-[1.5px] border-zinc-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    >Update
                </button>
                <button
                    class="w-full py-2 text-zinc-100 hover:text-black hover:bg-zinc-300 transition-all p-2 px-4 border-l-[1.5px] border-zinc-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    on:click={() => modalEdit.close()}
                    disabled={loading}
                    >Go back
                </button>
            </div>
        </form>
        <!-- svelte-ignore a11y-autofocus -->
    </div>
</dialog>

<section in:fade={{ delay: 50, duration: 300 }}>
    <div class="flex">
        <div
            class="border-b-3 md:border-r-3 w-full lg:w-3/5 border-zinc-600 flex flex-col justify-between"
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
        </div>

        <div class="lg:w-[40%] max-md:hidden h-fit border-b-3 border-zinc-600">
            <img
                src="http://192.168.0.13:3000/api/v1/image/{set?.image}"
                alt=""
                class="h-[480px] object-cover"
            />
        </div>
    </div>
    <div class="w-full border-b-3 border-zinc-600">
        <div
            class="border-zinc-600 md:border-r-3 md:border-l-3 md:w-fit mx-auto flex max-md:grid grid-cols-2 rows-auto md:justify-center flex-wrap md:gap-x-14 gap-6 md:gap-y-7 p-4"
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
                path="currencies/{currencies[data.currency]}"
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
                text={set.yearBought}
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
    <div class="flex flex-col md:flex-row max-md:w-full">
        {#if set.allInstructions.length > 0 || set.myInstructions.length > 0}
            <div
                class="lg:w-1/2 md:border-r-3 border-zinc-600 max-md:border-b-3"
                class:border-b-3={currentInstructions == 0}
            >
                <div class="px-4 py-4 mb-4">
                    <h2 class="text-3xl font-bold mb-8 md:mb-12">
                        Available instructions:
                    </h2>
                    <div class="flex flex-col md:flex-row gap-4">
                        <button
                            on:click={() =>
                                (currentInstructions = set.myInstructions)}
                            on:click={() => (instructiosPref = "Your")}
                            class:!border-purple-600={instructiosPref == "Your"}
                            class:!text-purple-500={instructiosPref == "Your"}
                            class="my-button"
                            >Your instructions ({set.myInstructions
                                .length})</button
                        >
                        <button
                            on:click={() =>
                                (currentInstructions = set.allInstructions)}
                            on:click={() => (instructiosPref = "Public")}
                            class:!border-purple-600={instructiosPref == "Public"}
                            class:!text-purple-500={instructiosPref == "Public"}
                            class="my-button"
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
                        <div class="ml-4 flex max-md:flex-wrap gap-4 ">
                            <a
                                class="my-button-2 shadow-none px-5"
                                href="http://192.168.0.13:3000/api/v1/instructions/{instruction.instructions}"
                                target="_blank"><span class="relative z-10 flex flex-row items-center gap-4"> <img src="/set/open.svg" alt="open icon" class="w-5 h-5"/>Open</span></a
                            ><a
                                class="my-button-2 shadow-none px-5"
                                href="http://192.168.0.13:3000/api/v1/instructions/download/{instruction.instructions}"
                                target="_self"
                                download><span class="relative z-10 flex flex-row items-center gap-4"> <img src="/set/download.svg" alt="open icon" class="w-5 h-5"/>Download</span></a
                            >
                        </div>
                    </div>
                    <div class="flex flex-col max-md:border-main border-gray-600 md:last:border-b-3">
                        {#if currentInstructions.length == 1}
                            <object
                                title="instructions"
                                class="h-screen max-md:mx-6"
                                data="http://192.168.0.13:3000/api/v1/instructions/{currentInstructions[0]
                                    .instructions}"
                                type="application/pdf"
                            ></object>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
        <div class="px-8  md:hidden h-fit border-b-3 border-zinc-600">
            <img
                src="http://192.168.0.13:3000/api/v1/image/{set?.image}"
                alt=""
                class="w-11/12 mx-auto object-cover"
            />
        </div>
        <div>
            <div class="flex flex-row gap-4 p-4 max-md:justify-center max-md:my-4">
                <button on:click={editSet} class="my-button-2">
                    <span class="relative z-10">Edit set</span>
                </button>
                <button on:click={() => (deletingSet = !deletingSet)} on:click={editSet} class="my-button-2">
                    <span class="relative z-10">Delete set</span>
                </button>
            </div>
        </div>
    </div>
</section>

<style>
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
