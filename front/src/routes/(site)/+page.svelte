<script>
    import { onMount } from "svelte";
    import { userInfo } from "$lib/store";

    export let form;
    export let data;

    let searchQuery;
    let username = $userInfo.username;
</script>

<section class="px-20">
    <h1 class="font-bold text-3xl mt-8 mb-20">Welcome back, {username}</h1>

    <article class="flex flex-wrap gap-6 grow">
        {#each data.sets as set}
            <div
                class="flex flex-col w-[20em] hover:scale-105 transition-all hover:cursor-pointer"
            >
                <div class="">
                    <img
                        src="../../ornithopter-testing.webp"
                        alt="testing"
                        class="bg-white w-fit"
                    />
                </div>
                <div class="bg-no-repeat bg-cover bg-gradient-to-tl from-gray-950  to-gray-900 p-6 px-8  select-none">
                    <div>
                        <h3 class="text-2xl font-bold mb-14 truncate">
                            <span class="text-sm text-gray-500 font-normal "
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
                            </span>{set.themeName}
                        </p>
                        <!-- <p>
                            <span class="text-sm text-gray-500"
                                >owned
                            </span>{set.bought ? "Yes" : "No"}
                        </p> -->
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
