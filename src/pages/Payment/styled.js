import styled from 'styled-components'
import { FLEX_CENTER_CENTER } from '../../utils/styles'
import Color from '../../utils/color'
import TextInput from '../../components/TextInput'

export const PaymentPageContainer = styled.div`
  padding: 0 1rem;
`

export const PaymentMethodList = styled.div`
  width: 100%;
  ${FLEX_CENTER_CENTER};
  flex-direction: column;
`

export const PaymentFormContainer = styled.form`
  width: 100%;
`

export const InputContainer = styled.div`
  border-bottom: 1px solid ${({ focused, theme }) => focused ? theme.color.primary : Color.CoolGrey};
  padding: 0.5rem 0;
  input {
    color: ${({ theme }) => theme.color.text};
    &:active,
    &:focus {
      border-color: ${({ theme }) => theme.color.primary};
    }
  }
`

export const NameInput = styled(TextInput)`
  margin: 1rem 0;
`
