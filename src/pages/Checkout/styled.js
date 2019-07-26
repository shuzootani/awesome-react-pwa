import styled from 'styled-components'
import Space from '../../utils/space';
import Color from '../../utils/color';

export const CheckoutContainer = styled.div`
  padding: ${Space.L}px;
`

export const ProductListContainer = styled.div``

export const ProductItemContainer = styled.div`
  position: relative;
  border-bottom: 1px solid #ddd;
  padding: ${Space.XS}px 0;
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
  height: 50px;
  overflow: scroll;
`

export const ProductPrice = styled.div`
  position: absolute;
  top: ${Space.XS}px;
  right: 0;
  font-size: 0.8rem;
  color: ${props => props.discounted ? Color.Yellow : Color.Cyan};
`
