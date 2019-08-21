import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '../Icon'

const CheckboxContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 4px;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledIcon = styled.div`
  color: ${({ theme }) => theme.color.secondary};
  width: 100%;
  height: 100%;
  font-size: 1rem;
`

function Checkbox({ checked, onClick }) {
  return (
    <CheckboxContainer onClick={onClick}>
      {checked && (
        <StyledIcon>
          <Icon name="check" />
        </StyledIcon>
      )}
    </CheckboxContainer>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Checkbox
