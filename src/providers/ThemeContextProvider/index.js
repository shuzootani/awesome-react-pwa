import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { Theme } from './theme'

export const ThemeContext = createContext()

// theme options
// 'default' : pick_pack style guide
// 'airport' : airport-app style guide

function ThemeContextProvider({ children, defaultTheme }) {
  const [theme, setTheme] = useState(Theme[defaultTheme] || Theme.default)
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

ThemeContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
  defaultTheme: PropTypes.string,
}

ThemeContextProvider.defaultProps = {
  // defaultTheme: 'default',
  defaultTheme: 'airport',
}

export default ThemeContextProvider
