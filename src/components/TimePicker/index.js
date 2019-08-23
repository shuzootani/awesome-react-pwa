import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { generateTimeOptions, generateQuickSelectorOptions } from './helpers'
import {
  LayoutContainer,
  ModalHeader,
  TimePickerContainer,
  DateSelectContainer,
  DateSelectPanel,
  SettleButton,
} from './styled'

function TimePicker({ store, onChange, pickupTime }) {
  const Picker = useMemo(() => require('../WheelPicker').default, [])
  const mutableNow = useMemo(() => pickupTime || moment(), [pickupTime])

  // currently selected pickup time
  const [values, setValues] = useState({
    hour: mutableNow.format('HH'),
    minute: mutableNow.format('mm'),
    isInstantOrder: false,
  })

  // quick button pickup time selectors
  const quickSelectors = generateQuickSelectorOptions(store, pickupTime)

  // available times
  const options = useMemo(() => generateTimeOptions(store), [])

  function onClickQuickSelector(option) {
    return () => {
      if (option.value) {
        const time = mutableNow.clone().add(option.value, 'minute')
        setValues({
          hour: time.format('HH'),
          minute: time.format('mm'),
          isInstantOrder: false,
        })
      } else {
        const minHour = options.hour.find(hour => hour === mutableNow.format('HH'))
          || options.hour[0]
        setValues({
          hour: minHour,
          minute: mutableNow.format('mm'),
          isInstantOrder: true,
        })
      }
    }
  }

  function onChangeTime(name, value) {
    setValues({ ...values, [name]: value })
  }

  function setPickupTime() {
    const { hour, minute, isInstantOrder } = values
    const newPickupTime = mutableNow
      .clone()
      .set('hour', hour)
      .set('minute', minute)
    onChange({ time: newPickupTime, isInstantOrder })
  }

  return (
    <LayoutContainer>
      <ModalHeader>
        <FormattedMessage id="components.TimePicker.Title" />
      </ModalHeader>
      <DateSelectContainer>
        {quickSelectors.map(quickOption => (
          <DateSelectPanel
            key={quickOption.label}
            onClick={onClickQuickSelector(quickOption)}
          >
            {quickOption.label}
          </DateSelectPanel>
        ))}
      </DateSelectContainer>
      <TimePickerContainer>
        <Picker
          optionGroups={options}
          valueGroups={values}
          onChange={onChangeTime}
          itemHeight={50}
        />
      </TimePickerContainer>
      <SettleButton onClick={setPickupTime}>
        <FormattedMessage
          id="components.TimePicker.ResolveButton"
          values={{ time: `${values.hour}:${values.minute}` }}
        />
      </SettleButton>
    </LayoutContainer>
  )
}

TimePicker.propTypes = {
  store: PropTypes.object.isRequired,
  pickupTime: PropTypes.object, // Moment object
  onChange: PropTypes.func.isRequired,
}

TimePicker.defaultProps = {
  pickupTime: null,
}

export default TimePicker
