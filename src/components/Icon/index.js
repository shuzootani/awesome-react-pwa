import React from 'react'
import styled from 'styled-components'
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiChevronUp,
  FiChevronDown,
  FiCheck,
  FiPlus
} from 'react-icons/fi'

const iconMap = {
  arrow_left: <FiArrowLeft />,
  clock: <FiClock />,
  mapPin: <FiMapPin />,
  angle_up: <FiChevronUp />,
  angle_down: <FiChevronDown />,
  check: <FiCheck />,
  plus: <FiPlus />
}

const IconContainer = styled.div`
  width: min-content;
  height: min-content;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Icon ({ name, ...props }) {
  return <IconContainer {...props}>{iconMap[name]}</IconContainer> || null
}

export default Icon
