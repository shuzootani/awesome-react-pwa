/* eslint-disable no-plusplus */
import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { generateValidPickupTimes } from '../../utils/time'
import Button from '../Button'

const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const TimePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const SettleButton = styled(Button)`
  width: min-content;
`

function generatePickerLabels(timeSelection) {
  const hours = []
  const minutes = []
  const minHour = timeSelection[0].value.get('hours')
  const maxHour = timeSelection[timeSelection.length - 1].value.get('hours')

  for (let i = minHour; i <= maxHour; ++i) {
    const label = i < 10 ? `0${i}` : i.toString()
    hours.push({ label, type: 'hour' })
  }

  for (let i = 0; i < 60; ++i) {
    const label = i < 10 ? `0${i}` : i.toString()
    minutes.push({ label, type: 'minute' })
  }

  return { hours, minutes }
}

function TimePicker({ store, onChange, storeSchedule }) {
  const now = useMemo(() => moment(), [])
  const [values, setValues] = useState({
    hour: String(now.hour()),
    minute: String(now.minute()),
  })

  const dateSelection = Object.keys(storeSchedule)
  const schedule = dateSelection[0]
  const timeSelection = useMemo(
    () => generateValidPickupTimes(storeSchedule, schedule, store.min_order_time),
    [storeSchedule, schedule, store]
  )

  const pickerLabels = generatePickerLabels(timeSelection)

  const options = useMemo(
    () => ({
      hour: pickerLabels.hours.map(h => h.label),
      minute: pickerLabels.minutes.map(m => m.label),
    }),
    []
  )

  function onChangeTime(name, value) {
    setValues({ ...values, [name]: value })
  }

  const Picker = useMemo(() => require('../WheelPicker').default, [])

  function setPickupTime() {
    onChange({ hour, minute })
  }

  const { hour, minute } = values

  return (
    <LayoutContainer>
      <TimePickerContainer>
        <Picker
          optionGroups={options}
          valueGroups={values}
          onChange={onChangeTime}
          itemHeight={50}
        />
      </TimePickerContainer>
      <SettleButton onClick={setPickupTime}>
        <FormattedMessage id="components.TimePicker.ResolveButton" values={{ time: `${hour}:${minute}` }} />
      </SettleButton>
    </LayoutContainer>
  )
}

TimePicker.propTypes = {
  store: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  storeSchedule: PropTypes.object.isRequired,
}

export default TimePicker
