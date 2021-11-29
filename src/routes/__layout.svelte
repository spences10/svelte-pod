<script>
  import Player from '$lib/components/player.svelte'
  import '../app.css'
  import { nowPlaying } from '../stores/now-playing'
</script>

<Player url={$nowPlaying} />

<main>
  <slot />
</main>
