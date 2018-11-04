import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
// import Dump from '../components/dump'

const sortPodcasts = podcastArr =>
  podcastArr.reduce((acc, podcast) => {
    const image = podcast.rss2Feed.image
    const title = podcast.rss2Feed.title
    const items = podcast.rss2Feed.items

    return [
      ...acc,
      ...items.map(item => ({
        ...item,
        podcast: {
          title,
          image
        }
      }))
    ].sort((a, b) => b.pubDate - a.pubDate)
  }, [])

const IndexPage = ({ data }) => {
  const items = sortPodcasts([data.oneGraph.jsr, data.oneGraph.fehh])
  return (
    <Layout>
      {/* <Dump data={data} /> */}
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ color: 'white' }}>
            <img
              src={item.podcast.image.uri}
              alt={item.podcast.title}
              style={{ maxWidth: 100 }}
            />
            <h2>
              {new Date(item.pubDate).toLocaleString()}:{' '}
              {item.podcast.title}
            </h2>
            <p>{item.title}</p>
            {/* TODO: lazy load tags */}
            <audio controls src={item.enclosure.url}>
              Your browser does not support the <code>audio</code>{' '}
              tag.
            </audio>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    oneGraph {
      fsr: rss {
        rss2Feed(url: "http://rss.simplecast.com/podcasts/279/rss") {
          ...RSSFragment
        }
      }
      jsr: rss {
        rss2Feed(
          url: "https://www.heavybit.com/category/library/podcasts/jamstack-radio/feed/"
        ) {
          ...RSSFragment
        }
      }
      rp: rss {
        rss2Feed(url: "http://rss.simplecast.com/podcasts/6265/rss") {
          ...RSSFragment
        }
      }
      fehh: rss {
        rss2Feed(
          url: "http://feeds.soundcloud.com/users/soundcloud:users:206137365/sounds.rss"
        ) {
          ...RSSFragment
        }
      }
    }
  }
  fragment RSSFragment on ONEGRAPH_Rss2Channel {
    image {
      uri
    }
    title
    items {
      pubDate
      title
      link
      enclosure {
        mime
        url
        length
      }
    }
  }
`
