import styled from 'styled-components'
import Color from '../../../utils/color'
import { FLEX_CENTER_CENTER } from '../../../utils/styles'

export const DateSelectContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`

export const DateSelectPanel = styled.div`
  border: 1px solid ${Color.DarkGreen};
  border-radius: 2px;
  ${FLEX_CENTER_CENTER};
  padding: 0.5rem;
  color: ${Color.DarkGreen};
  font-size: 0.7rem;
`
