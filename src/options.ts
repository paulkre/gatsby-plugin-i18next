export type PluginOptions = {
  languages: string[];
  defaultLanguage: string;
  defaultNS: string;
  translationJsonSourceName?: string;
};

export const defaultPluginOptions: PluginOptions = {
  defaultLanguage: "en",
  languages: ["en"],
  defaultNS: "translation",
};
