import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

const iconMap = {
  arrow_left: <FiArrowLeft />
}

function Icon({ name }) {
  return iconMap[name] || null
}

export default Icon
