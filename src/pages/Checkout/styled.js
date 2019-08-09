import styled from 'styled-components'
import Color from '../../utils/color'
import { ELLIPSIS } from '../../utils/styles'

export const CheckoutContainer = styled.div`
  padding: 1.5rem;
`

export const ProductListContainer = styled.div``

export const ProductItemContainer = styled.div`
  position: relative;
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
`

export const ProductName = styled.div`
  font-weight: bold;
  color: ${Color.DarkGreen};
  padding-bottom: 0.5rem;
  padding-right: 2rem;
  ${ELLIPSIS};
`

export const ProductDescription = styled.div`
  font-size: 0.7rem;
  color: ${Color.DarkGreen};
  height: 50px;
  overflow: scroll;
`

export const ProductPrice = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0;
  font-size: 0.8rem;
  color: ${props => props.discounted ? Color.Yellow : Color.Cyan};
`
