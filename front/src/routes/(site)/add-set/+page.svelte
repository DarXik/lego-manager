<script lang="ts">
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import { navbarHeight } from "$lib/store";

    export let form;
    export let data;

    let name: any = "";
    let setNumber: any = "";
    let yearReleased: any;
    let isBought: boolean = false;
    let yearBought: any = "";
    let description: any = "";
    let price: any;
    let partsAmount: any = "";
    let themeId: any;
    let imageThumbnail: any;
    let uploadedImage: string;
    let themeName: any = "";
    let isSearching = false;
    let searchQuery = "";
    let fetchedSets: any = [];
    let files: any;

    function handleImageUpload(e: Event) {
        const image = (e.target as HTMLInputElement)?.files?.[0];
        if (!image) return;

        uploadedImage = URL.createObjectURL(image);
    }

    $: {
        if (form?.newSetAdded) {
            uploadedImage = "";
            setTimeout(() => {
                uploadedImage = "";
                imageThumbnail = "";
                window.location.reload();
            }, 3000);
            imageThumbnail = "";
            searchQuery = "";
            isSearching = false;
            files = null;
        }

        if (form?.setsFound) {
            fetchedSets = form?.setsFound;
        }

        isBought = yearBought.length > 0;
    }

    function quickSetAdd(set: any) {
        name = set.name;
        setNumber = set.setNumber;
        yearReleased = set.yearReleased;
        partsAmount = set.numParts;
        themeId = set.themeId;
    }
</script>

<section class="px-20 mb-10" style="padding-top: {$navbarHeight + 32}px;">
    <h1 class="font-bold text-3xl mb-8">Add new set</h1>
    <div class="mb-12">
        <p
            class="text-gray-600 transition-all"
            class:!text-zinc-100={isSearching}
        >
            Find yours:
        </p>
        <form
            class="lg:w-9/12 mt-2"
            method="POST"
            action="?/searchLegoSet"
            on:focusin={() => (isSearching = true)}
            on:focusout={() => (isSearching = false)}
            use:enhance
        >
            <div class="relative flex w-full">
                <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    bind:value={searchQuery}
                    class="block w-full p-2 ps-10 placeholder:text-gray-600 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none transition-all"
                    placeholder="Atreides Royal..."
                    required
                    autocomplete="off"
                />
                <!-- rounded-s-lg -->
                <!-- rounded-e-lg -->
                <!-- není disabled po search setů, zůstane modré ač input je prázdný -->
                <button
                    type="submit"
                    disabled={searchQuery.length == 0}
                    class="end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium px-6 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:cursor-default disabled:opacity-75 disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:active:bg-gray-600 disabled:text-gray-300"
                >
                    Search
                </button>
            </div>
        </form>
        <div class="mt-4">
            {#if form?.setsFound && fetchedSets.length > 0}
                <p class="mb-2">Click to quickly add:</p>
                <div class="flex flex-wrap gap-2">
                    {#each fetchedSets as set}
                        <button
                            on:click={() => quickSetAdd(set)}
                            class="w-fit px-4 py-2 border-2 transition-all border-zinc-300 hover:border-zinc-300 hover:bg-zinc-300 hover:text-black focus:bg-zinc-300 focus:text-black active:border-zinc-400 active:bg-zinc-400"
                            class:setChosen={set.setNumber == setNumber}
                            >{set.name}</button
                        >
                    {/each}
                </div>
            {:else if form?.setsFailed}
                <p class="border-2 border-red-600 w-fit text-red-600 px-4 py-2">
                    {form?.setsFailed}
                </p>
            {/if}
        </div>
    </div>
    <form
        method="POST"
        action="?/addSet"
        enctype="multipart/form-data"
        use:enhance
        class:opacity-50={isSearching}
        class="lg:grid lg:grid-cols-3 lg:grid-rows-auto flex flex-col gap-4 lg:w-9/12 transition-all"
    >
        <div class="one-cell row-start-1 col-start-1 col-end-1">
            <label for="name">Name <span class="text-red-600">*</span></label>
            <input
                type="text"
                name="name"
                id="name"
                bind:value={name}
                required
                autocomplete="off"
                maxlength="100"
                class="my-input"
                placeholder="Atreides Royal..."
            />
        </div>
        <div class="one-cell row-start-1 col-start-2 col-end-2">
            <label for="setNumber"
                >Set number <span class="text-sm">(custom/official)</span>
                <span class="text-red-600">*</span></label
            >
            <input
                type="text"
                name="setNumber"
                id="setNumber"
                bind:value={setNumber}
                required
                autocomplete="off"
                maxlength="30"
                class="my-input"
                placeholder="10327"
            />
        </div>
        <div class="one-cell row-start-1 col-start-3 col-end-3">
            <label for="partsAmount"
                >Number of bricks <span class="text-red-600">*</span></label
            >
            <input
                type="text"
                name="partsAmount"
                id="partsAmount"
                bind:value={partsAmount}
                required
                autocomplete="off"
                maxlength="30"
                class="my-input"
                placeholder="1369"
            />
        </div>
        <div class="one-cell row-start-2 row-end-4 col-start-1 col-end-3">
            <label for="description"
                >Description <span class="text-sm"
                    >(max {256 - description.length})</span
                ></label
            >
            <textarea
                name="description"
                id="description"
                bind:value={description}
                autocomplete="off"
                rows="4"
                class="placeholder:italic w-full text-zinc-100 resize-none placeholder:text-gray-600 text-sm px-3 py-2 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none transition-all h-full"
                maxlength="256"
                placeholder="Authentic replica of the Atreides Royal Ornithopter from Dune..."
            ></textarea>
        </div>
        <!-- <div class="one-cell row-start-2 row-end-2 col-start-3 col-end-3">
            <label for="themeId"
                >Theme ID <span class="text-sm">(custom/official)</span>
                <span class="text-red-600">*</span></label
            >
            <input
                type="text"
                name="themeId"
                id="themeId"
                bind:value={themeId}
                required
                autocomplete="off"
                maxlength="30"
                class="my-input"
                placeholder="721"
            />
        </div> -->
        <div class="one-cell row-start-2 row-end-2 col-start-3 col-end-3">
            <label for="themeName"
                >Theme/Collection <span class="text-sm">(custom/official) <span class="text-red-600">*</span></span
                ></label
            >
            <input
                type="text"
                name="themeName"
                id="themeName"
                bind:value={themeName}
                autocomplete="off"
                maxlength="30"
                class="my-input"
                placeholder="Icons"
            />
        </div>
        <div class="one-cell row-start-4 row-end-4 col-start-1 col-end-1">
            <label for="yearReleased">Year of release</label>
            <input
                type="text"
                name="yearReleased"
                id="yearReleased"
                bind:value={yearReleased}
                autocomplete="off"
                maxlength="4"
                class="my-input"
                placeholder="2024"
            />
        </div>
        <div class="one-cell row-start-4 row-end-4 col-start-2 col-end-2">
            <label for="yearBought"
                >Year of purchase {@html isBought
                    ? `<span class="text-red-600">*</span>`
                    : ""}</label
            >
            <input
                bind:value={yearBought}
                type="text"
                name="yearBought"
                id="yearBought"
                autocomplete="off"
                maxlength="4"
                class="my-input"
                placeholder="2024"
                required={isBought}
            />
        </div>
        <div class="one-cell row-start-4 row-end-4 col-start-3 col-end-3">
            <label for="price">Price</label>
            <input
                type="text"
                name="price"
                id="price"
                bind:value={price}
                autocomplete="off"
                maxlength="30"
                class="my-input"
                placeholder="149.99"
            />
        </div>
        <div class="one-cell row-start-5 row-end-5 col-start-1 col-end-2">
            <label for="imageThumbnail"
                >Set image <span class="text-sm">*portrait preferred</span
                ></label
            >
            <div class="my-input">
                <input
                    type="file"
                    id="imageThumbnail"
                    name="imageThumbnail"
                    accept="image/*"
                    disabled={isSearching}
                    on:change={handleImageUpload}
                    bind:value={imageThumbnail}
                />
                {#if uploadedImage}
                    <img
                        src={uploadedImage}
                        class="w-32 m-4"
                        alt="uploaded image"
                    />
                {/if}
            </div>
        </div>
        <div class="one-cell row-start-5 row-end-5 col-start-2 col-end-3">
            <label for="instructions">Instructions PDF</label>
            <div class="my-input">
                <input
                    type="file"
                    id="instructions"
                    name="instructions"
                    accept="application/pdf"
                    multiple
                    disabled={isSearching}
                    bind:files
                />
                {#if files}
                    {#each Array.from(files) as file}
                        <p class="text-sm pt-2">{file.name} ({file.size} bytes)</p>
                    {/each}
                {/if}
            </div>
        </div>
        <!-- <div
            htmlFor="isBought"
            class:bg-zinc-900={isBought}
            class="cursor-pointer select-none flex flex-row items-center gap-3 hover:bg-zinc-900 w-fit px-3 py-2 text-gray-500 row-start-6 row-end-6 col-start-1 col-end-1 transition-all"
        >
            <input
                type="checkbox"
                name="isBought"
                id="isBought"
                bind:checked={isBought}
                on:click={() => (isBought = !isBought)}
                class="w-5 h-5 cursor-pointer checked:bg-red-900 bg-transparent"
                autocomplete="off"
                disabled={yearBought.length > 0}
            />
            <label
                htmlFor="isBought"
                class="w-fit text-white cursor-pointer"
                for="isBought"
                >{isBought ? "I own this set" : "Do you own this set?"}</label
            >
        </div> -->

        <div
            class="one-cell row-start-7 row-end-7 col-start-1 col-end-1 flex flex-row gap-8"
        >
            <button
                class:set-added={form?.newSetAdded}
                type="submit"
                class="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 border-2 border-transparent py-3 px-10 w-fit mt-10 text-white uppercase font-bold transition-all disabled:cursor-default disabled:opacity-75 disabled:bg-zinc-800 disabled:text-gray-300"
                class:!cursor-default={isSearching}
                disabled={form?.newSetAdded &&
                    !(
                        name.length === 0 ||
                        setNumber.length === 0 ||
                        partsAmount.length === 0 ||
                        themeName.length === 0
                    ) || isSearching}
                >
                {form?.newSetAdded
                    ? form?.newSetAdded.message
                    : "Add set"}</button
            >
            {#if form?.newSetFailed}
                <p class="text-red-500 font-bold pt-4">
                    {form?.newSetFailed.message}
                </p>
            {/if}
        </div>
    </form>
</section>

<style lang="postcss">
    .my-input {
        @apply placeholder:italic  placeholder:text-gray-600 text-sm text-zinc-100 w-full px-3 py-2 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none  transition-all;
    }
    .one-cell {
        @apply flex flex-col gap-2 text-gray-500;
    }
    .set-added {
        @apply border-green-500 text-green-500 disabled:opacity-80 bg-transparent cursor-default;
    }
    .setChosen {
        @apply border-zinc-300 bg-zinc-300 text-black;
    }
</style>
