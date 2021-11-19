import { gql } from 'graphql-request'

export const RSSFragment = gql`
  fragment RSSFragment on Rss2Channel {
    title
    copyright
    image {
      uri
    }
    items {
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

export const queryPodcasts = gql`
  query PodcastsQuery {
    darknetDiaries: rss {
      rss2Feed(url: "https://feeds.megaphone.fm/darknetdiaries") {
        ...RSSFragment
      }
    }
  }
  ${RSSFragment}
`
