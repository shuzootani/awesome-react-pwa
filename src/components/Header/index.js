import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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
  color: ${({ drawBehind, theme }) => (drawBehind ? '#fff' : theme.color.text)};
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

// screen has no height for header if the path is within the list.
const drawBehindList = [/^\/$/, /\/path-with-dynamic-id\/(\w+)/]

function Header({ location: { pathname }, history }) {
  const shouldDrawBehind = drawBehindList.some(path => path.test(pathname))
  return (
    <ContainerStyle drawBehind={shouldDrawBehind}>
      {pathname !== '/' && (
        <BackButton onClick={history.goBack}>
          <Icon name="arrow_left" />
        </BackButton>
      )}
    </ContainerStyle>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Header
