import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import Color from '../../../utils/color'
import SingleStoreMap from '../../../components/SingleStoreMap';

const StoreLocationContainer = styled.div`
  min-width: 0;
  margin-left: 4px;
`

const LocationButton = styled.div`
  background: #fff;
  color: ${Color.DarkGreen};
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
  width: 100%;
  border-radius: 4px;
`

const StoreName = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${Color.DarkGreen};
`

const MapContainer = styled.div`
  width: 100%;
  height: 200px;
`

function StoreLocation ({ geo_hash, location_name, name }) {
  const [open, setOpen] = useState(false)

  function toggleModal() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <StoreLocationContainer>
      <LocationButton onClick={toggleModal}>
        <Icon name='mapPin' />
        <LocationName>{location_name}</LocationName>
      </LocationButton>
      {open && (
        <Modal onClose={toggleModal}>
          <StoreInfoSheet>
            <StoreName>{name}</StoreName>
            <MapContainer>
              <SingleStoreMap geohash={geo_hash} />
            </MapContainer>
          </StoreInfoSheet>
        </Modal>
      )}
    </StoreLocationContainer>
  )
}

export default StoreLocation
