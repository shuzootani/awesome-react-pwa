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
  justify-content: center;
  align-items: ${props => (props.bottom ? 'flex-end' : 'center')};
`

const Sheet = styled.div`
  position: relative;
  width: 100%;
`

function Modal ({ isOpen, onClose, children, bottom = false }) {
  const modalElement =
    isBrowser && useRef(document.createElement('div')).current

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    modalRoot.appendChild(modalElement)
    document.body.style.overflow = 'hidden'
    return () => {
      modalRoot.removeChild(modalElement)
      document.body.style.overflow = 'unset'
    }
  }, [])

  return modalElement
    ? ReactDOM.createPortal(
      <DarkOverlay onClick={onClose} bottom={bottom}>
        <Sheet bottom={bottom} onClick={e => e.stopPropagation()}>
          {children}
        </Sheet>
      </DarkOverlay>,
      modalElement
    )
    : null
}

export default Modal
