/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import i18n from "i18next";
// import detector from "i18next-browser-languagedetector";
// import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { en, ko } from "@/locales";

const lang = window.localStorage.getItem("languageCode") || "ko";

i18n.use(initReactI18next)
    // .use(i18nBackend)
    .init({
        resources: {
            ko: {
                translation: ko,
            },
            en: {
                translation: en,
            },
        },
        lng: lang,
        // "ko",
        // fallbackLng: "ko",
        // debug: true,
        // interpolation: {
        //     escapeValue: false,
        // },
    });

export default i18n;

// 사용 가이드
// import "@i18n";
// const {t} = useTranslation();
