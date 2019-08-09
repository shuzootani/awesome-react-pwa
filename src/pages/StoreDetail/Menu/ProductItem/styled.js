import styled from 'styled-components'
import Color from '../../../../utils/color'
import LazyImage from '../../../../components/LazyImage'
import Space from '../../../../utils/space'

export const ProductItemContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${Color.BGGrey};
`

export const ProductItem = styled.div`
  display: flex;
  height: 90px;
  position: relative;
`

export const ProductImageContainer = styled.div`
  width: 90px;
  height: 90px;
`

export const ProductImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
`

export const ProductInfoContainer = styled.div`
  display: flex;
  flex: 1;
`

export const ProductInfo = styled.div`
  flex: 1;
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1rem;
`

export const ProductName = styled.div`
  font-weight: bold;
  color: ${Color.DarkGreen};
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: ${Space.XS}px;
  padding-right: ${Space.XL}px;
`

export const ProductDescription = styled.div`
  font-size: 0.7rem;
  color: ${Color.DarkGreen};
`

export const ProductPrice = styled.div`
  font-size: 0.8rem;
  color: ${props => (props.discounted ? Color.Yellow : Color.Cyan)};
`
