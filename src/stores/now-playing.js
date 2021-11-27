import { writable } from 'svelte/store'

export const nowPlaying = writable(``)

export const setNowPlaying = url => {
  nowPlaying.set(url)
}
