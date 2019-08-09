import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from '../../../components/Icon'
import { FLEX_CENTER_CENTER } from '../../../utils/styles'
import Color from '../../../utils/color'
import { HeaderSmall } from '../../../components/Text'

const Row = styled.div`
  display: flex;
  align-items: center;
`

const PayIcon = styled.img`
  width: 2rem;
  height: 2rem;
`

const MethodName = styled(HeaderSmall)``

const CheckMark = styled.div`
  width: 1rem;
  height: 1rem;
  ${FLEX_CENTER_CENTER}
  color: ${Color.Cyan};
`

function PaymentSelectItem({ icon, method, checked }) {
  return (
    <Row>
      <CheckMark>{checked && <Icon name="check" />}</CheckMark>
      <MethodName>{method}</MethodName>
      <PayIcon src={icon} />
    </Row>
  )
}

PaymentSelectItem.propTypes = {
  icon: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

PaymentSelectItem.defaultProps = {
  checked: false,
}

export default PaymentSelectItem
