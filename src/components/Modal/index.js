import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { isBrowser } from '../../utils/window'
import zIndex from '../../utils/zIndex'

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.modal};
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: ${props => (props.bottom ? 'flex-end' : 'center')};
`

const Sheet = styled.div`
  width: 80%;
`

function Modal({ onClose, children, bottom = false }) {
  const modalRoot = isBrowser && document.getElementById('modal-root')
  let scrollTop = 0

  useEffect(() => {
    scrollTop = window.scrollY
    document.body.style.top = `-${window.scrollY}px`
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.removeProperty('top')
      window.scrollTo(0, parseInt(scrollTop, 10))
    }
  }, [])

  return modalRoot
    ? ReactDOM.createPortal(
      <DarkOverlay onClick={onClose} bottom={bottom}>
        <Sheet
          bottom={bottom}
          onClick={e => e.stopPropagation()}
          onScroll={e => e.stopPropagation()}
        >
          {children}
        </Sheet>
      </DarkOverlay>,
      modalRoot
    )
    : null
}

export default Modal
