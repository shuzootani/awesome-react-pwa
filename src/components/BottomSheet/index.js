import React, { useState, useEffect, useRef, createPortal } from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { isBrowser } from '../../utils/window'

// @TODO: make constants for zIndex before messing it up.
const DarkOverlayZIndex = 99

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  const modalElement = useRef(document.createElement('div')).current

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    modalRoot.appendChild(modalElement)
    document.body.style.overflow = 'hidden'
    return () => {
      modalRoot.removeChild(modalElement)
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    isBrowser &&
    ReactDOM.createPortal(
      <DarkOverlay onClick={onClose}>
        <Sheet onClick={e => e.stopPropagation()}>{children}</Sheet>
      </DarkOverlay>,
      modalElement
    )
  )
}

export default BottomSheet
