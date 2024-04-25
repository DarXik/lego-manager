<script>
    export let title;
    export let text;
    export let path;
</script>
<div class:hidden={!text} class="flex flex-row items-center gap-2 md:w-[11em] ">
    <img src="../../set/{path}" alt="bricks" class="bg-zinc-300 rounded-md w-10 p-2">
    <div class="flex flex-col justify-center">
        <p class="text-gray-500 text-xs break-normal">{title}</p>
        <p class="text-lg">{text}</p>
    </div>
</div>