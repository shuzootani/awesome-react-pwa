import styled from 'styled-components'
import Color from '../../../../../utils/color'
import Icon from '../../../../../components/Icon'
import { HeaderSmall, ButtonSmall } from '../../../../../components/Text'
import TextArea from '../../../../../components/TextArea'
import Button from '../../../../../components/Button'

export const ProductOrderSheet = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: ${Color.LightGrey};
`

export const LabelContainer = styled.div``

export const Label = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.color.primary};
`

export const SheetProductDescription = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.color.primary};
  padding: 0.5rem;
`

export const BottomSheetButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`

export const CounterButton = styled.div`
  padding: 0.5rem;
  margin: 0 2rem;
  color: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.primary};
  background: #fff;
`

export const ExtrasTitle = styled(HeaderSmall)`
  padding-right: 0.5rem;
  align-items: center;
`

export const ExtrasHighlight = styled(HeaderSmall)`
  color: ${({ theme }) => theme.color.secondary};
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`

export const StyledIcon = styled.div`
  color: ${({ theme }) => theme.color.primary};
  font-size: 1.2rem;
`

export const ListContainer = styled.div`
  padding: 0.5rem 0;
`

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
`

export const ExtraDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`

export const ExtraSelectorContainer = styled.div``

export const ExtraTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ExtraTitle = styled(ButtonSmall)`
  color: ${Color.DarkGrey};
  margin-left: 2rem;
`

export const TitleOption = styled.div`
  display: flex;
`

export const ExtraPrice = styled(ButtonSmall)``

export const CommentInput = styled(TextArea)`
  margin-bottom: 1rem;
`

export const AddProductButton = styled(Button)`
  align-self: flex-end;
  display: flex;
  align-items: center;
`

export const PlusIcon = styled(Icon)`
  font-size: 1rem;
  margin-left: 0.5rem;
`
