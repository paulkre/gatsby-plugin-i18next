import React from "react";

export type I18nContext = {
  languages: string[];
  defaultLanguage: string;
  defaultNS: string;
};

export type I18nPageContext = {
  i18n: I18nContext;
  language: string;
  originalPath: string;
  pagePath: string;
};

export type I18nFlatContext = Omit<I18nPageContext, "i18n"> & I18nContext;

const Context = React.createContext<I18nFlatContext>({
  language: "en",
  languages: ["en"],
  defaultLanguage: "en",
  defaultNS: "translation",
  originalPath: "/",
  pagePath: "/",
});

export const { Provider: I18nContextProvider } = Context;
export const useI18nContext = () => React.useContext(Context);
