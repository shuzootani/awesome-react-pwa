import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import LanguageContextProvider from './providers/LanguageContextProvider'
import ThemeContextProvider from './providers/ThemeContextProvider'

require('./App.css')

function App() {
  return (
    <Route path="/:locale?">
      <LanguageContextProvider>
        <ThemeContextProvider>
          <Route path="*" component={Header} />
          <Switch>
            <Route path="/" component={Home} />
            {/* @TODO: Not Found 404 page */}
            <Route component={Home} />
          </Switch>
        </ThemeContextProvider>
      </LanguageContextProvider>
    </Route>
  )
}

export default App
