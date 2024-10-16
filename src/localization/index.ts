import i18n from "i18next";
import { getI18n, initReactI18next } from "react-i18next";
import { iLocalization } from "./iLocalization";
import en from "./resources/en";
import vi from "./resources/vi";
import StoreZustand from "src/zustand";

export enum LANGUAGES {
  ENGLISH = "en",
  VIETNAM = "vi",
  JAPAN = "ja",
  KOREA = "ko",
}

export const fallBackLanguage = LANGUAGES.ENGLISH;

const renLanguage = (language?: LANGUAGES) => {
  // check language is valid ỏr not. if not, app will set fallback is EN
  switch (language) {
    case LANGUAGES.VIETNAM:
      return LANGUAGES.VIETNAM;
    // case LANGUAGES.JAPAN:
    //     return LANGUAGES.JAPAN;
    // case LANGUAGES.KOREA:
    //     return LANGUAGES.KOREA;
    default:
      return fallBackLanguage;
  }
};

export const getString = (key: keyof iLocalization, params?: any) => {
  if (getI18n()) {
    return getI18n().t(key, params);
  }
  return "";
};

export const changeLanguage = (language?: LANGUAGES): Promise<string> => {
  return new Promise((resolve, reject) => {
    i18n
      .changeLanguage(renLanguage(language))
      .then((success) => {
        StoreZustand.getState().save("Localization", renLanguage(language));
        setTimeout(() => {
          resolve("Change language success");
        }, 500);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};

// initI18n
const initI18n = async (language?: LANGUAGES, fallback = fallBackLanguage) => {
  StoreZustand.getState().save("Localization", renLanguage(language));

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    lng: renLanguage(language),
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n(LANGUAGES.ENGLISH);
export default i18n;
