import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import Color from '../../../utils/color'
import { ELLIPSIS } from '../../../utils/styles'
import SingleStoreMap from '../../../components/SingleStoreMap'

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
  ${ELLIPSIS};
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

function StoreLocation({ geo_hash: geoHash, location_name: locationName, name }) {
  const [open, setOpen] = useState(false)

  function toggleModal() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <StoreLocationContainer>
      <LocationButton onClick={toggleModal}>
        <Icon name="mapPin" />
        <LocationName>{locationName}</LocationName>
      </LocationButton>
      {open && (
        <Modal onClose={toggleModal}>
          <StoreInfoSheet>
            <StoreName>{name}</StoreName>
            <MapContainer>
              <SingleStoreMap geohash={geoHash} />
            </MapContainer>
          </StoreInfoSheet>
        </Modal>
      )}
    </StoreLocationContainer>
  )
}

StoreLocation.propTypes = {
  geo_hash: PropTypes.string.isRequired,
  location_name: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default StoreLocation
