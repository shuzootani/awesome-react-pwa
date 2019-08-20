import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useScript from '../../hooks/useScript'

export const GoogleContext = createContext()

function GoogleContextProvider({ children }) {
  const [googleObject, setGoogle] = useState(null)
  const { loaded } = useScript('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDm0ACk0sMZsL9MGBvITQK2c-AvrZQHZo8')

  useEffect(() => {
    if (loaded && !googleObject) {
      setGoogle(window.google)
    }
  }, [loaded])

  return (
    <GoogleContext.Provider value={{ googleObject }}>
      {children}
    </GoogleContext.Provider>
  )
}

GoogleContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default GoogleContextProvider
