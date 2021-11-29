<script>
  import { fade, fly } from 'svelte/transition'
  import Portal from './portal.svelte'

  export let isModalOpen = false

  function closeModal() {
    isModalOpen = false
  }
</script>

{#if isModalOpen}
  <Portal>
    <div transition:fly={{ opacity: 0, y: 100 }}>
      <button on:click={closeModal} aria-label="close modal"
        >Close</button
      >
      <slot />
    </div>
    <div on:click={closeModal} transition:fade />
  </Portal>
{/if}
