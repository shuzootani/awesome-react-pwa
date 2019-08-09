import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Color from '../../utils/color'

const TextAreaContainer = styled.div`
  min-width: 0;
  width: 100%;
`

const Label = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  color: ${Color.Grey};
  width: 100%;
  margin-bottom: 0.5rem;
`

const BaseTextArea = styled.textarea`
  padding: 0.5rem 0;
  border: none;
  border-bottom: 2px solid ${Color.Grey};
  background: transparent;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  &:focus,
  &:active {
    border-color: ${Color.DarkGreen};
  }
`

function TextArea({ label, ...rest }) {
  return (
    <TextAreaContainer>
      {label && <Label>{label}</Label>}
      <BaseTextArea {...rest} />
    </TextAreaContainer>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
}

TextArea.defaultProps = {
  label: '',
}

export default TextArea
