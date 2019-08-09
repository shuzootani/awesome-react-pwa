import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from '../../../components/Icon'
import { FLEX_CENTER_CENTER } from '../../../utils/styles'
import Color from '../../../utils/color'
import TextInput from '../../../components/TextInput'
import CreditCardInput from '../../../components/CreditCardInput'
import { HeaderSmall } from '../../../components/Text'

export const PaymentFormContainer = styled.form`
  width: 100%;
  padding: 1rem 0;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
`

const PayIcon = styled.img`
  width: 2rem;
`

const MethodName = styled(HeaderSmall)`
  flex: 1;
  padding: 0 2rem;
`

const CheckMark = styled.div`
  width: 1rem;
  height: 1rem;
  ${FLEX_CENTER_CENTER}
  color: ${Color.Cyan};
`

const InputContainer = styled.div`
  border-bottom: 2px solid ${({ focused }) => focused ? Color.Petrol : Color.CoolGrey};
  padding: 1rem;
`

const NameInput = styled(TextInput)`
  margin-top: 2rem;
`

function PaymentSelectItem({
  id, icon, label, selected, onClick, showForm,
}) {
  const [name, setName] = useState('')
  const [focused, setFocused] = useState(false)

  function handleClick() {
    onClick(id)
  }

  function onFocusCCInput() {
    setFocused(true)
  }

  function onBlurCCInput() {
    setFocused(false)
  }

  function onNameChange({ target: { value } }) {
    setName(value)
    console.log(name)
  }

  return (
    <React.Fragment>
      <Row onClick={handleClick}>
        <CheckMark>{selected && <Icon name="check" />}</CheckMark>
        <MethodName>{label}</MethodName>
        <PayIcon src={icon} />
      </Row>
      {selected && showForm && (
        <PaymentFormContainer>
          <InputContainer focused={focused}>
            <CreditCardInput
              // autoComplete="cc-number"
              onFocus={onFocusCCInput}
              onBlur={onBlurCCInput}
            />
          </InputContainer>
          <NameInput
            name="name"
            autComplete="cc-name"
            placeholder="Name"
            required
            onChange={onNameChange}
          />
        </PaymentFormContainer>
      )}
    </React.Fragment>
  )
}

PaymentSelectItem.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  showForm: PropTypes.bool,
}

PaymentSelectItem.defaultProps = {
  selected: false,
  showForm: false,
  onClick: () => {},
}

export default PaymentSelectItem
