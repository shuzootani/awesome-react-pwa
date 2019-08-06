import React from 'react'
import styled from 'styled-components'
import Icon from '../Icon'
import zIndex from '../../utils/zIndex'
import Color from '../../utils/color'

const ContainerStyle = styled.div`
  position: ${props => (props.drawBehind ? 'absolute' : 'sticky')};
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
  ${props => !props.drawBehind && 'position: -webkit-sticky'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => (props.drawBehind ? '#fff' : Color.DarkGreen)};
  ${props => props.drawBehind && 'box-shadow: rgba(0, 0, 0, 0.1)'};
`

const BackButton = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`

// if the path is within the list,
// it doesn't have the height for header
const drawBehindList = ['/', '/store/*']

function Header ({ location: { pathname }, history, ...options }) {
  const shouldDrawBehind = drawBehindList.includes(pathname)

  return (
    <ContainerStyle drawBehind={shouldDrawBehind}>
      {pathname !== '/' && (
        <BackButton onClick={history.goBack}>
          <Icon name='arrow_left' />
        </BackButton>
      )}
    </ContainerStyle>
  )
}

export default Header
