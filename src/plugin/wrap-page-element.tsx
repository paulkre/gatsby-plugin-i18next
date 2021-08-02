import React from "react";
import type { WrapPageElementBrowserArgs } from "gatsby";

import { I18nPageContext } from "../context";
import { I18nextContextProvider } from "../context";
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
    i18n: { routed, languages, defaultLanguage },
  } = pageContext;

  return (
    <I18nextContextProvider
      value={{
        routed,
        language,
        languages,
        defaultLanguage,
        defaultNS: pluginOptions.defaultNS || defaultPluginOptions.defaultNS,
      }}
    >
      {element}
    </I18nextContextProvider>
  );
}
