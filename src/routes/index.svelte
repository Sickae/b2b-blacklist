<script lang="ts">
    import BlacklistGrid from "$lib/components/BlacklistGrid.svelte";
</script>

<div class="bg-primary shadow-md flex items-center p-3">
    <h1 class="mx-5 text-center w-full">Back2Basics - Guild Blacklist</h1>
</div>

<div class="flex justify-center">
    <BlacklistGrid pageSize="{2}" />
</div>

<style>
    h1 {
        font-size: 2rem;
    }
</style>