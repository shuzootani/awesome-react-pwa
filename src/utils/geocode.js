import Geohash from 'ngeohash'

export function geohashToLatLng(geohash) {
  const { latitude, longitude } = Geohash.decode(geohash)
  return { lat: latitude, lng: longitude }
}

export function toGeohash(latLng) {
  const { lat, lng: lon } = latLng
  return Geohash.encode({ lat, lon })
}
