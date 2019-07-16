import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: pink;
  margin-right: 16px;
`


function Home() {
  return (
    <div className="Home">
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/store/23">Store</StyledLink>
      <StyledLink to="/checkout">Checkout</StyledLink>
    </div>
  )
}

export default Home
