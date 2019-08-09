import styled from 'styled-components'
import Color from '../../../utils/color'
import LazyImage from '../../../components/LazyImage'

export const MenuContainer = styled.div`
`

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
  color: ${({ active }) => (active ? Color.Cyan : Color.DarkGreen)};
  border-bottom: 3px solid
    ${({ active }) => (active ? Color.Cyan : 'transparent')};
`

export const ProductList = styled.div`
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
export const ProductImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
`

export const FooterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
