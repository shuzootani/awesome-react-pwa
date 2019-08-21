import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Color from '../../utils/color'

const BaseTextInput = styled.input`
  border-bottom: 1px solid
    ${({ error }) => (error ? Color.Yellow : Color.CoolGrey)};
  min-width: 0;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ error, theme }) => (error ? Color.Yellow : theme.color.text)};
  caret-color: ${({ error, theme }) => (error ? Color.Yellow : theme.color.primary)};
  &:active,
  &:focus {
    border-color: ${({ error, theme }) => (error ? Color.Yellow : theme.color.primary)};
    & + span {
      transform: translateY(-100%);
      font-size: 0.7rem;
      color: ${({ theme }) => theme.color.primary};
    }
  }
  &:valid:not(:focus) {
    & + span {
      display: none;
    }
  }
`

const Label = styled.label`
  position: relative;
`

const Placeholder = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.2s ease;
  color: ${Color.CoolGrey};
  padding-bottom: 0.5rem;
  font-size: 0.8rem;
`

function TextInput(props) {
  const { required, placeholder } = props
  const label = required ? `${placeholder} *` : placeholder
  return (
    <Label>
      <BaseTextInput type="text" {...props} placeholder="" />
      <Placeholder>{label}</Placeholder>
    </Label>
  )
}

TextInput.propTypes = {
  required: PropTypes.bool,
  placeholder: PropTypes.string,
}

TextInput.defaultProps = {
  required: false,
  placeholder: '',
}

export default TextInput
