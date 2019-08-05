import React, { useState, useEffect, useMemo, createContext } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import locale_en from 'react-intl/locale-data/en'
import locale_de from 'react-intl/locale-data/de'
import locale_ja from 'react-intl/locale-data/ja'

import messages_en from '../../i18n/en'
import messages_de from '../../i18n/de'
import messages_ja from '../../i18n/ja'
import { isBrowser } from '../../utils/window';

addLocaleData([...locale_en, ...locale_de, ...locale_ja])

const locales = {
  de: 'de', // German
  en: 'en', // English
  ja: 'ja' // Japanese
}

const messages = {
  de: messages_de,
  en: messages_en,
  ja: messages_ja
}

export const LanguageContext = createContext()

function LanguageContextProvider ({ children }) {
  const initialLocale = useMemo(() => {
    if (isBrowser) {
      return localStorage.getItem('langLocale') || navigator.language.split('_')[0]
    }
    return locales.en
  }, [])

  const [locale, setLocale] = useState(locales[initialLocale] || locales.en)

  useEffect(() => {
    localStorage.setItem('langLocale', locale)
  }, [locale])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <LanguageContext.Provider value={{ locale, setLocale }}>
        {children}
      </LanguageContext.Provider>
    </IntlProvider>
  )
}

export default LanguageContextProvider
