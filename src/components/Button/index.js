import React from 'react'
import styled from 'styled-components'
import Color from '../../utils/color'

const BasicButton = styled.button`
  background: ${({ color, theme }) => color || theme.color.primary};
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: ${props => props.round ? '20px' : '2px'};
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
  padding: 0.5rem 1rem;
  &:disabled {
    background: ${Color.MudGrey};
  }
`

function Button(props) {
  return (
    <BasicButton {...props} />
  )
}

export default Button
