import type { CreateNodeArgs, Node, NodeInput } from "gatsby";

import { defaultPluginOptions, PluginOptions } from "../options";

// Taken from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-filesystem/index.d.ts
// No way to refer it without directly depending on gatsby-source-filesystem.
type FileSystemNode = Node &
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

interface TranslationNodeInput extends NodeInput {
  language: string;
  ns: string;
  data: string;
  fileAbsolutePath: string;
}

export async function onCreateNode(
  {
    node,
    actions,
    loadNodeContent,
    createNodeId,
    createContentDigest,
    reporter,
  }: CreateNodeArgs<FileSystemNode>,
  pluginOptions: Partial<PluginOptions> = {}
) {
  if (node.internal.mediaType !== "application/json") return;

  const { translationJsonSourceName } = {
    ...defaultPluginOptions,
    ...pluginOptions,
  };

  if (!translationJsonSourceName) return;

  const {
    absolutePath,
    internal: { type },
    sourceInstanceName,
    relativeDirectory,
    name,
    id,
  } = node;

  // Currently only support file resources
  if (type !== "File") return;

  if (sourceInstanceName !== translationJsonSourceName) return;

  const activity = reporter.activityTimer(
    `@paulkre/gatsby-plugin-i18next: create node: ${relativeDirectory}/${name}`
  );
  activity.start();

  // relativeDirectory name is language name.
  const language = relativeDirectory;
  const content = await loadNodeContent(node);

  // verify & canonicalize indent. (do not care about key order)
  let data: string;
  try {
    data = JSON.stringify(JSON.parse(content), undefined, "");
  } catch {
    const hint = node.absolutePath
      ? `file ${node.absolutePath}`
      : `in node ${node.id}`;
    throw new Error(`Unable to parse JSON: ${hint}`);
  }

  const { createNode, createParentChildLink } = actions;

  const translationNode: TranslationNodeInput = {
    id: createNodeId(`${id} >>> Translation`),
    children: [],
    parent: id,
    internal: {
      content: data,
      contentDigest: createContentDigest(data),
      type: "Translation",
    },
    language,
    ns: name,
    data,
    fileAbsolutePath: absolutePath,
  };

  createNode(translationNode);

  // staled issue: https://github.com/gatsbyjs/gatsby/issues/19993
  createParentChildLink({ parent: node, child: translationNode });

  activity.end();
}
