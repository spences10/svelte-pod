import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const StyledHeader = styled.header`
  grid-area: header;
  background: #0a111e;
  margin-bottom: 1.45rem;

  display: grid;
`

const SiteTitle = styled.h1`
  color: #fff;
  margin: 0;
`

const SiteLink = styled(Link)`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  color: white;
  text-decoration: 'none';
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    {/* <Image img={'logo.png'} /> */}
    <SiteLink to="/">
      <SiteTitle>{siteTitle}</SiteTitle>
    </SiteLink>
  </StyledHeader>
)

export default Header
