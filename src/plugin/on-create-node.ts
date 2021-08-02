import type { CreateNodeArgs, NodeInput } from "gatsby";

import type { FileSystemNode } from "../file-nodes";
import { defaultPluginOptions, PluginOptions } from "../options";

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
