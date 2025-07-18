import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from "./locales/en.json";
import translationFr from "./locales/fr.json";

const resources = {
  "fr": { translation: translationFr },
  "en": { translation: translationEn },
};
i18n
  .use(initReactI18next) // initialise i18next avec React
  .init({
    resources, // les traductions intégrées
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr', // langue de secours
    interpolation: {
      escapeValue: false, // pas besoin d'échapper les valeurs React
    },
  });

export default i18n;
