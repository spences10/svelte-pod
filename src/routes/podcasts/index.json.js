import { client } from '$lib/gql/graphql-client'
import { queryPodcasts } from '$lib/gql/queries'

export const get = async () => {
  try {
    const rss = await client.request(queryPodcasts)
    return {
      status: 200,
      body: rss,
    }
  } catch (error) {
    return {
      status: 500,
      body: { error: error.message },
    }
  }
}
