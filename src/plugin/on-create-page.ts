import { CreatePageArgs, Page } from "gatsby";
import { match } from "path-to-regexp";

import type { I18nPageContext } from "../context";
import { defaultPluginOptions, PageOptions, PluginOptions } from "../options";

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

  const { defaultLanguage, defaultNS, languages, pages } = {
    ...defaultPluginOptions,
    ...pluginOptions,
  };

  function generatePage({
    language,
    path = page.path,
    originalPath = page.path,
    routed = false,
    pageOptions,
  }: {
    language: string;
    path?: string;
    originalPath?: string;
    routed?: boolean;
    pageOptions?: PageOptions;
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
          languages: pageOptions?.languages || languages,
          defaultLanguage,
          defaultNS,
          routed,
          originalPath,
          path,
        },
      },
    };
  }

  const pageOptions = pages.find((opt) => match(opt.matchPath)(page.path));

  let newPage;
  let alternativeLanguages = languages.filter((lng) => lng !== defaultLanguage);

  if (pageOptions?.excludeLanguages) {
    alternativeLanguages = alternativeLanguages.filter(
      (lng) => !pageOptions?.excludeLanguages?.includes(lng)
    );
  }

  if (pageOptions?.languages)
    alternativeLanguages = pageOptions.languages.filter(
      (lng) => lng !== defaultLanguage
    );

  if (pageOptions?.getLanguageFromPath) {
    const result = match<{ lang: string }>(pageOptions.matchPath)(page.path);
    if (!result) return;
    const language =
      languages.find((lng) => lng === result.params.lang) || defaultLanguage;
    const originalPath = page.path.replace(`/${language}`, "");
    const routed = Boolean(result.params.lang);
    newPage = generatePage({
      language,
      originalPath,
      routed,
      pageOptions,
    });
    if (routed || !pageOptions.excludeLanguages) {
      alternativeLanguages = [];
    }
  } else {
    newPage = generatePage({ language: defaultLanguage, pageOptions });
  }

  try {
    deletePage(page);
  } catch {}
  createPage(newPage);

  alternativeLanguages.forEach((lng) => {
    const translatedPage = generatePage({
      language: lng,
      path: `/${lng}${page.path}`,
      routed: true,
    });

    const regexp = new RegExp("/404/?$");
    if (regexp.test(translatedPage.path)) {
      translatedPage.matchPath = `/${lng}/*`;
    }

    createPage(translatedPage);
  });
}
