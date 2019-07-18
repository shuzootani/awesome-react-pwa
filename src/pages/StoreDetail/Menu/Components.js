import styled from 'styled-components'
import Color from 'utils/color'

export const ProductCategoryTabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.03);
  background: #fff;

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
  margin-top: 1rem;
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

export const ProductItem = styled.div`
  display: flex;
  height: 90px;
`

export const ProductItemContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${Color.BGGrey};
`

export const ProductImageContainer = styled.div`
  width: 90px;
  height: 90px;
`

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`

export const ProductInfo = styled.div`
  flex: 4;
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5rem 1rem;
`

export const ProductName = styled.div`
  font-weight: bold;
  color: ${Color.DarkGreen};
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 12px;
`

export const ProductDescription = styled.div`
  font-size: 0.7rem;
  color: ${Color.DarkGreen};
`

export const ProductPrice = styled.div`

`
