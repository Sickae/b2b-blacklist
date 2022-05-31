<script context="module" lang="ts">
    async function loadItems(filter: string) {
        const endpoint = filter?.length > 0 ? `/blacklist/${filter}.json` : '/blacklist.json';
        const res = await fetch(endpoint);
        
        return await res.json();
    }
</script>

<script lang="ts">
    import BlacklistGrid from "$lib/components/BlacklistGrid.svelte";
    import {onMount} from "svelte";
    
    export let items = [];
    
    let filter = '';
    let isLoading = true;
    
    onMount(async () => {
        await refreshItems();
    });
    
    async function refreshItems() {
        isLoading = true;
        const newItems = await loadItems(filter);
        items = newItems;
        isLoading = false;
    }

    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    
    const processFilter = debounce(async (e) => {
        await refreshItems();
    });
    
</script>

<div class="bg-base-300 shadow-md flex items-center p-3">
    <img src="./b2b-logo.png" alt="Back2Basics Logo" id="b2b-logo" />
    <h1 class="mx-5 text-center w-full">Back2Basics - Guild Blacklist</h1>
</div>

<div class="flex justify-center">
    <div class="flex flex-col w-3/4 gap-4 m-5">
        <div class="flex gap-2">
            <input bind:value={filter} on:keyup={processFilter} class="form-control input bg-base-200 w-full" placeholder="Search" />
<!--            <button class="btn" on:click={refreshItems}>Search</button>-->
        </div>
    
        <BlacklistGrid {items} {isLoading} />
    </div>
</div>

<style>
    #b2b-logo {
        width: 48px;
        height: 48px;
    }
    
    h1 {
        font-size: 2rem;
    }
</style>