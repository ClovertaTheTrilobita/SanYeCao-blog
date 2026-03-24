import zh from "./zh.ts";
import en from "./en.ts";

export const languages = {
  zh,
  en,
};

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const lang = url.pathname.split("/")[1];
  if (lang === "en") return "en";
  return "zh";
}

export function useTranslations(lang: Lang) {
  return function t(path: string) {
    const keys = path.split(".");
    let current: any = languages[lang];

    for (const key of keys) {
      current = current?.[key];
    }

    return current ?? path;
  };
}