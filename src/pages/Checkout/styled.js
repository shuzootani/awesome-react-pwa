import styled from 'styled-components'
import Color from '../../utils/color'
import { ELLIPSIS } from '../../utils/styles'
import { HeaderSmall, ButtonSmall } from '../../components/Text'
import LazyImage from '../../components/LazyImage'
import FlexBox from '../../components/FlexBox'

export const CheckoutContainer = styled.div`
  padding: 1.5rem;
`

export const ProductListContainer = styled.div``

export const ProductItemContainer = styled(FlexBox)`
  position: relative;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
  width: 100%;
`

export const ProductImage = styled(LazyImage)`
  border-radius: 4px;
`

export const ProductName = styled(HeaderSmall)`
  width: 80%;
  padding-bottom: 0.5rem;
  ${ELLIPSIS};
`

export const ExtraName = styled(ButtonSmall)`
  padding: 0 4px;
`

export const ProductInfo = styled(FlexBox)`
  padding-left: 0.5rem;
`

export const Comment = styled(ButtonSmall)`
  color: ${Color.DarkGrey};
  padding: 4px 0;
`

export const ProductPrice = styled.div`
  position: absolute;
  top: 1rem;
  right: 0;
  font-size: 0.8rem;
  color: ${props => props.discounted ? Color.Yellow : Color.Cyan};
`

export const Row = styled(FlexBox)`
  padding-top: 0.5rem;
`
