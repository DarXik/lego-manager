<script lang="ts">
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import { navbarHeight, userInfo } from "$lib/store";
    import { fade } from "svelte/transition";

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
        // themeId = set.themeId;
        themeName = set.themeName;
    }

    let currencies = ["czk.svg", "euro.svg", "usd.svg", "gbp.svg"];
    let currentItems = 8;
</script>

<section class="">
    <div class="border-b-3 boder-zinc-600">
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl p-6">
            Add new set
        </h1>
    </div>
    <div class="border-b-3 border-zinc-600 p-6">
        <p class="text-zinc-100 transition-all text-2xl">
            Find yours in our database:
        </p>
        <form
            class="lg:pr-32"
            method="POST"
            action="?/searchLegoSet"
            on:focusin={() => (isSearching = true)}
            on:focusout={() => (isSearching = false)}
            use:enhance
        >
            <div class="relative flex w-full mt-4">
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
                    class="my-input block w-full ps-10 p-3"
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
                    class="end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium px-6 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:cursor-default disabled:opacity-75 disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:active:bg-gray-600 disabled:text-gray-300 select-none"
                >
                    Search
                </button>
            </div>
        </form>
        <div class="mt-4">
            {#if form?.setsFound && fetchedSets.length > 0}
                <p class="mb-2">Click to quickly add:</p>
                <div class="flex flex-wrap gap-3">
                    {#each fetchedSets.slice(0, currentItems) as set}
                        <button
                            type="button"
                            transition:fade={{ duration: 200 }}
                            on:click={() => quickSetAdd(set)}
                            class="w-fit border-2 transition-all border-zinc-300 hover:border-zinc-300 hover:bg-zinc-300/90 hover:text-black focus:bg-zinc-300/90 focus:text-black active:border-zinc-400 active:bg-zinc-300/90 select-none group"
                            class:setChosen={set.setNumber == setNumber &&
                                set.themeName == themeName}
                            ><div class="  px-4 py-2">
                                <p>{set.name}</p>
                                <p class="text-xs">
                                    {set.addedBy ? "by user" : ""}
                                </p>
                            </div>
                        </button>
                    {/each}
                </div>
                {#if currentItems < fetchedSets.length}
                    <div class="w-full flex justify-center mt-8">
                        <button
                            on:click={() => (currentItems = currentItems + 5)}
                            id="loadmore"
                            type="button"
                            class="border-2 border-green-600 px-4 py-2"
                        >
                            Show more
                        </button>
                    </div>
                {/if}
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
            <input
                type="text"
                name="name"
                id="name"
                bind:value={name}
                autocomplete="off"
                maxlength="100"
                class="my-input peer"
                placeholder="Atreides Royal..."
                required
            />
            <label
                class="peer-focus:text-white -order-last transition-all duration-200"
                for="name"
                >Name <span class="text-red-600">*</span>
            </label>
        </div>
        <div class="one-cell row-start-1 col-start-2 col-end-2">
            <input
                type="text"
                name="setNumber"
                id="setNumber"
                bind:value={setNumber}
                required
                autocomplete="off"
                maxlength="30"
                class="my-input peer"
                placeholder="10327"
            />
            <label
                for="setNumber"
                class="peer-focus:text-white -order-last transition-all duration-200"
                >Set number <span class="text-sm">(custom/official)</span>
                <span class="text-red-600">*</span></label
            >
        </div>
        <div class="one-cell row-start-1 col-start-3 col-end-3">
            <input
                type="text"
                name="partsAmount"
                id="partsAmount"
                bind:value={partsAmount}
                required
                autocomplete="off"
                maxlength="30"
                class="my-input peer"
                placeholder="1369"
            />
            <label
                for="partsAmount"
                class="peer-focus:text-white -order-last transition-all duration-200"
                >Number of bricks <span class="text-red-600">*</span></label
            >
        </div>
        <div class="one-cell row-start-2 row-end-2 col-start-3 col-end-3">
            <input
                type="text"
                name="themeName"
                id="themeName"
                bind:value={themeName}
                autocomplete="off"
                maxlength="30"
                class="my-input peer"
                placeholder="Icons"
                required
            />
            <label
                for="themeName"
                class="peer-focus:text-white -order-last transition-all duration-200"
                >Theme/Collection <span class="text-sm"
                    >(custom/official) <span class="text-red-600">*</span></span
                >
            </label>
        </div>
        <div class="one-cell row-start-2 row-end-4 col-start-1 col-end-3">
            <textarea
                name="description"
                id="description"
                bind:value={description}
                autocomplete="off"
                rows="4"
                class="my-input resize-none peer"
                maxlength="256"
                placeholder="Authentic replica of the Atreides Royal Ornithopter from Dune..."
            ></textarea>
            <label
                for="description"
                class="peer-focus:text-white -order-last transition-all duration-200"
                >Description <span class="text-sm"
                    >(max {256 - description.length})</span
                ></label
            >
        </div>
        <div class="one-cell row-start-4 row-end-4 col-start-1 col-end-1">
            <input
                type="text"
                name="yearReleased"
                id="yearReleased"
                bind:value={yearReleased}
                autocomplete="off"
                maxlength="4"
                class="my-input peer"
                placeholder="2024"
            />
            <label
                for="yearReleased"
                class="peer-focus:text-white -order-last transition-all duration-200"
                >Year of release</label
            >
        </div>
        <div class="one-cell row-start-4 row-end-4 col-start-2 col-end-2">
            <input
                bind:value={yearBought}
                type="text"
                name="yearBought"
                id="yearBought"
                autocomplete="off"
                maxlength="4"
                class="my-input peer"
                placeholder="2024"
                required={isBought}
            />
            <label
                for="yearBought"
                class="peer-focus:text-white -order-last transition-all duration-200"
                >Year of purchase {@html isBought
                    ? `<span class="text-red-600">*</span>`
                    : ""}</label
            >
        </div>
        <div class="one-cell row-start-4 row-end-4 col-start-3 col-end-3">
            <div class="relative w-full flex">
                <input
                    type="text"
                    name="price"
                    id="price"
                    bind:value={price}
                    autocomplete="off"
                    maxlength="30"
                    class="my-input peer"
                    placeholder="149.99"
                />
                <div
                    class="absolute flex flex-col justify-center right-0 bottom-0 h-full pointer-events-none bg-zinc-500 opacity-70"
                >
                    <img
                        src="../../../../currencies/{currencies[
                            $userInfo.currency
                        ]}"
                        alt="currency"
                        class="w-8 h-fit p-1.5"
                    />
                </div>
            </div>

            <label
                for="price"
                class="peer-focus:text-white -order-last transition-all duration-200"
                >Price</label
            >
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
                        <p class="text-sm pt-2">
                            {file.name} ({file.size} bytes)
                        </p>
                    {/each}
                {/if}
            </div>
        </div>
        <div
            class="one-cell row-start-7 row-end-7 col-start-1 col-end-1 flex flex-row gap-8"
        >
            <button
                class:set-added={form?.newSetAdded}
                type="submit"
                class="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 border-2 border-transparent py-3 px-10 w-fit mt-10 text-white uppercase font-bold transition-all disabled:cursor-default disabled:opacity-75 disabled:bg-zinc-800 disabled:text-gray-300"
                class:!cursor-default={isSearching}
                disabled={(form?.newSetAdded &&
                    !(
                        name.length === 0 ||
                        setNumber.length === 0 ||
                        partsAmount.length === 0 ||
                        themeName.length === 0
                    )) ||
                    isSearching}
            >
                {form?.newSetAdded ? form?.newSetAdded.message : "Add set"}
            </button>
            {#if form?.newSetFailed}
                <p class="text-red-500 font-bold pt-4">
                    {form?.newSetFailed.message}
                </p>
            {/if}
            {#if form?.problem}
                <p class="text-red-500 font-bold pt-4">
                    {form?.problem}
                </p>
            {/if}
        </div>
    </form>
</section>

<style lang="postcss">
    .one-cell {
        @apply flex flex-col gap-2 text-gray-500;
    }
    .set-added {
        @apply border-green-500 text-green-500 disabled:opacity-80 bg-transparent cursor-default;
    }
    .setChosen {
        @apply border-zinc-300/70 bg-zinc-300/40 text-white;
    }
    /* .publicSet {
        @apply border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black;
    }

    .publicSetChosen {
        @apply border-blue-400 text-blue-400 bg-blue-400 hover:bg-blue-400 hover:text-black;
    } */
</style>
