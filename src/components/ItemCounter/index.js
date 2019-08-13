import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FlexBox from '../FlexBox'
import { HeaderSmall } from '../Text'
import Color from '../../utils/color'
import { FLEX_CENTER_CENTER } from '../../utils/styles'
import Button from '../Button'

const CounterContainer = styled(FlexBox)`
  width: min-content;
  align-items: center;
`

const CounterButton = styled(Button)`
  color: ${Color.DarkGreen};
  background: transparent;
  border: 1px solid ${Color.DarkGreen};
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
  value, inc, dec, max,
}) {
  return (
    <CounterContainer>
      {<CounterButton onClick={() => dec()}>-</CounterButton>}
      <CurrentValue>{value}</CurrentValue>
      {
        <CounterButton
          onClick={() => inc()}
          disabled={value >= max}
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
  max: PropTypes.number.isRequired,
}

export default ItemCounter
