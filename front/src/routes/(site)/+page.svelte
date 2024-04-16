<script>
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";

    let searchQuery;
    export let form;
    export let data;
</script>

<div>
    <form method="POST" action="?/searchLegoSet" use:enhance>
        <label for="searchQuery">Hledaný výraz: </label>
        <input
            type="text"
            name="searchQuery"
            id="searchQuery"
            class="bg-blue-300"
        />
        <button type="submit">Hledat</button>
    </form>

    {#if form}
        {#if form?.success}
            {#each form.sets as set}
                <p>{set.name}</p>
                <p>{set.setNumber}</p>
            {/each}
        {:else}
            <p>{form?.message}</p>
        {/if}
    {/if}
</div>
