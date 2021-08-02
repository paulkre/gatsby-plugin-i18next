import type { Node, Actions } from "gatsby";

// Taken from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-filesystem/index.d.ts
// No way to refer it without directly depending on gatsby-source-filesystem.
export type FileSystemNode = Node &
  Record<string, unknown> & {
    absolutePath: string;
    accessTime: string;
    birthTime: Date;
    changeTime: string;
    extension: string;
    modifiedTime: string;
    prettySize: string;
    relativeDirectory: string;
    relativePath: string;
    sourceInstanceName: string;

    // parsed path typings
    base: string;
    dir: string;
    ext: string;
    name: string;
    root: string;

    // stats
    atime: Date;
    atimeMs: number;
    ctime: Date;
    ctimeMs: number;
    gid: number;
    mode: number;
    mtime: Date;
    mtimeMs: number;
    size: number;
    uid: number;
  };

export function createI18nNodeFields(
  node: FileSystemNode,
  { createNodeField }: Actions,
  defaultLanguage: string,
  pathPrefix?: string
) {
  const path = node.relativePath.replace(/(\/index)?\.\w+$/, "");
  const langMatch = path.match(/\.([a-z][a-z])$/);
  const language = langMatch ? langMatch[1] : defaultLanguage;
  const originalPath = `${pathPrefix || ""}/${
    langMatch ? path.substr(0, path.length - 3) : path
  }/`;

  Object.entries({
    language,
    pagePath:
      langMatch && language !== defaultLanguage
        ? `/${language}${originalPath}`
        : originalPath,
  }).forEach(([name, value]) => {
    createNodeField({ node, name, value });
  });
}
