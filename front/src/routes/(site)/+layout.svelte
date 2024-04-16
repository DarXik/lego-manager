<script>
  import "../../app.css";
    import Navbar from "./components/Navbar.svelte";

  export let data;
</script>

<Navbar/>
<main>
  <slot />
</main>
