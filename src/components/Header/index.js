import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Icon'
import zIndex from '../../utils/zIndex'

const ContainerStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
`

const BackButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`

function Header ({ history, ...options }) {
  console.log(history, options)
  return (
    <ContainerStyle>
      {/* <BackButton onClick={history.goBack}> */}
      <Link to='/'>
        <Icon name='arrow_left' />
      </Link>
      {/* </BackButton> */}
    </ContainerStyle>
  )
}

export default withRouter(React.memo(Header))
