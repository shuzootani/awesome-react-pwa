import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { geohashToLatLng } from '../../utils/geocode'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

function SingleStoreMap ({ children, geohash }) {
  let mapRef = useRef(null).current

  useEffect(
    () => {
      const center = geohashToLatLng(geohash)
      const map = new google.maps.Map(mapRef, {
        zoom: 16,
        center,
        zoomControl: false,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })
      const marker = new google.maps.Marker({ position: center, map: map })
    },
    [mapRef]
  )

  return <MapContainer ref={ref => (mapRef = ref)}>{children}</MapContainer>
}

export default SingleStoreMap
