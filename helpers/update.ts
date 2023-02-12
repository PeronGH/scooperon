import { Handler } from "../types.ts";

const appsPath = new URL(import.meta.resolve("../apps/"));

const apps = new Map<string, Handler>();

for await (const file of Deno.readDir(appsPath)) {
  if (file.isFile && file.name.endsWith(".ts")) {
    const app = await import(`../apps/${file.name}`);
    apps.set(file.name, app.handler);
  }
}

const bucketPath = new URL(import.meta.resolve("../bucket/"));

const tasks: Promise<void>[] = [];

for (const [name, handler] of apps) {
  const json = await handler.toJSON();
  const jsonPath = new URL(`../bucket/${name.replace(/\.ts$/, ".json")}`, bucketPath);
  const jsonText = JSON.stringify(json, null, 2);
  tasks.push(Deno.writeTextFile(jsonPath, jsonText));
}

await Promise.all(tasks);
