import styled from 'styled-components'
import Color from '../../../utils/color'
import Space from '../../../utils/space'
import LazyImage from '../../../components/LazyImage';

export const ProductCategoryTabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.03);
  background: #fff;
  z-index: 1;

  position: -webkit-sticky;
  position: sticky;
  top: 0px;

  // hide scrollbar
  -ms-overflow-style: none;  // IE 10+
  scrollbar-width: none;  // Firefox
  ::-webkit-scrollbar {
    display: none;  // Safari and Chrome
  }
}
`

export const Tab = styled.div`
  padding: 1rem;
  white-space: nowrap;
  color: ${({ active }) => active ? Color.Cyan : Color.DarkGreen};
  border-bottom: 3px solid ${({ active }) => active ? Color.Cyan : 'transparent'};
`

export const ProductList = styled.div`
  display: flex;
  flex-flow: column wrap;
`

export const CategoryLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${Color.Cyan};
  border-bottom: 1px solid ${Color.Cyan};
  padding: 0.2rem;
`

export const CategoryIcon = styled.img`
  width: 40px;
  height: 40px;
  color: ${Color.Cyan};
`

export const CategoryLabel = styled.div`
  color: ${Color.Cyan};
  font-size: 1.1rem;
`

export const ProductItemContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${Color.BGGrey};
  width: 100%;
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
  color: ${props => props.discounted ? Color.Yellow : Color.Cyan};
`

export const ProductOrderSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  background: #fff;
`

const PRODUCT_IMAGE_SIZE = 150

export const SheetImageContainer = styled.div`
  position: absolute;
  top: -${PRODUCT_IMAGE_SIZE / 2}px;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const ImageContainer = styled.div`
  width: ${PRODUCT_IMAGE_SIZE}px;
  height: ${PRODUCT_IMAGE_SIZE}px;
  background: #fff;
  box-shadow: 0 0 8px 4px rgba(0,0,0,0.05)
`

export const ProductSheetImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
`

export const ProductSheetInfoContainer = styled.div`
  padding-top: ${PRODUCT_IMAGE_SIZE / 2}px;
  text-align: center;
`

export const SheetProductName = styled.div`
  font-weight: bold;
  color: ${Color.DarkGreen};
  overflow: hidden;
  text-overflow: ellipsis;
  padding: ${Space.M}px;
  font-size: 1.2rem;
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

export const AddProductButton = styled.div`
  padding: ${Space.S}px 0;
  text-align: center;
  background: ${Color.DarkGreen};
  color: #fff;
  flex: 1;
`

export const CounterButton = styled.div`
  padding: ${Space.S}px;
  margin: 0 ${Space.XS}px;
  color: ${Color.DarkGreen};
  border: 1px solid ${Color.DarkGreen};
  background: #fff;
`

export const FooterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CheckoutButton = styled(AddProductButton)`
  display: flex;
  justify-content: space-around;
`
