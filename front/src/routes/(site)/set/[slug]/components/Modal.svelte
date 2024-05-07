<script lang="ts">
    export let showModal: boolean;

    let dialog: any; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="border-2 border-zinc-600 bg-gradient-to-tl bg-black from-black from-10% to-purple-950/50 to-90%
     text-zinc-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm min-w-[25%] w-fit p-2"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <!-- <slot name="header" /> -->
        <slot />
        <!-- svelte-ignore a11y-autofocus -->
        <div class="flex flex-row justify-between mt-12">
            <slot name="button"></slot>
            <button
                class="border-2 border-red-400 p-2 px-4"
                on:click={() => dialog.close()}>Go back</button
            >
        </div>
    </div>
</dialog>

<style>
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
