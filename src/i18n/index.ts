import zh from "./zh";
import en from "./en";

export const languages = {
  zh,
  en,
};

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const lang = url.pathname.split("/")[1];
  return lang === "en" ? "en" : "zh";
}

export function getTranslations(lang: Lang) {
  return languages[lang];
}