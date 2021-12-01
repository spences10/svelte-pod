<script>
  import BackwardTen from '$lib/icons/backward-ten.svelte'
  import ForwardTen from '$lib/icons/forward-ten.svelte'
  import Pause from '$lib/icons/pause.svelte'
  import Play from '$lib/icons/play.svelte'
  import { onDestroy, onMount } from 'svelte'
  import {
    nowPlaying,
    setCurrentTime,
  } from '../../stores/now-playing'

  export let url

  let audioFile
  let isPlaying = false
  let vol = 50
  let totalTrackTime
  let totalTimeDisplay = 'loading...'
  let currentTimeDisplay = '0:00:00'
  let progress
  let trackTimer

  onMount(() => {
    audioFile = new Audio(url)

    audioFile.onloadedmetadata = () => {
      totalTrackTime = audioFile.duration
      updateTime()
    }
  })

  const updateTime = () => {
    progress = audioFile.currentTime * (100 / totalTrackTime)

    let currentHours = Math.floor(audioFile.currentTime / 60 / 60)
    let currentMinuets = Math.floor(audioFile.currentTime / 60)
    let currentSeconds = Math.floor(
      audioFile.currentTime - currentMinuets * 60
    )

    let durationHours = Math.floor(totalTrackTime / 60 / 60)
    let durationMinutes = Math.floor((totalTrackTime / 60) % 60)
    let durationSeconds = Math.floor(
      totalTrackTime - durationHours * 60 * 60 - durationMinutes * 60
    )

    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`
    if (currentMinuets < 10) currentMinuets = `0${currentMinuets}`
    if (durationMinutes < 10) durationMinutes = `0${durationMinutes}`

    currentTimeDisplay = `${currentHours}:${currentMinuets}:${currentSeconds}`
    totalTimeDisplay = `${durationHours}:${durationMinutes}:${durationSeconds}`

    if (audioFile.ended) {
      toggleTimeRunning()
    }
  }

  const toggleTimeRunning = () => {
    if (audioFile.ended) {
      clearInterval(trackTimer)
    } else {
      trackTimer = setInterval(updateTime, 100)
    }
  }

  onDestroy(() => {
    audioFile = null
  })

  const playAudio = () => {
    if (audioFile.paused) {
      toggleTimeRunning()
      audioFile.play()
      isPlaying = true
    } else {
      toggleTimeRunning()
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

  const adjustVol = () => {
    audioFile.volume = vol / 100
  }

  // increase playback rate
  const increasePlaybackRate = () => {
    audioFile.playbackRate += 0.1
  }

  // decrease playback rate
  const decreasePlaybackRate = () => {
    audioFile.playbackRate -= 0.1
  }
</script>

<!-- https://www.youtube.com/watch?v=4rJ1F-tOk-M -->

{$nowPlaying}

<section class="fixed bottom-0 left-0 right-0 bg-red-500 z-10 flex">
  <div class="flex flex-col m-3">
    <div class="flex col-span-1">
      <div>
        <button on:click={rewindAudio}><BackwardTen /></button>
      </div>
      <div>
        <button on:click={playAudio}>
          {#if isPlaying}
            <Pause />
          {:else}
            <Play />
          {/if}
        </button>
      </div>
      <div>
        <button on:click={forwardAudio}><ForwardTen /></button>
      </div>
    </div>

    <div class="flex">
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
  </div>

  <div class="flex w-full items-center">
    <div class="mx-3">
      <span>{totalTimeDisplay}</span>
    </div>

    <div
      class="w-full h-3 flex items-center border border-dark-500 cursor-pointer"
    >
      <span class="h-3 bg-primary" style="width: {progress}%" />
    </div>
    <div class="mx-3">
      <span>{currentTimeDisplay}</span>
    </div>
  </div>

  <div class="flex items-center">
    <div>
      <button on:click={increasePlaybackRate}>+ Playback Rate</button>
    </div>
    <div>
      <button on:click={decreasePlaybackRate}>- Playback Rate</button>
    </div>
  </div>
</section>
