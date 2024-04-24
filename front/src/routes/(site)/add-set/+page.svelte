<script>
    import { enhance } from "$app/forms";
    export let form;
    export let data;

    console.log(data);

    let file;
    let name;
    let setNumber;
    let yearReleased;
    let isBought;
    let yearBought;
    let description;
    let price;
    let partsAmount;
    let themeId;
    let imageThumbnail;
    let newSetResp;

    // async function submitSet() {
    //     const formData = new FormData();
    //     formData.append("name", name);
    //     formData.append("setNumber", setNumber);
    //     formData.append("yearReleased", yearReleased);
    //     formData.append("isBought", isBought);
    //     formData.append("yearBought", yearBought);
    //     formData.append("description", description);
    //     formData.append("price", price);
    //     formData.append("partsAmount", partsAmount);
    //     formData.append("themeId", themeId);
    //     formData.append("imageThumbnail", file);

    //     const resp = await fetch("/api/addSet", {
    //         method: "POST",
    //         body: formData,
    //     });

    //     newSetResp = await resp.json();
    //     console.log(newSetResp);
    // }
</script>

<section class="px-20 mb-10">
    <h1 class="font-bold text-3xl mb-20 mt-8">Add new set</h1>

    <form
        method="POST"
        action="?/addSet"
        enctype="multipart/form-data"
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
                maxlength="256"
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
                maxlength="20"
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
                maxlength="20"
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
                class="w-full text-zinc-100 resize-none placeholder:text-gray-600 text-sm px-3 py-2 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none transition-all"
                maxlength="256"
                placeholder="Autentic replica of the Atreides Royal Ornithopter from Dune..."
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
                maxlength="20"
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
                >Year of purchase <span class="text-red-600">*</span></label
            >
            <input
                type="text"
                name="yearBought"
                id="yearBought"
                required
                bind:value={yearBought}
                autocomplete="off"
                maxlength="4"
                class="my-input"
                placeholder="2024"
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
                maxlength="20"
                class="my-input"
                placeholder="149.99"
            />
        </div>
        <div class="one-cell row-start-5 row-end-5 col-start-1 col-end-2">
            <label for="imageThumbnail">Image URL</label>
            <input
                type="file"
                id="imageThumbnail"
                name="imageThumbnail"
                class="my-input"
                accept="image/*"
                on:change={(e) => (file = e?.target?.files[0])}
                bind:value={imageThumbnail}
            />
        </div>
        <div class="one-cell row-start-5 row-end-5 col-start-2 col-end-3">
            <label for="instructions">PDF Manual</label>
        </div>
        <div
            htmlFor="isBought"
            class="cursor-pointer select-none flex flex-row items-center gap-3 hover:bg-zinc-900 w-fit px-3 py-2 text-gray-500 row-start-6 row-end-6 col-start-1 col-end-1 transition-all"
        >
            <input
                type="checkbox"
                name="isBought"
                id="isBought"
                bind:value={isBought}
                class="w-5 h-5 cursor-pointer checked:bg-red-900 bg-transparent"
                autocomplete="off"
            />
            <label
                htmlFor="isBought"
                class="w-fit text-white cursor-pointer"
                for="isBought">I already own this set</label
            >
        </div>

        <div class="one-cell row-start-7 row-end-7 col-start-1 col-end-1">
            <button
                type="submit"
                class="bg-zinc-800 py-3 px-10 w-fit mt-10 text-white uppercase font-bold hover:bg-zinc-900 active:bg-zinc-950 transition-all"
                >Add Set</button
            >
        </div>
    </form>

    {#if newSetResp}
        <img src={newSetResp.url} alt="set" />
    {/if}
</section>

<style lang="postcss">
    .my-input {
        @apply placeholder:text-gray-600 text-sm text-white w-full px-3 py-2 bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none  transition-all;
    }
    .one-cell {
        @apply flex flex-col gap-2 text-gray-500;
    }
</style>
