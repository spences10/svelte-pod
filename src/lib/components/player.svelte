<script>
  import { onMount } from 'svelte'
  import {
    nowPlaying,
    setCurrentTime,
  } from '../../stores/now-playing'

  export let url

  let audioFile

  onMount(() => {
    audioFile = new Audio(url)
  })
  // onDestroy(() => {
  //   audioFile = null
  // })

  let isPlaying = false

  const playAudio = () => {
    if (audioFile.paused) {
      audioFile.play()
      isPlaying = true
    } else {
      audioFile.pause()
      isPlaying = false
    }
  }

  const rewindAudio = () => {
    audioFile.currentTime -= 10
    setCurrentTime(audioFile.currentTime)
  }

  const forwardAudio = () => {
    audioFile.currentTime += 10
    setCurrentTime(audioFile.currentTime)
  }

  let vol = 50
  const adjustVol = () => {
    audioFile.volume = vol / 100
  }
</script>

<!-- https://www.youtube.com/watch?v=4rJ1F-tOk-M -->

<section class="fixed bottom-0 left-0 right-0 bg-red-500">
  {$nowPlaying}
  <div><button on:click={rewindAudio}>Rewind</button></div>
  <div>
    <button on:click={playAudio}
      >{isPlaying ? `Pause` : `Play`}</button
    >
  </div>
  <div><button on:click={forwardAudio}>Forward</button></div>
  <!-- <audio src={url} controls /> -->
  <div>
    <span>0</span>
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      bind:value={vol}
      on:input={adjustVol}
    />
    <span>{vol}</span>
  </div>
</section>
