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
  width: 100%;
  padding: 1rem 0;
`

const PayIcon = styled.img`
  width: 2rem;
`

const MethodName = styled(HeaderSmall)`
  flex: 1;
  padding-right: 2rem;
`

const CheckMark = styled.div`
  width: 1rem;
  height: 1rem;
  ${FLEX_CENTER_CENTER}
  color: ${Color.Cyan};
  margin-right: 1rem;
`

function PaymentSelectItem({
  id, icon, label, selected, onClick,
}) {
  function handleClick() {
    onClick(id)
  }

  return (
    <Row onClick={handleClick}>
      {selected && (
        <CheckMark>
          <Icon name="check" />
        </CheckMark>
      )}
      <MethodName>{label}</MethodName>
      <PayIcon src={icon} />
    </Row>
  )
}

PaymentSelectItem.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
}

PaymentSelectItem.defaultProps = {
  selected: false,
  onClick: () => {},
}

export default PaymentSelectItem
