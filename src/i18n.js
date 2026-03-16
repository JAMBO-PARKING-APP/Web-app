import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import sw from './locales/sw.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import pt from './locales/pt.json';
import am from './locales/am.json';
import ha from './locales/ha.json';
import yo from './locales/yo.json';
import zu from './locales/zu.json';
import es from './locales/es.json';
import de from './locales/de.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sw: { translation: sw },
      fr: { translation: fr },
      ar: { translation: ar },
      pt: { translation: pt },
      am: { translation: am },
      ha: { translation: ha },
      yo: { translation: yo },
      zu: { translation: zu },
      es: { translation: es },
      de: { translation: de },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
