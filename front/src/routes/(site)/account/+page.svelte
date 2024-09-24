<script lang="ts">
    import { fade } from "svelte/transition";
    import type { PageData } from "./$types";

    export let data: PageData;
    interface Stats {
        releaseDates: any[];
        purchaseDates: any[];
        partsAmountTotal: number;
        setsUsedAmount: number;
        setsUsedByAmount: number;
        setsContributedAmount: number;
        totalPrice: number;
    }

    let stats: Stats = data.stats;
    let currencies = ["czk.svg", "euro.svg", "usd.svg", "gbp.svg"];
    $: console.log(stats);
</script>

<svelte:head>
    <title>Account</title>
    <meta name="description" content="Your account stats" />
</svelte:head>

<section in:fade={{ delay: 50, duration: 300 }}>
    <div class="border-b-3 border-zinc-600">
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl p-6">
            Your account stats
        </h1>
    </div>
    <div class="text-lg md:text-xl lg:w-9/12 border-zinc-600 flex flex-col">
        <div
            class="flex justify-between md:flex-row flex-col md:border-b-3 border-zinc-600"
        >
            <div
                class="stat flex flex-col max-md:flex-row max-md:items-end gap-1"
            >
                <p>
                    <span
                        class="text-3xl md:text-5xl lg:text-6xl text-purple-600"
                    >
                        {stats.setsUsedAmount}
                    </span>
                </p>
                <p>
                    {stats.setsUsedAmount == 1 ? "total sets " : "set "}in your
                    collection
                </p>
            </div>
            <div
                class="stat flex flex-col max-md:flex-row max-md:items-end gap-1"
            >
                <p>
                    <span
                        class="text-3xl md:text-5xl lg:text-6xl text-purple-600"
                    >
                        {stats.setsContributedAmount}
                    </span>
                </p>
                <p>
                    {stats.setsContributedAmount == 1 ? " sets " : "set "} contributed
                    by you
                </p>
            </div>
            <div
                class="stat flex flex-col max-md:flex-row max-md:items-end gap-1"
            >
                <p>
                    <span
                        class="text-3xl md:text-5xl lg:text-6xl text-purple-600"
                    >
                        {stats.setsUsedByAmount}
                    </span>
                </p>
                <p>
                    {stats.setsUsedByAmount == 1 ? "sets are " : "set is "} used
                    by the community
                </p>
            </div>
        </div>

        <div class="stat md:border-b-3 flex flex-row justify-center items-end">
            <p class="flex flex-row items-baseline gap-x-1">
                <span class="text-3xl md:text-5xl lg:text-6xl text-purple-600">
                    {stats.totalPrice}
                </span>
                <img
                    src="../../../../currencies/{currencies[data.currency]}"
                    alt="currency"
                    class="md:w-6 lg:w-7 w-5 self-baseline h-fit"
                />
                spent on your collection
            </p>
        </div>
        <div class="stat">
            <p>
                <span class="text-3xl md:text-5xl lg:text-6xl text-purple-600">
                    {stats.partsAmountTotal}
                </span>
                {stats.partsAmountTotal == 1 ? "brick " : "bricks "} built in total
            </p>
        </div>
    </div>
    <div
        class="flex flex-col gap-y-16 md:flex-row gap-x-16 max-md:mx-1 md:px-4 py-8 lg:w-9/12 md:border-main md:border-r-3"
    >
        <div
            class="w-full {stats.releaseDates.length < 2
                ? 'h-[10em]'
                : 'h-[20em]'}"
            id="release-year-chart"
        >
            <table
                class="charts-css bar data-center show-heading show-labels show-{Math.ceil(
                    stats.releaseDates.length / 2,
                )}-secondary-axes data-spacing-2 datasets-spacing-1 labels-align-inline-center"
                style="--aspect-ratio: {stats.releaseDates.length / 2} / 3;"
            >
                <p class="mx-auto mb-3 text-2xl">
                    Sets' release year distribution
                </p>
                <tbody>
                    {#each stats.releaseDates as date}
                        <tr>
                            <th>{date.year}</th>
                            <td
                                style="--size:calc( {date.frequency} / {stats
                                    .releaseDates.length} ); color: black; "
                                >{date.frequency}</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div
            class="w-full {stats.purchaseDates.length < 2
                ? 'h-[10em]'
                : 'h-[20em]'} max-md:border-t-3 max-md:py-4 border-zinc-600"
            id="purchase-year-chart"
        >
            <table
                class="charts-css bar data-center show-heading show-labels show-{Math.ceil(
                    stats.purchaseDates.length / 2,
                )}-secondary-axes data-spacing-2 datasets-spacing-1 labels-align-inline-center"
                style="--aspect-ratio: {stats.purchaseDates.length * 2} / 3;"
            >
                <p class="mx-auto mb-3 text-2xl">
                    Sets' purchase year distribution
                </p>
                <tbody>
                    {#each stats.purchaseDates as date}
                        <tr>
                            <th>{date.year}</th>
                            <td
                                style="--size:calc( {date.frequency} / {stats
                                    .purchaseDates.length} ); color: black; "
                                >{date.frequency}</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</section>

<style lang="postcss">
    #release-year-chart .bar {
        /* --aspect-ratio: 4 / 3; */
        --color: rgb(129, 74, 151);
        --secondary-axes-color: rgba(104, 104, 104, 0.534);
        --secondary-axes-style: solid;
        --secondary-axes-width: 1px;
    }
    #purchase-year-chart .bar {
        /* --aspect-ratio: 6 / 3; */
        --color: rgb(129, 74, 151);
        --secondary-axes-color: rgba(104, 104, 104, 0.534);
        --secondary-axes-style: solid;
        --secondary-axes-width: 1px;
    }
    .stat {
        @apply w-full max-md:border-b-3 md:border-r-3 border-zinc-600 p-6 md:text-center;
    }
</style>
