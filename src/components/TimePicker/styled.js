import styled from 'styled-components'
import Button from '../Button'
import { HeaderMed } from '../Text'
import { FLEX_CENTER_CENTER } from '../../utils/styles'

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

export const ModalHeader = styled(HeaderMed)`
  padding-bottom: 2rem;
`

export const TimePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
`

export const DateSelectContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`

export const DateSelectPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.color.text};
  border-radius: 2px;
  ${FLEX_CENTER_CENTER};
  padding: 0.5rem;
  color: ${({ theme }) => theme.color.text};
  margin: 0 0.3rem;
`


export const SettleButton = styled(Button)`
  width: min-content;
`
