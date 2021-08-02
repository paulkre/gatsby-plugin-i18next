import React from "react";
import type { WrapPageElementBrowserArgs } from "gatsby";

import { I18nPageContext } from "../context";
import { I18nContextProvider } from "../context";
import { defaultPluginOptions, PluginOptions } from "../options";

export function wrapPageElement(
  {
    element,
    props: { pageContext },
  }: WrapPageElementBrowserArgs<any, I18nPageContext>,
  pluginOptions: Partial<PluginOptions> = {}
): JSX.Element | null {
  const {
    language,
    originalPath,
    pagePath,
    i18n: { languages, defaultLanguage },
  } = pageContext;

  return (
    <I18nContextProvider
      value={{
        language,
        originalPath,
        pagePath,
        languages,
        defaultLanguage,
        defaultNS: pluginOptions.defaultNS || defaultPluginOptions.defaultNS,
      }}
    >
      {element}
    </I18nContextProvider>
  );
}
