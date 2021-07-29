export type PageOptions = {
  matchPath: string;
  getLanguageFromPath?: boolean;
  excludeLanguages?: string[];
  languages?: string[];
};

export type PluginOptions = {
  languages: string[];
  defaultLanguage: string;
  generateDefaultLanguagePage: boolean;
  defaultNS: string;
  siteUrl?: string;
  pages: Array<PageOptions>;
  translationJsonSourceName?: string;
};

export const defaultPluginOptions: PluginOptions = {
  defaultLanguage: "en",
  generateDefaultLanguagePage: false,
  languages: ["en"],
  pages: [],
  defaultNS: "translation",
};
