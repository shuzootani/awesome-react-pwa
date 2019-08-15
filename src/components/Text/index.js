import React from 'react'
import styled from 'styled-components'
import Color from '../../utils/color'

function Text() {
  return <div>Reusable Text Components</div>
}

export default Text

export const Header = styled.div`
  font-weight: 500;
`

export const HeaderSmall = styled(Header)`
  font-size: 0.8rem;
`

export const HeaderSmallRight = styled(HeaderSmall)`
  text-align: right;
`

export const HeaderSmallPrice = styled(HeaderSmall)`
  color: ${Color.Cyan};
  text-align: ${props => (props.center ? 'center' : 'left')};
`

export const HeaderMed = styled(Header)`
  font-size: 1.2rem;
  color: ${props => props.color || Color.DarkGreen};
`

export const HeaderBig = styled(Header)`
  font-size: 1.5rem;
  color: ${props => props.color || Color.DarkGreen};
`

export const ButtonSmall = styled.div`
  font-size: 0.7rem;
`

export const BodyCopy = styled.div`
  font-size: 0.7rem;
`
