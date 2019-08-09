import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export const dayOfWeek = ['', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

export const enhanceOpeningHours = (openingHoursIn) => {
  const now = moment()
  const today = now.isoWeekday()
  const openingHours = {
    open: false, // isOpen state
    diff: null, // object current time diff
    hours: null, // array weekly opening hours
  }

  // Check if store is open and calc diff
  const hours = openingHoursIn.find(data => data.day === today) // Check day
  if (hours) { // Check time of day
    const openRange = _getOpeningClosingFromHours(hours.time)
    moment.range(openRange.opening, openRange.closing)
    if (openRange.opening.diff(now) > 1) { // Opening later today
      openingHours.open = false
      openingHours.diff = {
        hours: openRange.opening.diff(now, 'hours'),
        minutes: openRange.opening.diff(now, 'minutes'),
      }
    } else if (openRange.closing.diff(now) > 1) { // Open now
      openingHours.open = true
      openingHours.diff = {
        hours: openRange.closing.diff(now, 'hours'),
        minutes: (openRange.closing.diff(now, 'minutes') % 60),
      }
    } else { // Closed today
      openingHours.open = false
    }
  }

  // Adjust opening hours representation
  openingHours.hours = openingHoursIn.map((open) => {
    const time = _getOpeningClosingFromHours(open.time)
    return {
      ...open,
      day: dayOfWeek[open.day],
      time,
    }
  })

  return openingHours
}

const _getOpeningClosingFromHours = (hours) => { //eslint-disable-line
  const todayTime = hours.split(' - ').map(x => moment(x, 'hh:mma'))
  return {
    opening: moment().set({ hour: todayTime[0].hour(), minute: todayTime[0].minute(), second: 0 }),
    closing: moment().set({ hour: todayTime[1].hour(), minute: todayTime[1].minute(), second: 0 }),
  }
}

export const getStoreSchedule = (storeHours) => {
  let storeSchedule = {} //eslint-disable-line
  let utils = { //eslint-disable-line
    length: 0,
    i: 0,
  }

  while (utils.length < 3) {
    const sched = getSchedule(storeHours, utils.i)
    if (sched) {
      let date = sched.opening
      let key
      let day
      let dateFormat
      if (utils.i === 0) {
        key = 'Heute'
        date = moment()
        day = `${dayOfWeek[moment().isoWeekday()]}`
        dateFormat = moment().format('DD. MM.')
      } else if (utils.i === 1) {
        key = 'Morgen'
        day = `${dayOfWeek[moment().day(moment().day() + 1).isoWeekday()]}`
        dateFormat = moment().day(moment().day() + 1).format('DD.MM.')
      } else {
        key = `${dayOfWeek[date.isoWeekday()]}`
        dateFormat = date.format('DD. MM.')
        day = ''
      }

      storeSchedule[key] = {
        ...sched,
        date,
        day,
        dateFormat,
        minPrep: 8,
      }
      utils.length += 1
    }
    utils.i += 1
  }

  return storeSchedule
}

export const getSchedule = (storeHours, day, now = moment()) => {
  const storeDay = (now.isoWeekday() - 1 + day) % 7 + 1 //eslint-disable-line
  const schedule = storeHours.find(data => data.day === storeDay)
  if (schedule) {
    const todayTime = schedule.time.split(' - ').map((x) => {
      const time = moment(x, 'hh:mma')
      return {
        hr: time.get('hour'),
        min: time.get('minute'),
      }
    })

    const opening = moment(now).add(day, 'days').set({ hour: todayTime[0].hr, minute: todayTime[0].min, second: 0 })
    const closing = moment(now).add(day, 'days').set({ hour: todayTime[1].hr, minute: todayTime[1].min, second: 0 })

    if (now.isAfter(closing)) {
      return null
    }
    return { opening, closing }
  }
  return null
}

export const generateDayTimeSelections = (storeSchedule, schedule, minimalPrepTime, noRelative = false) => {
  const PrepTimeMin = minimalPrepTime / 60
  const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  let sched = storeSchedule[schedule]
  const now = moment()
  if (!sched) {
    sched = storeSchedule[Object.keys(storeSchedule)[0]] // Fallback to first valid date
  }
  let startTime = sched.opening
  let timeSelection = []

  if (schedule === 'Heute') {
    if (!noRelative) {
      if (now.isAfter(startTime)) {
        timeSelection = timeSelection.concat([
          {
            type: 'LABEL',
            disabled: true,
            label: 'Mindestvorbestellzeit',
            format: 'minutes',
            value: PrepTimeMin,
          },
          {
            label: `in ${PrepTimeMin} Min`,
            format: 'minutes',
            value: PrepTimeMin,
          },
        ])
        timeSelection = timeSelection.concat(minutes
          .filter(x => x > PrepTimeMin && moment().add(x, 'minutes').isBefore(sched.closing))
          .reduce((arr, val) => {
            const obj = {
              label: `in ${val} Min`,
              format: 'minutes',
              value: val,
            }
            return arr.concat(obj)
          }, []))

        if (now.isAfter(sched.opening)) {
          startTime = moment().add(1, 'hours')
        }
      } else {
        timeSelection.push({
          type: 'LABEL',
          disabled: true,
          label: 'Öffnungszeit',
          format: 'time',
          value: sched.opening,
        })
      }
    } else {
      startTime = moment(sched.opening).add(15, 'minutes')
    }
  } else {
    timeSelection.push({
      type: 'LABEL',
      disabled: true,
      label: 'Öffnungszeit',
      format: 'time',
      value: sched.opening,
    })
  }
  if (startTime.isBefore(sched.closing)) {
    const timeRange = moment.range(startTime, sched.closing)
    timeSelection = timeSelection.concat(Array.from(timeRange.by('minute', { step: 5, exclusive: false })).map((x) => {
      let m = x.get('minute')
      m = 5 * Math.round(m / 5)
      x.set('minute', m)
      x.set('second', 0)
      return {
        label: x.format('HH:mm'),
        format: 'time',
        value: x,
      }
    }))
  }

  return timeSelection
}


/*
* generateValidPickupTimes():
*
* params:
* storeSchedule: {
*   Heute: {
*     closing: Moment,          -> closing time for that day
*     date: Moment,             -> date for that day
*     dateFormat: "29. 04.",
*     day: "Montag",
*     minPrep: 8,               -> in minutes
*     opening: Moment           -> opening time for that day
*   },
*   Morgen: {...},
*   Mittwoch: {...}
* }
* dayLabel: String              -> 'Heute' | 'Morgen' | day name in german
* minimalPrepTime: Number       -> in seconds
*
* returns:
* array of objects representing every valid minute of the day that is valid for pickup:
*   {
*     hour: String              -> "00" - "23", label used for comparison
*     minute: String            -> "00" - "59", label used for comparison
*     value: Moment             -> the full time/date for that valid time
*   }
* */

export const generateValidPickupTimes = (storeSchedule, dayLabel, minimalPrepTime) => {
  let sched = storeSchedule[dayLabel]
  if (!sched) {
    sched = storeSchedule[Object.keys(storeSchedule)[0]] // Fallback to first valid date
  }

  let firstValidTime = sched.opening

  if (dayLabel === 'Heute' && moment().isAfter(sched.opening)) {
    firstValidTime = moment().add(minimalPrepTime, 'seconds')
  }

  const timeRange = moment.range(firstValidTime, sched.closing)

  const timeSelection = Array.from(timeRange.by('minute')).map(time => ({
    hour: time.format('HH'),
    minute: time.format('mm'),
    value: time,
  }))

  return timeSelection
}

export const convertPickupToSchedule = (pickupTimeIn) => {
  const pickupTime = moment(pickupTimeIn)
  const day = moment(pickupTime).startOf('day').diff(moment().startOf('day'), 'days')
  return {
    default: false,
    schedule: dayToLabel(day, pickupTime),
    pickup: pickupTime,
    date: pickupTime,
    time: {
      label: pickupTime.format('HH:mm'),
      format: 'time',
      value: pickupTime,
    },
  }
}

const dayToLabel = (day, scheduleTime) => {
  if (day === 0) {
    return 'Heute'
  } if (day === 1) {
    return 'Morgen'
  }
  return dayOfWeek[moment(scheduleTime).isoWeekday()]
}

/*
* getSoonestSchedule():
*
* params:
* storeHours: array       -> list of daily open hours
* selectedSched: object   -> schedule object, same as described bellow
* minOrderTime: number    -> in seconds
*
* Returns the valid schedule object in the format:
*   {
*     date: Moment,       -> the date of the pickup day
*     pickup: Moment,     -> the scheduled pickup time. if past, set to present plus min preorder time
*     schedule: 'Heute',  -> 'Morgen', 'Samstag'...
*     time: {             -> a different format for the scheduled pickup time
*       format: 'time',
*       label: '13:15',
*       value: Moment,    -> the moment.js date for the pickup time
*     }
*   }
* */
export const getSoonestSchedule = (storeHours, selectedSched = null, minOrderTime) => {
  const minOrderMinutes = minOrderTime / 60
  let minOrderBuffer = 0
  if (selectedSched) {
    if (selectedSched.time && selectedSched.time.format === 'minutes') {
      // Fix problem with wrong closing calculation with earlier on the day selected relative time
      // eslint-disable-next-line no-param-reassign
      selectedSched.pickup = moment().add(selectedSched.time.value, 'minutes')
    }
    const schedule = getSchedule(storeHours, 0, selectedSched.pickup)
    if (schedule && selectedSched.pickup.isAfter(schedule.opening)) {
      let selectedMinutes = selectedSched.time.value
      if (typeof selectedMinutes !== 'number') {
        selectedMinutes = moment(selectedMinutes).diff(moment(), 'minutes')
        minOrderBuffer = 5
      }
      if (minOrderMinutes - minOrderBuffer <= selectedMinutes) { return selectedSched }
    }
  }
  let day = 0
  let schedule
  while (true) { //eslint-disable-line
    schedule = getSchedule(storeHours, day)

    if (schedule) break
    day += 1
  }
  const now = moment()
  const selectOpening = {
    pickup: schedule.opening,
    time: {
      label: schedule.opening.format('HH:mm'),
      format: 'time',
      value: schedule.opening,
    },
  }
  if (day === 0 && now.isAfter(schedule.opening)) { // currently open
    const pickup = moment().add(minOrderMinutes, 'minutes')
    return {
      default: false,
      schedule: 'Heute',
      pickup,
      time: {
        label: pickup.format('HH:mm'),
        format: 'time',
        value: pickup,
      },
    }
  }
  return {
    default: false,
    schedule: dayToLabel(day, schedule.opening),
    ...selectOpening,
  }
}

export const setPickupSchedule = (date = moment(), time) => {
  let pickup
  switch (time.format) {
    case 'minutes':
      pickup = date.add(time.value, 'minutes')
      break
    case 'time':
      pickup = date.set('hour', time.value.get('hour')).set('minute', time.value.get('minute'))
      break
    default: break
  }

  return pickup
}

export const getSelectedTimeIndex = (pickupTime, timeSelection) =>
  (timeSelection.findIndex(x => x.label === pickupTime.label) || 0)

const openingTimes = []

export const getStoreHours = storeHours => (storeHours.slice()
  .sort((a, b) => a.day - b.day)
  .reduce((arr, obj) => {
    const list = arr.slice()
    const { day, time } = obj

    if (list.length > 0) {
      const data = list.pop()
      // if (data.time === time) {
      //   data.days = data.days.concat(day)
      //   list.push(data)
      // } else {
      list.push(data)
      list.push({
        days: [day],
        time,
      })

    } else {
      list.push({
        days: [day],
        time,
      })
    }
    return list
  }, [])
  .map((obj) => {
    const first = obj.days.shift()
    // if (obj.days.length > 1) {
    //   const last = obj.days.pop()
    //
    //   return `${dayOfWeek[first].substr(0, 2)} - ${dayOfWeek[last].substr(0, 2)}. - ${obj.time}`
    // }
    openingTimes.push({
      day: `${dayOfWeek[first]}`,
      openingTime: `${obj.time}`,
    })
    const last = openingTimes.length - 1
    return openingTimes[last]
  })

)
