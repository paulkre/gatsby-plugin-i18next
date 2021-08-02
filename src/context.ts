import React from "react";

export type I18nContext = {
  language: string;
  routed: boolean;
  languages: string[];
  defaultLanguage: string;
  defaultNS: string;
  generateDefaultLanguagePage: boolean;
  originalPath: string;
  path: string;
  siteUrl?: string;
};

export type I18nPageContext = {
  i18n: I18nContext;
  language: string;
  pagePath: string;
};

const Context = React.createContext<I18nContext>({
  language: "en",
  languages: ["en"],
  routed: false,
  defaultLanguage: "en",
  defaultNS: "translation",
  generateDefaultLanguagePage: false,
  originalPath: "/",
  path: "/",
});

export const { Provider: I18nextContextProvider } = Context;
export const useI18nextContext = () => React.useContext(Context);
