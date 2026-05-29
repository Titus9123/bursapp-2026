import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import heTranslations from './locales/he.json';
import arTranslations from './locales/ar.json';
import amTranslations from './locales/am.json';
import ruTranslations from './locales/ru.json';

const resources = {
  en: { translation: enTranslations },
  he: { translation: heTranslations },
  ar: { translation: arTranslations },
  am: { translation: amTranslations },
  ru: { translation: ruTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'he', 'ar', 'am', 'ru'],
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const RTL_LANGUAGES = ['he', 'ar'];

export const getDirection = (lng: string): 'rtl' | 'ltr' => {
  return RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
};
