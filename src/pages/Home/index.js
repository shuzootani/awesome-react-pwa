import * as React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
  color: ${props => props.color || 'blue'};
  margin-right: 16px;
`

function Home() {
  return (
    <React.Fragment>
      <StyledLink color="violet" to="/">Home</StyledLink>
      <StyledLink color="red" to="/store/23">Store</StyledLink>
      <StyledLink to="/checkout">Checkout</StyledLink>
    </React.Fragment>
  )
}

export default Home
