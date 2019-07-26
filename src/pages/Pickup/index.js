import React, { useState, useEffect } from 'react'
import { PickupContainer, PickupInfo } from './styled'

function Pickup () {
  const [gif, setGif] = useState()

  useEffect(() => {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then(res => res.json())
      .then(res => {
        setGif(res.data[0].images.downsized.url)
      })
      .catch(console.warn)
  }, [])

  return (
    <PickupContainer>
      <PickupInfo>Your Order Successfully Placed 🎉</PickupInfo>
      {gif && <img src={gif} width="100%" height="100%" />}
    </PickupContainer>
  )
}

export default Pickup
