import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ vertical }) => vertical ? 'column' : 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`

function FlexBox({ children, ...props }) {
  return (
    <FlexContainer {...props}>
      {children}
    </FlexContainer>
  )
}

FlexBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
}

export default FlexBox
