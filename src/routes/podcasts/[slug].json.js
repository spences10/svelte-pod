import { client } from '$lib/gql/graphql-client'
import { queryPodcasts } from '$lib/gql/queries'
import { podList } from '$lib/podcasts'
import slugify from 'slugify'

export const get = async req => {
  const slug = req.params.slug
  const podcast = podList.find(
    pod => slugify(pod.title, { lower: true }) === slug
  )

  try {
    const variables = { url: podcast.url }
    const {
      rss: { rss2Feed },
    } = await client.request(queryPodcasts, variables)
    return {
      status: 200,
      body: rss2Feed,
    }
  } catch (error) {
    return {
      status: 500,
      body: { error: error.message },
    }
  }
}
