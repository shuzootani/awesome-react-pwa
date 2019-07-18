import React, { useState } from 'react'
import styled from 'styled-components'

// @TODO: make constants for zIndex before messing it up.
const DarkOverlayZIndex = 99

const DarkOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${DarkOverlayZIndex};
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
`

const Sheet = styled.div`
  background: #fff;
  position: relative;
  width: 100%;
`

function BottomSheet ({ isOpen, onClose, children }) {
  return (
    <DarkOverlay onClick={onClose}>
      <Sheet onClick={e => e.stopPropagation()}>{children}</Sheet>
    </DarkOverlay>
  )
}

export default BottomSheet
