#! /usr/bin/env node

// cli/main.ts
import * as fs from "fs/promises";

// src/index.ts
import { lexer } from "marked";
function litmd(source) {
  const nodes = lexer(source);
  const codes = [];
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

// cli/main.ts
import { spawn } from "child_process";
var command = process.argv[2];
var path = process.argv[3];
if (typeof path === "undefined") {
  console.log("[litmd] litmd <build|run> <path_to_markdown> [...run_args]");
  process.exit(1);
}
var content = await fs.readFile(path).then((r) => r.toString());
var result = litmd(content);
var _a, _b;
if (command === "build") {
  console.log(result);
} else if (command === "run") {
  const p = spawn("node", ["-e", result, "--", ...process.argv.slice(4)], {
    stdio: "inherit"
  });
  (_a = p.stdout) == null ? void 0 : _a.on("data", (data) => console.log(data));
  (_b = p.stderr) == null ? void 0 : _b.on("data", (data) => {
    console.error(data.toString());
  });
} else {
  console.log("[litmd] litmd <build|run> <path_to_markdown> [...run_args]");
  process.exit(1);
}
