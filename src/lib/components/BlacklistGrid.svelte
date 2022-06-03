<script context="module" lang="ts">
    async function loadGrid(filter: string, pageSize: number, pageIndex: number) {
        const endpoint = `/blacklist/${pageSize}/${pageIndex * pageSize}/${filter}`;
        const res = await fetch(endpoint);

        return await res.json();
    }
    
    async function getCount(filter: string) {
        const endpoint = `/blacklist/count/${filter}`;
        const res = await fetch(endpoint);
        const json = await res.json();
        
        return json.total;
    }
</script>

<script lang="ts">
    import Spinner from "./Spinner.svelte";
    import {onMount} from "svelte";
    import {EmojiSad, ExclamationCircle, Icon} from "svelte-hero-icons";

    export let pageSize = 10;
    
    const pageSizeOptions = [2, 10, 25, 50, 100];
    
    let filter = '';
    let pageIndex = 0;
    
    $:gridResult = loadGrid(filter, pageSize, pageIndex);
    $: totalCount = getCount(filter);
    
    onMount(async () => {
        await refreshPageIndex();
    });

    async function refreshPageIndex() {
        const count = await totalCount;
        
        if (pageIndex * pageSize >= count) {
            pageIndex = Math.max(0, Math.ceil(count / pageSize) - 1);
        }
    }
    
    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const processFilter = debounce((e) => {
        filter = e.target.value;
        refreshPageIndex();
    });
    
    function handlePaging(pageIdx: number) {
        pageIndex = pageIdx;
        refreshPageIndex();
    }
    
    function onClickNextPage() {
        pageIndex++;
        refreshPageIndex();
    }
    
    function onClickPrevPage() {
        pageIndex--;
        refreshPageIndex();
    }
    
</script>

<div class="flex flex-col w-3/4 gap-4 m-5 items-center">

    <div class="flex gap-2 w-full">
        <input on:keyup={processFilter} class="form-control input bg-base-200 w-full"
               placeholder="Search" />
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

        {#await gridResult}
            <tr>
                <td colspan="3" class="text-center">
                    <Spinner />
                </td>
            </tr>
        {:then result}
            {#each result.items as item}
                <tr>
                    <td>{item.characterName}</td>
                    <td>{item.reason}</td>
                    <td>{new Date(item.date).toDateString()}</td>
                </tr>
            {:else}
                <tr>
                    <td colspan="3" class="text-center">
                        <div class="flex items-center justify-center gap-2">
                            <Icon src="{EmojiSad}" solid size="2rem" />
                            <p>No data found</p>
                        </div>
                    </td>
                </tr>
            {/each}
        {:catch error}
            <tr>
                <td colspan="3" class="text-center text-error">
                    <div class="alert alert-error flex items-center gap-2">
                        <Icon src="{ExclamationCircle}" solid size="2rem"  />
                        <p class="mx-auto">{error.message}</p>
                    </div>
                </td>
            </tr>
        {/await}
    </table>

    <div class="flex justify-between w-full">
        <div>
            {#await totalCount then count}
                {#await gridResult then result}
                    <p>Showing {result.items.length} results of {count}</p>
                {:catch error}
                    <p>No result</p>
                {/await}
            {:catch error}
                <p>No result</p>
            {/await}
        </div>
        
        <div>
            {#await gridResult}
                <div class="btn-group">
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title="<<" disabled readonly />
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title="..." disabled readonly />
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title=">>" disabled readonly />
                </div>
            {:then result}
                <div class="btn-group">
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title="<<" 
                        on:click={onClickPrevPage} disabled="{pageIndex === 0}" />
                    
                    {#each Array(Math.ceil(result.total / pageSize)) as page, idx}
                        <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title="{idx + 1}" 
                               checked="{idx === pageIndex}" on:click={() => handlePaging(idx)} />
                    {/each}
                    
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title=">>"
                        on:click={onClickNextPage} disabled="{pageIndex === Math.floor(result.total / pageSize)}" />
                </div>
            {:catch error}
                <div class="btn-group">
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title="<<" disabled readonly />
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title="..." disabled readonly />
                    <input type="radio" name="page-options" class="btn bg-base-300 border-base-300" data-title=">>" disabled readonly />
                </div>
            {/await}
        </div>
        
        <div>
            <select class="select select-bordered" bind:value={pageSize} on:change={refreshPageIndex}>
                {#each pageSizeOptions as option}
                    <option value="{option}">{option}</option>
                {/each}
            </select>
        </div>
    </div>
</div>