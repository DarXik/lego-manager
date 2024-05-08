<script lang="ts">
  import "../../app.css";
  import Navbar from "./components/Navbar.svelte";
  import { onMount } from "svelte";
  import { userSets, userInfo } from "$lib/store";

  export let data;

  $: console.log(data);

  onMount(() => {
    if (data.sets) {
      $userSets = data.sets;
    }
  });
</script>

<Navbar />

<main class="ml-24 min-h-screen">
  <div class="border-b-3 border-zinc-600 p-4 px-6">
    <p class="text-2xl"><span class="text-base text-gray-500">user:</span> {$userInfo.email? $userInfo.email : "--"}</p>
  </div>
  <slot />
</main>

<footer
  class="w-full border-main py-4 pr-12 flex flex-row justify-end bg-gray-950"
>
  <div class="ml-24">
    <small
      ><p class="text-end w-full">
        &copy; {new Date().getFullYear()} | Made by David Pitra
      </p>
      <p>730 584 006 | david@cosminary.dev</p></small
    >
  </div>
</footer>
