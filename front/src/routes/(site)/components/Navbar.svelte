<script>
    import { enhance } from "$app/forms";
</script>

<nav class="bg-black">
    <div class="flex justify-between items-center px-20 py-3">
        <div>
            <button><a href="/"><img src="../../LEGO_logo.svg" alt="lego" class="w-12 cursor-pointer" /></a></button>
        </div>
        <div>
            <button><a href="/add-set">Add set</a></button>
        </div>
        <div class="w-1/2 lg:w-1/4 flex flex-row justify-end">
            <form
                class="w-full"
                method="POST"
                action="?/searchLegoSet"
                use:enhance
            >
                <label
                    for="searchQuery"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Hledaný výraz:
                </label>
                <div class="relative flex">
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
                        class="block w-full p-2 ps-10 placeholder:text-gray-600 text-sm text-white bg-zinc-900 border-2 border-transparent focus:border-red-950 ring-0 focus:ring-0 outline-none focus:outline-none  transition-all"
                        placeholder="Atreides Royal..."
                        required
                    />
                    <!-- rounded-s-lg -->
                    <!-- rounded-e-lg -->
                    <button
                        type="submit"
                        class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Hledat
                    </button>
                </div>
            </form>
        </div>
    </div>
</nav>
