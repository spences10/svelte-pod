<script>
  import Player from '$lib/components/player.svelte'
  import '../app.css'
  import { nowPlaying } from '../stores/now-playing'
</script>

<Player url={$nowPlaying} />

<main class="container max-w-xl mx-auto px-4">
  <slot />
</main>
