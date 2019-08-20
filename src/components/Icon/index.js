import React from 'react'
import styled from 'styled-components'
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiChevronUp,
  FiChevronDown,
  FiCheck,
  FiPlus,
  FiShoppingCart,
  FiTrash,
} from 'react-icons/fi'

const iconMap = {
  arrow_left: <FiArrowLeft />,
  clock: <FiClock />,
  mapPin: <FiMapPin />,
  angle_up: <FiChevronUp />,
  angle_down: <FiChevronDown />,
  check: <FiCheck />,
  plus: <FiPlus />,
  cart: <FiShoppingCart />,
  trash: <FiTrash />,
}

const IconContainer = styled.div`
  width: min-content;
  height: min-content;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ color }) => color ? `color: ${color};` : ''};
`

function Icon({ name, ...props }) {
  return <IconContainer {...props}>{iconMap[name]}</IconContainer> || null
}

export default Icon
