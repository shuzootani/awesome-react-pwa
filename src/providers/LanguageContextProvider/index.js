import React, {
  useState, useEffect, useMemo, createContext,
} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import LOCALE_EN from 'react-intl/locale-data/en'
import LOCALE_JA from 'react-intl/locale-data/ja'

import MESSAGES_EN from '../../i18n/en'
import MESSAGES_JA from '../../i18n/ja'
import { isBrowser } from '../../utils/window'

addLocaleData([...LOCALE_EN, ...LOCALE_JA])

const locales = {
  en: 'en', // English
  ja: 'ja', // Japanese
}

const messages = {
  en: MESSAGES_EN,
  ja: MESSAGES_JA,
}

const defaultLocale = locales.de

export const LanguageContext = createContext()

function LanguageContextProvider({ children, match: { params }, location: { pathname } }) {
  const initialLocale = useMemo(() => {
    if (params.locale) return locales[params.locale] || defaultLocale
    if (isBrowser) {
      if (localStorage.getItem('langLocale')) {
        return localStorage.getItem('langLocale')
      }
      return navigator.language.split('_')[0] || defaultLocale
    }
    return defaultLocale
  }, [params.locale, pathname])

  const [locale, setLocale] = useState(initialLocale)

  useEffect(() => {
    localStorage.setItem('langLocale', locale || defaultLocale)
  }, [locale])

  return (
    <IntlProvider locale={locale || defaultLocale} messages={messages[locale || defaultLocale]}>
      <LanguageContext.Provider value={{ locale, setLocale }}>
        {children}
      </LanguageContext.Provider>
    </IntlProvider>
  )
}

LanguageContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(LanguageContextProvider)
