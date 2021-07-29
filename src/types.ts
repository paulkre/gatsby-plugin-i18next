import { NodeInput } from "gatsby";

import type { I18nextContext } from "./context";

export type PageContext = {
  path: string;
  language: string;
  i18n: I18nextContext;
};

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

export interface TranslationNodeInput extends NodeInput {
  language: string;
  ns: string;
  data: string;
  fileAbsolutePath: string;
}

export interface TranslationNode extends TranslationNodeInput {
  parent: string;
  children: string[];
  internal: NodeInput["internal"] & {
    owner: string;
  };
}
