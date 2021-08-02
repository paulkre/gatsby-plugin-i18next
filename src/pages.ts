import type { CreatePagesArgs } from "gatsby";

export type I18nFileNode = {
  sourceInstanceName: string;
  extension: string;
  fields: { language: string; pagePath: string };
};

export function queryI18nFileNodes(
  graphql: CreatePagesArgs["graphql"],
  defaultLanguage: string
): Promise<I18nFileNode[]> {
  return graphql<{ i18nFiles: { nodes: I18nFileNode[] } }>(`
    query {
      i18nFiles: allFile(
        filter: {
          fields: { language: { eq: "${defaultLanguage}" } }
        }
      ) {
        nodes {
          sourceInstanceName
          extension
          fields {
            language
            pagePath
          }
        }
      }
    }
  `).then(({ data }) => data?.i18nFiles.nodes || []);
}
