import styled from 'styled-components'
import Space from '../../utils/space'
import Color from '../../utils/color'

export const PaymentContainer = styled.form`
	padding: 1rem;
`

export const InputContainer = styled.div`
	border-bottom: 2px solid ${({ focused }) => focused ? Color.Petrol : Color.BGGrey};
	padding: 1rem;
`
