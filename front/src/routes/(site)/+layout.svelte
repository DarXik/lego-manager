<script lang="ts">
  import "../../app.css";
  import Navbar from "./components/Navbar.svelte";
  import { onMount } from "svelte";
  import { userSets, userInfo } from "$lib/store";
  import { fade } from "svelte/transition";

  export let data;

  $: console.log(data);

  onMount(() => {
    if (data.sets) {
      $userSets = data.sets;
    }
  });
</script>

<Navbar />

<main class="ml-24 min-h-screen" in:fade={{ delay: 50, duration: 300 }}>
  <div class="border-b-3 border-zinc-600 p-4 px-6">
    <p class="text-2xl"><span class="text-base text-gray-500">user:</span> {$userInfo.email? $userInfo.email : "--"}</p>
  </div>
  <slot />
</main>

<footer in:fade={{ delay: 150, duration: 300 }}
  class="w-full border-main py-4 px-12 flex flex-row justify-end bg-gray-950"
>
  <div class="ml-24 flex flex-row justify-between items-center w-full">
    <small><p class="text-start w-full">Version: <span class="italic">1.0</span></p></small>
    <small
      ><p class="text-end w-full">
        &copy; {new Date().getFullYear()} | Made by David Pitra
      </p>
      <p>730 584 006 | david@cosminary.dev</p>
      </small
    >
  </div>
</footer>
