import { generateValidPickupTimes, getStoreSchedule } from '../../utils/time'

/* eslint-disable no-plusplus */
export function generateTimeOptions(store) {
  const storeSchedule = getStoreSchedule(store.opening_hours)
  const timeSelection = generateValidPickupTimes(
    storeSchedule,
    Object.keys(storeSchedule)[0],
    store.min_order_time
  )

  const hours = []
  const minutes = []
  const minHour = timeSelection[0].value.get('hours')
  const maxHour = timeSelection[timeSelection.length - 1].value.get('hours')

  for (let i = minHour; i <= maxHour; ++i) {
    const label = i < 10 ? `0${i}` : i.toString()
    hours.push(label)
  }

  for (let i = 0; i < 60; ++i) {
    const label = i < 10 ? `0${i}` : i.toString()
    minutes.push(label)
  }

  return { hour: hours, minute: minutes }
}

export function generateQuickSelectorOptions(store, pickupTime) {
  // const storeSchedule = getStoreSchedule(store.opening_hours)

  let options = []
  if (pickupTime) {
    options = [
      { label: '+ 10 min', value: 10 },
      { label: '+ 20 min', value: 20 },
      { label: '+ 30 min', value: 30 },
    ]
  } else {
    options = [
      { label: 'Sofort', value: 0 },
      { label: 'in 15 min', value: 15 },
      { label: 'in 30 min', value: 30 },
    ]
  }

  return options
}
