import { CreatePageArgs, Page } from "gatsby";

import type { I18nPageContext } from "../context";
import { defaultPluginOptions, PluginOptions } from "../options";

function isI18nPageContext(
  ctx: Record<string, unknown>
): ctx is I18nPageContext {
  return typeof ctx.i18n === "object";
}

export function onCreatePage(
  { page, actions: { createPage, deletePage } }: CreatePageArgs,
  pluginOptions: Partial<PluginOptions> = {}
) {
  //Exit if the page has already been processed.
  if (isI18nPageContext(page.context)) return;

  const { i18nCustom } = page.context;
  if (i18nCustom) delete page.context.i18nCustom;

  const { defaultLanguage, defaultNS, languages } = {
    ...defaultPluginOptions,
    ...pluginOptions,
  };

  function generatePage({
    language,
    path = page.path,
    originalPath = page.path,
    routed = false,
  }: {
    language: string;
    path?: string;
    originalPath?: string;
    routed?: boolean;
  }): Page<I18nPageContext> {
    return {
      ...page,
      path,
      context: {
        ...page.context,
        language,
        pagePath: path,
        i18n: {
          language,
          languages,
          defaultLanguage,
          defaultNS,
          routed,
          originalPath,
          path,
        },
      },
    };
  }

  try {
    deletePage(page);
  } catch {}

  createPage(generatePage({ language: defaultLanguage }));

  if (i18nCustom) return;

  const alternativeLanguages = languages.filter(
    (lng) => lng !== defaultLanguage
  );

  alternativeLanguages.forEach((lng) => {
    const translatedPage = generatePage({
      language: lng,
      path: `/${lng}${page.path}`,
      routed: true,
    });

    if (/\/404\/?$/.test(translatedPage.path))
      translatedPage.matchPath = `/${lng}/*`;

    createPage(translatedPage);
  });
}
