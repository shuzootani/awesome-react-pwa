import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import Color from '../../../utils/color'
import TimePicker from '../../../components/TimePicker'
import { ELLIPSIS, FLEX_CENTER_CENTER } from '../../../utils/styles'
import { getStoreSchedule } from '../../../utils/time'
import { DateSelectContainer, DateSelectPanel } from './styled'
import { HeaderSmall } from '../../../components/Text'

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

const PICKUP_DATE = {
  IMMEDIATE: 'Sofort',
  TODAY: 'Heute',
}

function PickupTimeSelector({ store, onChange }) {
  const [open, setOpen] = useState(false)
  const [pickupDate, setDate] = useState(PICKUP_DATE.TODAY)
  const availableDateOptions = [PICKUP_DATE.IMMEDIATE, PICKUP_DATE.TODAY]

  const storeSchedule = useMemo(() => getStoreSchedule(store.opening_hours), [
    store,
  ])

  function toggleModal() {
    setOpen(prevOpen => !prevOpen)
  }

  function onChangeDate(date) {
    setDate(date)
  }

  function onChangeTime(time) {
    onChange(pickupDate === PICKUP_DATE.TODAY ? moment() : storeSchedule[pickupDate].date, time)
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
            <HeaderSmall>Wann wirst du da sein?</HeaderSmall>
            <DateSelectContainer>
              {availableDateOptions.map(date => (
                <DateSelectPanel onClick={() => onChangeDate(date)}>
                  {date}
                </DateSelectPanel>
              ))}
            </DateSelectContainer>
            <TimePicker store={store} onChange={onChangeTime} storeSchedule={storeSchedule} />
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
