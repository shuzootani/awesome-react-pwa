import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { Scheme } from '../../utils/color'

export const ThemeContext = createContext()

function ThemeContextProvider({ children, theme }) {
  const styles = Scheme[theme] || Scheme.default
  return (
    <ThemeContext.Provider value={{ styles }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.string,
}

ThemeContextProvider.defaultProps = {
  theme: 'default',
}

export default ThemeContextProvider
