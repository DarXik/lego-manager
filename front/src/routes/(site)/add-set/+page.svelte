<script lang="ts">
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";

    export let form;
    export let data;

    let name: any;
    let setNumber: any;
    let yearReleased: any;
    let isBought: boolean = false;
    let yearBought: any = "";
    let description: any;
    let price: any;
    let partsAmount: any;
    let themeId: any;
    let imageThumbnail: any;
    let uploadedImage: string;

    $: isBought = yearBought.length > 0;

    function handleImageUpload(e: Event) {
        const image = (e.target as HTMLInputElement)?.files?.[0];
        if (!image) return;

        uploadedImage = URL.createObjectURL(image);
    }

    $: {
        if (form?.message) {
            uploadedImage = "";
            setTimeout(() => {
                uploadedImage = "";
                imageThumbnail = "";
                window.location.reload();
            }, 3000);
            imageThumbnail = "";
        }
    }
</script>

<section class="px-20 mb-10">
    <h1 class="font-bold text-3xl mb-20 mt-8">Add new set</h1>

    <form
        method="POST"
        action="?/addSet"
        enctype="multipart/form-data"
        use:enhance
        class="lg:grid lg:grid-cols-3 lg:grid-rows-auto flex flex-col gap-4 lg:w-9/12"
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
                >Set number (custom/official) <span class="text-red-600">*</span
                ></label
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
            <label for="description">Description (max 256)</label>
            <textarea
                name="description"
                id="description"
                bind:value={description}
                autocomplete="off"
                rows="3"
                class="placeholder:italic w-full text-zinc-100 resize-none placeholder:text-gray-600 text-sm px-3 py-2 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none transition-all"
                maxlength="256"
                placeholder="Authentic replica of the Atreides Royal Ornithopter from Dune..."
            ></textarea>
        </div>
        <div class="one-cell row-start-2 row-end-2 col-start-3 col-end-3">
            <label for="themeId"
                >Theme ID (custom/official) <span class="text-red-600">*</span
                ></label
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
            <label for="imageThumbnail">Image URL</label>
            <div class="my-input">
                <input
                    type="file"
                    id="imageThumbnail"
                    name="imageThumbnail"
                    accept="image/*"
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
            <label for="instructions">PDF Manual</label>
            <div class="my-input">
                <input
                    type="file"
                    id="instructions"
                    name="instructions"
                    accept="application/pdf"
                />
            </div>
        </div>
        <div
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
                >{isBought ? "I own this set" : "Do I own this set?"}</label
            >
        </div>

        <div class="one-cell row-start-7 row-end-7 col-start-1 col-end-1">
            <button
                class:set-added={form?.success}
                type="submit"
                class="bg-zinc-800 border-2 border-transparent py-3 px-10 w-fit mt-10 text-white uppercase font-bold hover:bg-zinc-900 active:bg-zinc-950 transition-all"
                disabled={form?.loading || form?.success}
                >{form?.message.message
                    ? form?.message.message
                    : "Add set"}</button
            >
            {#if !form?.success && form?.message}
                <p class="text-red-500 font-bold pt-4">{form?.message}</p>
            {/if}
        </div>
    </form>
</section>

<style lang="postcss">
    .my-input {
        @apply placeholder:italic  placeholder:text-gray-600 text-sm text-white w-full px-3 py-2 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none  transition-all;
    }
    .one-cell {
        @apply flex flex-col gap-2 text-gray-500;
    }
    .set-added {
        @apply border-green-500 text-green-500 disabled:opacity-80 bg-transparent cursor-default;
    }
</style>
