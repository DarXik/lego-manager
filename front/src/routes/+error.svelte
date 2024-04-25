<script>
    import { page } from "$app/stores";
    import "../app.css";
</script>

<svelte:head>
    <title>Error {$page.status}</title>
</svelte:head>

<main class="min-h-screen flex items-center justify-center no-un">
    <div
        class="bg-gray-950 border border-transparent shadow-lg p-8 px-16 flex items-center justify-center flex-col"
    >
        {#if $page.status === 404}
            <img class="w-80 mb-4" src="../../error/error404.png" alt="error" />
            <h1 class="text-3xl font-bold">Requested page not found</h1>
            <p class="text-gray-400 mt-1">
                You can try again or return to the homepage
            </p>
            <button
                class="mt-8 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed"
                ><a href="/">GO HOME</a></button
            >
        {:else}
            <h1 class="text-3xl font-bold">Your request failed</h1>
            <p class="text-gray-400 mt-1">
                You can try again or return to the homepage
            </p>
            <div class="flex mt-8 gap-8">
                <button
                class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed "
                ><a href="/">GO HOME</a></button
            >
            <button on:click={() => history.back()}
                class=" px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:pointer-events-none disabled:cursor-not-allowed "
                >GO BACK</button
            >
            </div>
        {/if}
    </div>
</main>
