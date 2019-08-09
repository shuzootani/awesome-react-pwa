import React from 'react'
import styled from 'styled-components'
import Color from '../../utils/color'

function Text() {
  return <div>Reusable Text Components</div>
}

export default Text

const HEADING_PADDING_BOTTOM = '1rem'
export const Header = styled.div`
  color: ${Color.Black};
  padding-top: 0.5rem;
  padding-bottom: ${props => (!props.combined ? HEADING_PADDING_BOTTOM : 0)};
`
Header.paddingBottom = HEADING_PADDING_BOTTOM

export const HeaderBig = styled.div`
  color: ${props => props.color || Color.Petrol};
`

export const HeaderSmall = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${props => props.color || Color.DarkGreen};
  text-align: ${props => (props.center ? 'center' : 'left')};
`
HeaderSmall.priceColor = Color.Cyan

export const HeaderSmallRight = styled(HeaderSmall)`
  text-align: right;
`

export const HeaderSmallPrice = styled(HeaderSmall)`
  color: ${Color.Cyan};
  text-align: ${props => (props.center ? 'center' : 'left')};
`

export const HeaderSmallBerry = styled(HeaderSmall)`
  color: ${Color.Berry};
`

export const HeaderSmallHighlight = styled(HeaderSmall)`
  color: ${Color.Cyan};
`

export const HeaderLarge = styled.div`
  color: ${Color.DarkGreen};
  text-align: center;
`

export const HeaderMed = styled.div`
  color: ${props => props.color || Color.DarkGreen};
  text-align: ${props => (props.center ? 'center' : 'left')};
`
HeaderMed.color = Color.DarkGreen

export const HeaderMedRegular = styled(HeaderMed)`
  padding-top: ${props => (props.padded ? '1.5rem' : '0')};
`

export const HeaderMedHighlight = styled(HeaderMed)`
  color: ${Color.Cyan};
`
HeaderMedHighlight.color = Color.Cyan

export const HeaderMenu = styled.div`
  color: ${Color.DarkGreen};
`

export const TabHeader = styled.div`
  color: ${Color.DarkGreen};
`
TabHeader.color = Color.DarkGreen

export const TabHeaderHighlight = styled(HeaderMed)`
  color: ${Color.Cyan};
`
TabHeaderHighlight.color = Color.Cyan

export const ButtonSmall = styled.div`
  font-size: 0.7rem;
  color: ${props => props.color || Color.DarkGreen};
`

export const ButtonMed = styled.div`
  font-size: 1rem;
  color: ${props => props.color || Color.DarkGreen};
`
