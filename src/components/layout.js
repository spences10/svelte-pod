import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from './header'
import { GlobalStyle } from '../theme/globalStyle'

const AppStyles = styled.div`
  background-color: #161e2d;
  font-family: Poppins;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'header header header'
    'main   main   main ';
`

const ContentWrapper = styled.main`
  grid-area: main;
`

const Layout = ({ data, children }) => (
  <AppStyles>
    <Helmet
      // TODO: add i n SEO component
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}>
      <html lang="en" />
    </Helmet>
    <GlobalStyle />
    <Header siteTitle={data.site.siteMetadata.title} />
    <ContentWrapper>{children}</ContentWrapper>
  </AppStyles>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default props => (
  <StaticQuery
    query={graphql`
      query LayoutData {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)
