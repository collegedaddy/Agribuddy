import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next
i18n
  // Load translations from /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n down to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Supported languages
    supportedLngs: ['en', 'hi'],
    
    // Backend configuration for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    // Detect language from localStorage, navigator, etc.
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    // Default namespace
    ns: ['translation'],
    defaultNS: 'translation',
    
    // React i18next specific options
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
    },
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n; 