<script lang="ts">
    import { fade } from "svelte/transition";
    import type { PageData } from "./$types";

    export let data: PageData;

    interface ReleaseDate {
        year: number;
        frequency: number;
    }

    let releaseDates: { [key: number]: ReleaseDate } = {};
    let purchaseDates: { [key: number]: ReleaseDate } = {};
    let partsAmountTotal: number = 0;
    let sets = data.sets;

    sets.forEach((set: any) => {
        if (set.yearReleased) {
            if (releaseDates[set.yearReleased]) {
                releaseDates[set.yearReleased].frequency++;
            } else {
                releaseDates[set.yearReleased] = {
                    year: set.yearReleased,
                    frequency: 1,
                };
            }
        }

        if (set.yearBought) {
            if (purchaseDates[set.yearBought]) {
                purchaseDates[set.yearBought].frequency++;
            } else {
                purchaseDates[set.yearBought] = {
                    year: set.yearBought,
                    frequency: 1,
                };
            }
        }

        if (set.partsAmount) {
            partsAmountTotal += set.partsAmount;
        }
    });

    let releaseDatesArray = Object.values(releaseDates);
    let purchaseDatesArray = Object.values(purchaseDates);
    $: console.log(partsAmountTotal);
</script>

<section in:fade={{ delay: 50, duration: 300 }}>
    <div class="border-b-3 border-zinc-600">
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl p-6">
            Your account
        </h1>
    </div>
    <div class="flex gap-x-16 px-4 py-8 lg:w-10/12">
        <div class="w-full h-full" id="release-year-chart">
            <table
                class="charts-css bar data-center show-heading show-labels show-{Math.floor(
                    releaseDatesArray.length / 3,
                )}-secondary-axes data-spacing-2 datasets-spacing-1 labels-align-inline-center"
                style="--aspect-ratio: {releaseDatesArray.length / 2} / 3;"
            >
                <p class="mx-auto mb-3 text-xl">
                    Sets' release year distribution
                </p>
                <tbody>
                    {#each releaseDatesArray as date}
                        <tr>
                            <th>{date.year}</th>
                            <td
                                style="--size:calc( {date.frequency} / {releaseDatesArray.length} ); color: black; "
                                >{date.frequency}</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="w-full h-full" id="purchase-year-chart">
            <table
                class="charts-css bar data-center show-heading show-labels show-{Math.floor(
                    purchaseDatesArray.length,
                )}-secondary-axes data-spacing-2 datasets-spacing-1 labels-align-inline-center"
                style="--aspect-ratio: {purchaseDatesArray.length * 2} / 3;"
            >
                <p class="mx-auto mb-3 text-xl">
                    Sets' purchase year distribution
                </p>
                <tbody>
                    {#each purchaseDatesArray as date}
                        <tr>
                            <th>{date.year}</th>
                            <td
                                style="--size:calc( {date.frequency} / {purchaseDatesArray.length} ); color: black; "
                                >{date.frequency}</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <div class="border-main">
        <div>
            <p class="text-xl p-6">
                You have {sets.length} sets in your collection, with a total of
                {partsAmountTotal} bricks.
            </p>
        </div>
    </div>
</section>

<style>
    #release-year-chart .bar {
        /* --aspect-ratio: 4 / 3; */
        --color: rgb(204, 156, 204);
        --secondary-axes-color: rgba(104, 104, 104, 0.63);
        --secondary-axes-style: solid;
        --secondary-axes-width: 1px;
    }
    #purchase-year-chart .bar {
        /* --aspect-ratio: 6 / 3; */
        --color: rgb(182, 113, 182);
        --secondary-axes-color: rgba(104, 104, 104, 0.63);
        --secondary-axes-style: solid;
        --secondary-axes-width: 1px;
    }
</style>
