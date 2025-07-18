<script lang="ts">
  export let photos: string[] = [];
</script>

<style>
  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill,minmax(10rem,1fr));
  }
  .card {
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(22, 210, 178, 0.1);
    transition: transform .2s;
  }
  .card:hover {
    transform: scale(1.05);
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>

<div class="grid">
  {#each photos as url}
    <div class="card">
      <img src={url} alt="Photo" />
    </div>
  {/each}
</div>
