import React from 'react'
import styled from 'styled-components'
import Color from '../../utils/color'

const BasicButton = styled.button`
  background: ${props => props.color || Color.Petrol};
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border-radius: ${props => props.round ? '20px' : '2px'};
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre;
  padding: 0.5rem 1rem;
`

function Button(props) {
  return (
    <BasicButton {...props} />
  )
}

export default Button
