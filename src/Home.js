import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a`
  color: pink;
`


function Home() {
  return (
    <div className="Home">
      <StyledLink href="https://github.com/jaredpalmer/razzle">Docs</StyledLink>
    </div>
  )
}

export default Home
