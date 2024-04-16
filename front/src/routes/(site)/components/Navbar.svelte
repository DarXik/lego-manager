<script>
    import { enhance } from "$app/forms";
</script>

<nav class="bg-black ">
    <div class="flex justify-between items-center px-20 py-3">
        <div>
            <img src="../../LEGO_logo.svg" alt="lego" class="w-12" />
        </div>
        <div>
            <p>maybe some button</p>
        </div>
        <div class="w-1-[40%] flex flex-row justify-end">
            <form
                class="w-full"
                method="POST"
                action="?/searchLegoSet"
                use:enhance
            >
                <label
                    for="searchQuery"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >Hledaný výraz:</label
                >
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
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-s-lg  bg-gray-50 focus:ring-none focus:border-gray-100 focus:outline-none  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-gray-100 dark:outline-none transition-all"
                        placeholder="Atreides Royal..."
                        required
                    />
                    <button
                        type="submit"
                        class="text-white end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all font-medium rounded-e-lg  text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 "
                        >Hledat</button
                    >
                </div>
            </form>
        </div>
    </div>
</nav>
