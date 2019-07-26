import styled from 'styled-components'
import Space from '../../utils/space';
import Color from '../../utils/color';

export const PaymentContainer = styled.div`
  padding: ${Space.L}px;
`

export const InputContainer = styled.div`
  border: 2px solid ${props => props.focused ? Color.Petrol : '#ddd'};
  border-radius: 2px;
  padding: 1rem;
`
