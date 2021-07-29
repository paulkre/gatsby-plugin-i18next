import type { I18nextContext } from "./context";

export type PageContext = {
  path: string;
  language: string;
  i18n: I18nextContext;
};
