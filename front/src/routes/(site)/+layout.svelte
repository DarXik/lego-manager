<script lang="ts">
  import "../../app.css";
  import Navbar from "./components/Navbar.svelte";
  import { onMount } from "svelte";
  import { userSets, navbarHeight } from "$lib/store";

  export let data;

  // onMount(async () => {
  //   $navbarHeight = document.getElementsByTagName("nav")[0].offsetHeight;
  // });

  $: console.log(data);

  onMount(() => {
    if (data.sets) {  

      $userSets = data.sets;
    }
  });
</script>

<Navbar />

<main class="relative z-0">
  <slot />
</main>
