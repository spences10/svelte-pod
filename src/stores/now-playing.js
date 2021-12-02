import { writable } from 'svelte/store'

export const nowPlaying = writable(``)
export const currentTime = writable(0)
export const playbackRate = writable(1)

export const setNowPlaying = url => {
  nowPlaying.set(url)
}

export const setCurrentTime = time => {
  currentTime.set(time)
}

export const setPlaybackRate = rate => {
  playbackRate.set(rate.toFixed())
}
