import { queryPodcasts } from '$lib/gql/queries'
import { podList } from '$lib/podcasts'
import { GraphQLClient } from 'graphql-request'
import { writable } from 'svelte/store'

const VITE_GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT

const client = new GraphQLClient(VITE_GRAPHQL_ENDPOINT)

export const podcastsStore = writable({})

const getPodcasts = async () => {
  const podcasts = await Promise.all(
    podList.map(async pod => {
      const variables = { url: pod.url }
      const {
        rss: { rss2Feed },
      } = await client.request(queryPodcasts, variables)
      return rss2Feed
    })
  )
  podcastsStore.set(podcasts)
}

await getPodcasts()
