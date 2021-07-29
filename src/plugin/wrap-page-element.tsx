import React from "react";
import type { WrapPageElementBrowserArgs } from "gatsby";

import { PageContext } from "../page-context";
import { I18nextContextProvider } from "../context";
import { defaultPluginOptions, PluginOptions } from "../options";

export function wrapPageElement(
  {
    element,
    props: { pageContext },
  }: WrapPageElementBrowserArgs<any, PageContext>,
  pluginOptions: Partial<PluginOptions> = {}
): JSX.Element | null {
  const { routed, language, languages, originalPath, defaultLanguage, path } =
    pageContext.i18n;

  const { generateDefaultLanguagePage, defaultNS, siteUrl } = {
    ...defaultPluginOptions,
    ...pluginOptions,
  };

  return (
    <I18nextContextProvider
      value={{
        routed,
        language,
        languages,
        originalPath,
        defaultLanguage,
        defaultNS,
        generateDefaultLanguagePage,
        siteUrl,
        path,
      }}
    >
      {element}
    </I18nextContextProvider>
  );
}
