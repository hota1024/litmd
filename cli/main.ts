import * as fs from "fs/promises";
import { litmd } from "../src";
import { spawn } from "child_process";

const command = process.argv[2];
const path = process.argv[3];

if (typeof path === "undefined") {
  console.log("[litmd] litmd <build|run> <path_to_markdown> [...run_args]");
  process.exit(1);
}

const content = await fs.readFile(path).then((r) => r.toString());

const result = litmd(content);

if (command === "build") {
  console.log(result);
} else if (command === "run") {
  const p = spawn("node", ["-e", result, "--", ...process.argv.slice(4)], {
    stdio: "inherit",
  });

  p.stdout?.on("data", (data) => console.log(data));

  p.stderr?.on("data", (data) => {
    console.error(data.toString());
  });
} else {
  console.log("[litmd] litmd <build|run> <path_to_markdown> [...run_args]");
  process.exit(1);
}
