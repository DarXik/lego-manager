<script>

</script>

<style lang="postcss">
    div{
        @apply bg-slate-200 w-fit p-2 m-1;
    }
</style>

<section>
    <h1 class="font-bold text-2xl mb-2">Add Set</h1>
    <form method="POST" action="?/addSet">
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" autocomplete="off" />
        </div>
        <div>
            <label for="setNumber">setNumber</label>
            <input type="text" name="setNumber" id="setNumber" autocomplete="off" />
        </div>
        <div>
            <label for="description">Description</label>
            <textarea name="description" id="description" autocomplete="off"></textarea>
        </div>
        <div>
            <label for="partsAmount">Amount of parts</label>
            <input type="text" name="partsAmount" id="partsAmount" autocomplete="off" />
        </div>
        <div>
            <label for="themeId">Theme ID</label>
            <input type="text" name="themeId" id="themeId" autocomplete="off" />
        </div>
        <div>
            <label for="yearReleased">Year of release</label>
            <input type="text" name="yearReleased" id="yearReleased" autocomplete="off" />
        </div>
        <div>
            <label for="isBought">Did you own it?</label>
            <input type="checkbox" name="isBought" id="isBought" autocomplete="off" />
        </div>
        <div>
            <label for="yearBought">Year of purchase</label>
            <input type="text" name="yearBought" id="yearBought" autocomplete="off" />
        </div>
        <div>
            <label for="price">Price</label>
            <input type="text" name="price" id="price" autocomplete="off" />
        </div>
        <div>
            <label for="imageThumbnailUrl">Image URL</label>
        </div>
        <div>
            <label for="instructions">PDF Manual</label>
        </div>
        <div>
            <button type="submit" class="bg-zinc-300 p-2 px-4">Add Set</button>
        </div>
    </form>
</section>