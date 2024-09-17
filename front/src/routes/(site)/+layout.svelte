<script lang="ts">
  import "../../app.css";
  import 'charts.css';

  import Navbar from "./components/Navbar.svelte";
  import { onMount } from "svelte";
  import { userSets, userInfo } from "$lib/store";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: console.log(data);

  onMount(() => {
    if (data.sets) {
      $userSets = data.sets;
    }
  });
</script>

<Navbar />

<main class="md:ml-24 max-md:mt-20 min-h-screen">
  <div class="border-b-3 border-zinc-600 p-4 px-6 max-md:hidden">
    <p class="text-2xl">
      <span class="text-base text-gray-500">logged in as</span>
      {data.username ? data.username : "--"}
    </p>
  </div>
  <slot />
</main>

<footer
  class="w-full border-main py-2 md:py-4 px-12 flex flex-row justify-end bg-gray-950"
>
  <div
    class="md:ml-24 flex md:flex-row flex-col max-md:text-center justify-between items-center w-full max-md:text-sm"
  >
    <small><p class="md:text-start w-full">Version: 1.0</p></small>
    <small
      ><p class="md:text-end w-full">
        &copy; {new Date().getFullYear()} | Made by David Pitra
      </p>
      <!-- <p>730 584 006 | david@cosminary.dev</p> -->
    </small>
  </div>
</footer>
