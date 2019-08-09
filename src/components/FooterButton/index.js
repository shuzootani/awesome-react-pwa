import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../Button'

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

const BaseFooterButton = styled(Button)`
  flex: 1;
`

function FooterButton({ children, ...rest }) {
  return (
    <ButtonContainer>
      <BaseFooterButton {...rest}>{children}</BaseFooterButton>
    </ButtonContainer>
  )
}

FooterButton.propTypes = {
  children: PropTypes.array.isRequired,
}

export default FooterButton
