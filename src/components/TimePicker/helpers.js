/* eslint-disable no-plusplus */
export function generatePickerLabels(timeSelection) {
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
