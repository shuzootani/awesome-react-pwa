import React from 'react'
import styled from 'styled-components'
import Color from '../../utils/color';

const ButtonContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background: #fff;
  display: flex;
  box-shadow: 0 0 4px 2px rgba(0,0,0,0.05);
`

const Button = styled.button`
  background: ${Color.Petrol};
  color: #fff;
  text-align: center;
  padding: 0.7rem;
  flex: 1;
  border-radius: 2px;
`

function FooterButton({ children, ...rest }) {
  return (
    <ButtonContainer>
      <Button {...rest}>{children}</Button>
    </ButtonContainer>
  )
}

export default FooterButton
