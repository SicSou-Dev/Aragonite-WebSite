import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const [html, css, app, runtime, hosting] = await Promise.all([
  readFile(resolve(root, "dist/index.html"), "utf8"),
  readFile(resolve(root, "dist/style.css"), "utf8"),
  readFile(resolve(root, "dist/app.js"), "utf8"),
  readFile(resolve(root, "worker/runtime.js"), "utf8"),
  readFile(resolve(root, ".openai/hosting.json"), "utf8"),
]);

const assets = JSON.stringify({ html, css, app });
const worker = runtime.replace("__ARAGONITE_ASSETS__", assets);
if (worker === runtime) throw new Error("Worker asset marker was not replaced.");

const output = resolve(root, "dist/server");
await mkdir(output, { recursive: true });
await mkdir(resolve(root, "dist/.openai"), { recursive: true });
await writeFile(resolve(output, "index.js"), worker);
await writeFile(resolve(root, "dist/.openai/hosting.json"), hosting);
console.log("Built Aragonite vote Worker.");
