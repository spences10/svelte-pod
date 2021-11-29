import { gql } from 'graphql-request'

export const RSSFragment = gql`
  fragment RSSFragment on Rss2Channel {
    title
    copyright
    description
    image {
      uri
    }
    items {
      title
      link
      pubDate
      description
      content
      enclosure {
        mime
        url
        length
      }
    }
  }
`

export const RSSIndexFragment = gql`
  fragment RSSIndexFragment on Rss2Channel {
    title
    copyright
    description
    image {
      uri
    }
    items {
      title
      link
    }
  }
`

export const queryPodcasts = gql`
  query PodcastsQuery($url: String!) {
    rss {
      rss2Feed(url: $url) {
        ...RSSFragment
      }
    }
  }
  ${RSSFragment}
`

export const queryPodcastsIndex = gql`
  query PodcastsQuery($url: String!) {
    rss {
      rss2Feed(url: $url) {
        ...RSSIndexFragment
      }
    }
  }
  ${RSSIndexFragment}
`
