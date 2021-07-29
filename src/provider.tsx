import React from "react";
import i18next from "i18next";
import { I18nextProvider as I18NextProviderBase } from "react-i18next";

import { useI18nextContext } from "./context";

export type TranslationData = {
  language: string;
  ns: string;
  data: string;
};

export const I18nextProvider: React.FC<{ nodes: TranslationData[] }> = ({
  children,
  nodes,
}) => {
  const ctx = useI18nextContext();

  const i18n = React.useMemo(() => {
    const { language, defaultLanguage, defaultNS } = ctx;

    const i18n = i18next.createInstance();

    i18n.init({
      lng: language,
      fallbackLng: defaultLanguage,
      defaultNS,
      react: {
        useSuspense: false,
      },
    });

    nodes.forEach(({ language, ns, data }) => {
      i18n.addResourceBundle(language, ns, JSON.parse(data));
    });

    if (i18n.language !== language) i18n.changeLanguage(language);

    return i18n;
  }, [nodes, ctx]);

  return <I18NextProviderBase i18n={i18n}>{children}</I18NextProviderBase>;
};
