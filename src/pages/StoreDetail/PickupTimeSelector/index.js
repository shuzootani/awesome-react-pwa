import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import Color from '../../../utils/color'
import TimePicker from '../../../components/TimePicker'
import { ELLIPSIS, FLEX_CENTER_CENTER } from '../../../utils/styles'

const StoreLocationContainer = styled.div`
  min-width: 0;
  margin-right: 4px;
`

const LocationButton = styled.div`
  background: ${Color.Cyan};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
`

const LocationName = styled.div`
  padding-left: 4px;
  ${ELLIPSIS};
`

const StoreInfoSheet = styled.div`
  background: #fff;
  ${FLEX_CENTER_CENTER};
  flex-direction: column;
  width: 100%;
  margin: auto;
  border-radius: 4px;
`

function PickupTimeSelector({ store, onChange }) {
  const [open, setOpen] = useState(false)

  function toggleModal() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <StoreLocationContainer>
      <LocationButton onClick={toggleModal}>
        <Icon name="clock" />
        <LocationName>{moment().format('HH:mm')}</LocationName>
      </LocationButton>
      {open && (
        <Modal onClose={toggleModal}>
          <StoreInfoSheet>
            <TimePicker
              store={store}
              onChange={onChange}
            />
          </StoreInfoSheet>
        </Modal>
      )}
    </StoreLocationContainer>
  )
}

PickupTimeSelector.propTypes = {
  store: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PickupTimeSelector
