import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FlexBox from '../FlexBox'
import { HeaderSmall } from '../Text'
import { FLEX_CENTER_CENTER } from '../../utils/styles'
import Icon from '../Icon'
import Button from '../Button'

const CounterContainer = styled(FlexBox)`
  width: min-content;
  align-items: center;
`

const CounterButton = styled(Button)`
  color: ${({ theme }) => theme.color.primary};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 2px;
  ${FLEX_CENTER_CENTER};
  padding: 2px 0.5rem;

  &:disabled {
    background: transparent;
    opacity: 0.5;
  }
`

const CurrentValue = styled(HeaderSmall)`
  padding: 0.5rem;
`

function ItemCounter({
  value, inc, dec, max, remove,
}) {

  function handleDecrement() {
    if (value > 1) {
      dec()
    } else {
      remove()
    }
  }

  return (
    <CounterContainer>
      <CounterButton onClick={handleDecrement}>
        {value > 1 ? '-' : <Icon name="trash" />}
      </CounterButton>
      <CurrentValue>{value}</CurrentValue>
      {
        <CounterButton
          onClick={inc}
          disabled={!!max && value >= max}
        >
          +
        </CounterButton>
      }
    </CounterContainer>
  )
}

ItemCounter.propTypes = {
  value: PropTypes.number.isRequired,
  inc: PropTypes.func.isRequired,
  dec: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  max: PropTypes.number,
}

ItemCounter.defaultProps = {
  max: null,
}

export default ItemCounter
