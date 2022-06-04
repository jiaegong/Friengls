import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './translation.en';
import translationKo from './translation.ko';
import translationJa from './translation.ja';

const resource = {
  en: {
    translation: translationEn,
  },
  ko: {
    translation: translationKo,
  },
  ja: {
    translation: translationJa,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resource,
    // 초기 설정 언어
    lng: localStorage.getItem('language')
      ? localStorage.getItem('language')
      : 'ko',
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    debug: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
