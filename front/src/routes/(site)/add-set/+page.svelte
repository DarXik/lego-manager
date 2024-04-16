<script>
    import { enhance } from "$app/forms";
    export let form;
    export let data;

    console.log(data);

    // let imageFile;
    // let base64String;

    let name;
    let setNumber;
    let yearReleased;
    let isBought;
    let yearBought;
    let description;
    let price;
    let partsAmount;
    let themeId;

    // async function handleImageUpload(event) {
    //     imageFile = event.detail.files[0];

    //     if (!imageFile) return;

    //     const reader = new FileReader();
    //     reader.readAsDataURL(imageFile);
    //     reader.onload = () => {
    //         const base64String = reader?.result?.split(",")[1];
    //     };
    // }

    // async function handleFormSubmit(event) {
    //     event.preventDefault();

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
    //     formData.append("imageThumbnail", base64String);

    //     const response = await fetch("http://localhost:3000/api/v1/sets/add", {            
    //         method: "POST",
    //         headers: {
    //             "Authorization": data.session,
    //         },
    //         body: formData,
    //     })
    // }
</script>

<section>
    <h1 class="font-bold text-2xl mb-2">Add Set</h1>
    <form
        method="POST"
        action="?/addSet"
        use:enhance
        enctype="multipart/form-data"
    >
        <div>
            <label for="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                bind:value={name}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="setNumber">setNumber</label>
            <input
                type="text"
                name="setNumber"
                id="setNumber"
                bind:value={setNumber}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="description">Description</label>
            <textarea
                name="description"
                id="description"
                bind:value={description}
                autocomplete="off"
            ></textarea>
        </div>
        <div>
            <label for="partsAmount">Amount of parts</label>
            <input
                type="text"
                name="partsAmount"
                id="partsAmount"
                bind:value={partsAmount}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="themeId">Theme ID</label>
            <input
                type="text"
                name="themeId"
                id="themeId"
                bind:value={themeId}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="yearReleased">Year of release</label>
            <input
                type="text"
                name="yearReleased"
                id="yearReleased"
                bind:value={yearReleased}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="isBought">Did you own it?</label>
            <input
                type="checkbox"
                name="isBought"
                id="isBought"
                bind:value={isBought}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="yearBought">Year of purchase</label>
            <input
                type="text"
                name="yearBought"
                id="yearBought"
                bind:value={yearBought}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="price">Price</label>
            <input
                type="text"
                name="price"
                id="price"
                bind:value={price}
                autocomplete="off"
            />
        </div>
        <div>
            <label for="imageThumbnail">Image URL</label>
            <input
                type="file"
                id="imageThumbnail"
                name="imageThumbnail"
                accept=".jpg, .jpeg, .png, .webp"
                
            />
        </div>
        <div>
            <label for="instructions">PDF Manual</label>
        </div>
        <div>
            <button
                type="submit"
                formaction="?/addSet"
                
                class="bg-zinc-300 p-2 px-4">Add Set</button
            >
        </div>
    </form>

    {#if form}
        <p>{form.success}</p>
    {/if}
</section>

<style lang="postcss">
    div {
        @apply bg-slate-200 w-fit p-2 m-1;
    }
</style>
