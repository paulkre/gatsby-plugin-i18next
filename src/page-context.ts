import type { I18nextContext } from "./context";

export type PageContext = {
  i18n: I18nextContext;
  language: string;
  pagePath: string;
};
