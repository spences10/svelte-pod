import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Dosis:400,700|Poppins:400,700');
  
  body {
    margin: 0;
    color: hsla(0, 0%, 0%, 0.8);
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
`
