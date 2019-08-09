import styled from 'styled-components'
import Color from '../../utils/color'
import { FLEX_CENTER_CENTER } from '../../utils/styles'

export const PaymentContainer = styled.form`
padding: 1rem;
`

export const InputContainer = styled.div`
  border-bottom: 2px solid ${({ focused }) => focused ? Color.Petrol : Color.CoolGrey};
  padding: 1rem;
`

export const PaymentMethodList = styled.div`
  padding: 1rem 0;
  width: 100%;
  ${FLEX_CENTER_CENTER};
  flex-direction: column;
`
