<script lang="ts">
    import Spinner from "./Spinner.svelte";

    export let items = [];
    export let isLoading = false;
</script>

<table class="table w-full shadow-md rounded-2xl">
    <thead>
    <tr>
        <th>Character name</th>
        <th>Reason</th>
        <th>Date</th>
    </tr>
    </thead>
    <tbody>

    {#if isLoading}
        <tr>
            <td colspan="3" class="text-center">
                <Spinner />
            </td>
        </tr>
    {:else}
        {#each items as item}
            <tr>
                <td>{item.characterName}</td>
                <td>{item.reason}</td>
                <td>{new Date(item.date).toDateString()}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="3" class="text-center">No items found</td>
            </tr>
        {/each}
    {/if}
</table>
