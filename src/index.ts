import { lexer } from "marked";

export function litmd(source: string): string {
  const nodes = lexer(source);
  const codes: string[] = [];
  let isCommentedSection = false;

  for (const node of nodes) {
    if (node.type === "heading") {
      isCommentedSection = node.text.startsWith("#");
      continue;
    }

    if (node.type === "code") {
      if (isCommentedSection) {
        continue;
      }

      if (node.lang !== "js" && node.lang !== "javascript") {
        throw new Error("litmd supports only JavaScript.");
      }

      codes.push(node.text);
    }
  }

  return codes.join("\n");
}
