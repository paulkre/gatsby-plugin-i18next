export type PageOptions = {
  matchPath: string;
  getLanguageFromPath?: boolean;
  excludeLanguages?: string[];
  languages?: string[];
};

export type PluginOptions = {
  languages: string[];
  defaultLanguage: string;
  defaultNS: string;
  pages: Array<PageOptions>;
  translationJsonSourceName?: string;
};

export const defaultPluginOptions: PluginOptions = {
  defaultLanguage: "en",
  languages: ["en"],
  pages: [],
  defaultNS: "translation",
};
