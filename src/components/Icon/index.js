import React from 'react'
import { FiArrowLeft, FiMapPin, FiClock } from 'react-icons/fi'

const iconMap = {
  arrow_left: <FiArrowLeft />,
  clock: <FiClock />,
  mapPin: <FiMapPin />
}

function Icon({ name }) {
  return iconMap[name] || null
}

export default Icon
