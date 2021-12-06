import { writable } from 'svelte/store'

const audio = writable(null)
const nowPlaying = writable(
  `https://media.transistor.fm/d9b04961/a3ddb63a.mp3`
)
const currentTime = writable(0)
const playbackRate = writable(1)

const setAudio = audioObj => {
  audio.set(audioObj)
}

const setNowPlaying = url => {
  nowPlaying.set(url)
}

const setCurrentTime = time => {
  currentTime.set(time)
}

const setPlaybackRate = rate => {
  playbackRate.set(rate.toFixed(1))
}

export {
  setAudio,
  nowPlaying,
  currentTime,
  playbackRate,
  setNowPlaying,
  setCurrentTime,
  setPlaybackRate,
}
