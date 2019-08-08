import React from 'react'
import styled from 'styled-components'
import Color from '../../utils/color'
import Icon from '../Icon'

const CheckboxContainer = styled.div`
  border: 1px solid ${Color.DarkGreen};
  border-radius: 4px;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledIcon = styled.div`
  color: ${Color.Cyan};
  width: 100%;
  height: 100%;
  font-size: 1rem;
`

function Checkbox ({ checked = false, onClick = null }) {
  return (
    <CheckboxContainer onClick={onClick}>
      {checked && (
        <StyledIcon>
          <Icon name='check' />
        </StyledIcon>
      )}
    </CheckboxContainer>
  )
}

export default Checkbox
