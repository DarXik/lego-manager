<script>
  import "../../app.css";
  import Navbar from "./components/Navbar.svelte";
  import { onMount } from "svelte";
  import { userSets, isSearching } from "$lib/store";

  export let data;
  $: console.log(data.sets);
  onMount(() => {
    if (data.sets) {
      // let localSets = [];

      // for (const key in data.sets) {
      //   console.log(key);
      //   const imageData = {
      //     filename: data.sets[key].imageThumbnail.filename,
      //     mimetype: data.sets[key].imageThumbnail.mimetype,
      //     id: data.sets[key].imageThumbnail.id,
      //     imageThumbnail: `data:${data.sets[key].imageThumbnail.mimetype};base64,${data.sets[key].imageThumbnail.imageThumbnail}`,
      //     addedBy: data.sets[key].imageThumbnail.addedBy,
      //   };

      //   localSets.push({
      //     ...data.sets[key],
      //     imageThumbnail: imageData,
      //   });
      // }

      $userSets = data.sets;
    }
  });
</script>

<Navbar />

<main>
  <slot />
</main>
