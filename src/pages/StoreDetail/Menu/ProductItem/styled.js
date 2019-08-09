import styled from 'styled-components'
import Color from '../../../../utils/color'
import LazyImage from '../../../../components/LazyImage'
import { HeaderSmall, ButtonSmall } from '../../../../components/Text'

const IMAGE_SIZE = '90px'

export const ProductItemContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${Color.CoolGrey};
`

export const ProductItem = styled.div`
  display: flex;
  height: ${IMAGE_SIZE};
  position: relative;
`

export const ProductImageContainer = styled.div`
  width: ${IMAGE_SIZE};
  height: ${IMAGE_SIZE};
  min-width: ${IMAGE_SIZE};
  max-width: ${IMAGE_SIZE};
  min-height: ${IMAGE_SIZE};
  max-height: ${IMAGE_SIZE};
`

export const ProductImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
`

export const ProductInfoContainer = styled.div`
  display: flex;
  padding-left: 1rem;
  flex: 1;
`

export const ProductInfo = styled.div`
  flex: 1;
`

export const ProductName = styled(HeaderSmall)`
  padding-bottom: 0.5rem;
`

export const ProductDescription = styled(ButtonSmall)`
`

export const ProductPrice = styled.div`
  font-size: 0.8rem;
  white-space: pre;
  color: ${props => (props.discounted ? Color.Yellow : Color.Cyan)};
`
