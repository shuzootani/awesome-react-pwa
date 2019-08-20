import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { generateValidPickupTimes, getStoreSchedule } from '../../utils/time'
import { generatePickerLabels } from './helpers'
import {
  LayoutContainer,
  ModalHeader,
  TimePickerContainer,
  DateSelectContainer,
  DateSelectPanel,
  SettleButton,
} from './styled'

const PICKUP_DATE = {
  IMMEDIATE: 'Sofort',
  TODAY: 'Heute',
}

function TimePicker({
  store, onChange,
}) {
  const Picker = useMemo(() => require('../WheelPicker').default, [])

  // state
  const now = useMemo(() => moment(), [])
  const [values, setValues] = useState({
    hour: String(now.hour()),
    minute: String(now.minute()),
  })

  // const [dayLabel, setDayLabel] = useState('Heute')
  // const [showQuickSelectors, setShowQuickSelectors] = useState(false)
  // const [quickSelectors, setQuickSelectors] = useState([PICKUP_DATE.IMMEDIATE, PICKUP_DATE.TODAY])
  const quickSelectors = [PICKUP_DATE.IMMEDIATE, PICKUP_DATE.TODAY]

  const storeSchedule = useMemo(() => getStoreSchedule(store.opening_hours), [
    store,
  ])
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


  // componentDidMount
  useEffect(() => {
    // const pickupSchedule = getSoonestSchedule(store.opening_hours, schedule, store.min_order_time)
    // const in15Mins = moment().add(15, 'minutes')
    // const previousOpeningTime = storeSchedule[Object.keys(storeSchedule)[0]].opening
    // const nextClosingTime = storeSchedule[Object.keys(storeSchedule)[0]].closing

    // min_order_time comes as seconds
    // if the store's min_order_time is under or equal to 15 mins, set quick selectors to 15 and 30 mins,
    // if min_order_time is above 15 mins, set quick selectors to:
    //  -> 15 + min_order_time
    //  -> 30 + min_order_time
    // const FIFTEEEN_MINS_IN_SECS = 900
    // const quickSelectorValues = {
    //   IN_X_MINS: store.min_order_time <= FIFTEEEN_MINS_IN_SECS ? 15 : (store.min_order_time / 60) + 15,
    //   IN_XX_MINS: store.min_order_time <= FIFTEEEN_MINS_IN_SECS ? 30 : (store.min_order_time / 60) + 30,
    // }

    // let newDayLabel = 'Heute'

    // const fromPickupScreen = false // @TODO
    // if (fromPickupScreen) {
    //   newDayLabel = dateSelection.find(el => storeSchedule[el].date.isSame(schedule.pickup, 'date')) || 'Heute'
    // }

    // setShowQuickSelectors(in15Mins.isAfter(previousOpeningTime) && in15Mins.isBefore(nextClosingTime))
    // setQuickSelectors(quickSelectorValues)
    // setDayLabel(newDayLabel)
  }, [])

  function onSelectQuickTimer(option) {
    setValues({ ...values, hour: option.value })
  }

  function onChangeTime(name, value) {
    setValues({ ...values, [name]: value })
  }

  function onChangePickup() {
    onChange({ hour, minute })
  }

  const { hour, minute } = values

  return (
    <LayoutContainer>
      <ModalHeader>Wann wirst du da sein?</ModalHeader>
      <DateSelectContainer>
        {quickSelectors.map(quickOption => (
          <DateSelectPanel key={quickOption} onClick={() => onSelectQuickTimer(quickOption)}>
            {quickOption}
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
      <SettleButton onClick={onChangePickup}>
        <FormattedMessage id="components.TimePicker.ResolveButton" values={{ time: `${hour}:${minute}` }} />
      </SettleButton>
    </LayoutContainer>
  )
}

TimePicker.propTypes = {
  store: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TimePicker
