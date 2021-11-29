import { writable } from 'svelte/store'

export const nowPlaying = writable(``)
export const currentTime = writable(0)

export const setNowPlaying = url => {
  nowPlaying.set(url)
}

export const setCurrentTime = currentTime => {
  nowPlaying.set(currentTime)
}
