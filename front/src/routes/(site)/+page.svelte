<script>
    import { onMount } from "svelte";

    export let form;
    export let data;

    let searchQuery;
    let username = "" || localStorage.getItem("username");
    console.log(data);
</script>

<section class="text-white px-20">
    <h1 class="font-bold text-3xl mb-2 mt-8">Welcome back, {username}</h1>

    <article class="flex flex-row gap-10 flex-wrap mt-16">
        {#each data.sets as set}
            <div
                class="flex flex-col w-96 hover:scale-110 transition-all hover:cursor-pointer"
            >
                <div class="">
                    <img
                        src="../../ornithopter-testing.webp"
                        alt="testing"
                        class="bg-white w-fit"
                    />
                </div>
                <div class="bg-gray-950 p-6 px-8">
                    <div>
                        <h3 class="text-2xl font-bold mb-14">
                            <span class="text-sm text-gray-500 font-normal"
                                >name
                            </span> <br />{set.name}
                        </h3>
                        <!-- <p class="text-lg"><span class="text-sm text-gray-500">desc. </span><br>{set.description}</p> -->
                    </div>
                    <div class="mt-6">
                        <p class="text-lg">
                            <span class="text-sm text-gray-500"
                                >no.
                            </span>{set.setNumber}
                            &bull;
                            <span class="text-sm text-gray-500"
                                >theme
                            </span>{set.themeName} &bull;
                            <span class="text-sm text-gray-500"
                                >owned
                            </span>{set.bought ? "Yes" : "No"}
                        </p>
                        <p>
                            <span class="text-sm text-gray-500"
                                >added on
                            </span>{new Date(set.addedOn)
                                .toLocaleString({ timeZone: "Europe/Paris" })
                                .split(",")[0]}
                            &bull;
                            <span class="text-sm text-gray-500"
                                >bought in
                            </span>{set.yearBought}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </article>

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
