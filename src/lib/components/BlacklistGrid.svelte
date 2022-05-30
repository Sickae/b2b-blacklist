<script context="module">
    import * as contentful from "contentful";

    const client = contentful.createClient({
        space: "{{ spaceId }}",
        accessToken: "{{ accessToken }}"
    });
</script>

<script lang="ts">
    import {onMount} from "svelte";

    let blacklists = [];
    onMount(() => {
        client.getEntries().then(response => {
            console.log('response', response);
            blacklists = [...response.items.map(item => item.fields)];
        });
    });
    
    $: console.log('bl', blacklists);
</script>

<div class="flex flex-col w-3/4 gap-4">
    <div class="flex">
        <input class="form-control input bg-base-200 w-full" placeholder="Search" />
    </div>

    <table class="table w-full shadow-md rounded-2xl">
        <thead>
        <tr>
            <th>Character name</th>
            <th>Reason</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {#each blacklists as blacklist}
            <tr>
                <td>{blacklist.characterName}</td>
                <td>{blacklist.reason}</td>
                <td>{new Date(blacklist.date).toDateString()}</td>
            </tr>
        {/each}
    </table>
</div>