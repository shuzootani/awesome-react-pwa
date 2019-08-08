import styled from 'styled-components'
import Color from '../../../../../utils/color'
import Space from '../../../../../utils/space'
import Icon from '../../../../../components/Icon'
import { HeaderSmall, ButtonSmall, ButtonMed } from '../../../../../components/Text'
import TextArea from '../../../../../components/TextArea';

export const ProductOrderSheet = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: ${Color.LightGrey};
`

export const LabelContainer = styled.div``

export const Label = styled.div`
  font-weight: bold;
  color: ${Color.DarkGreen};
`

export const SheetProductDescription = styled.div`
  font-size: 0.7rem;
  color: ${Color.DarkGreen};
  padding: ${Space.S}px;
`

export const BottomSheetButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${Space.XS}px 0;
`

export const CounterButton = styled.div`
  padding: ${Space.S}px;
  margin: 0 ${Space.XS}px;
  color: ${Color.DarkGreen};
  border: 1px solid ${Color.DarkGreen};
  background: #fff;
`

export const ExtrasTitle = styled(HeaderSmall)`
  padding-right: ${Space.S}px;
  align-items: center;
`

export const ExtrasCyanTitle = styled(HeaderSmall)`
  color: ${Color.Cyan};
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`

export const StyledIcon = styled.div`
  color: ${Color.DarkGreen};
  font-size: 1.2rem;
`

export const ListContainer = styled.div`
  padding: ${Space.S}px 0;
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
  padding: ${Space.S}px 0;
`

export const ExtraSelectorContainer = styled.div``

export const ExtraTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ExtraTitle = styled(ButtonSmall)`
  color: ${Color.DarkGrey};
  margin-left: ${Space.XS}px;
`

export const TitleOption = styled.div`
  display: flex;
`

export const ExtraPrice = styled(ButtonSmall)``

export const CommentInput = styled(TextArea)`
  margin-bottom: 1rem;
`

export const AddProductButton = styled(ButtonMed)`
  padding: ${Space.XS}px ${Space.M}px;
  text-align: center;
  background: ${Color.Petrol};
  color: ${Color.LightGrey};
  border-radius: 2px;
  align-self: flex-end;
  width: min-content;
  white-space: pre;
  display: flex;
  align-items: center;
`

export const PlusIcon = styled(Icon)`
  font-size: 1.5rem;
  padding: 0.2rem 0 0.2rem 0.5rem;
`
