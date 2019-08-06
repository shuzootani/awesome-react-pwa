import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import Color from '../../../utils/color'

const StoreLocationContainer = styled.div`
  min-width: 0;
  margin-right: 4px;
`

const LocationButton = styled.div`
  background: ${Color.Cyan};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 0.5em 1em;
`

const LocationName = styled.div`
  padding-left: 4px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StoreInfoSheet = styled.div`
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  border-radius: 4px;
`

const StoreName = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${Color.DarkGreen};
`

function PickupTimeSelector ({ geo_hash, location_name, name }) {
  const [open, setOpen] = useState(false)

  function toggleModal() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <StoreLocationContainer>
      <LocationButton onClick={toggleModal}>
        <Icon name='clock' />
        <LocationName>{location_name}</LocationName>
      </LocationButton>
      {open && (
        <Modal onClose={toggleModal}>
          <StoreInfoSheet>
            <StoreName>{name}</StoreName>
          </StoreInfoSheet>
        </Modal>
      )}
    </StoreLocationContainer>
  )
}

export default PickupTimeSelector
