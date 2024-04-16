<script>
    

    let searchQuery;
    export let form;
    export let data;
</script>

<section class="text-white px-20">
    <h1 class="font-bold text-3xl mb-2 mt-8">Vítej zpět, Štěpáne</h1>
    <div class="h-[35em] mb-10">
        <p>Zde jsou tvé stavebnice</p>
    </div>

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
</section>
