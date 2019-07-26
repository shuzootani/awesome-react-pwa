import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Icon'
import zIndex from '../../utils/zIndex'

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
`

const BackButton = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

// if the path is within the list,
// it doesn't have the height for header
const drawBehindList = ['/', '/store/*']

function Header ({ history, location, ...options }) {
  const shouldDrawBehind = drawBehindList.includes(location.pathname)

  return (
    <ContainerStyle drawBehind={shouldDrawBehind}>
      <BackButton onClick={history.goBack}>
        <Icon name='arrow_left' />
      </BackButton>
    </ContainerStyle>
  )
}

export default withRouter(Header)
