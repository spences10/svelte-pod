import { client } from '$lib/gql/graphql-client'
import { queryPodcastsIndex } from '$lib/gql/queries'
import { podList } from '$lib/podcasts'

export const get = async () => {
  try {
    const podcasts = await Promise.all(
      podList.map(async pod => {
        const variables = { url: pod.url }
        const {
          rss: { rss2Feed },
        } = await client.request(queryPodcastsIndex, variables)
        return rss2Feed
      })
    )
    return {
      status: 200,
      body: { podcasts },
    }
  } catch (error) {
    return {
      status: 500,
      body: { error: error.message },
    }
  }
}
