import React from 'react'
import styled from 'styled-components'
import Color from '../../utils/color';

const BaseTextInput = styled.input`
  border-bottom: 2px solid ${({ error }) => error ? Color.Yellow : Color.BGGrey};
  min-width: 0;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ error }) => error ? Color.Yellow : Color.DarkGreen};
  caret-color: ${({ error }) => error ? Color.Yellow : Color.DarkGreen};
  &::placeholder {
    transition: all 0.2s ease-out;
    color: ${({ error }) => error ? Color.Yellow : Color.BGGrey};
    font-size: 1rem;
  }
  &:active, &:focus {
    border-color: ${({ error }) => error ? Color.Yellow : Color.DarkGreen};
    &::placeholder {
      font-size: 0.7rem;
      position: absolute;
      left: 0;
      bottom: 100%;
    }
  }
`

function TextInput(props) {
  const { required, placeholder } = props
  const label = required ? `${placeholder} *` : placeholder
  return (
    <BaseTextInput type="text" {...props} placeholder={label} />
  )
}

export default TextInput
