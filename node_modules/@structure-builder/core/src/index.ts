import * as fs from "fs";
import * as path from "path";

export function createStructureFromTree(
  treeText: string,
  rootDir: string
) {
  const lines = treeText
    .split("\n")
    .map((l) => l.replace(/\r/g, ""))
    .filter((l) => l.trim() !== "");

  const depthMap = new Map<number, string>();

  for (const line of lines) {
    if (/^[│\s]+$/.test(line)) continue;

    if (!line.includes("├──") && !line.includes("└──")) {
      const rootName = line.trim().replace(/\/$/, "");
      const rootPath = path.join(rootDir, rootName);
      fs.mkdirSync(rootPath, { recursive: true });
      depthMap.set(0, rootPath);
      continue;
    }

    const prefix = line.split(/├──|└──/)[0];
    const depth =
      (prefix.match(/│   /g) || []).length +
      (prefix.match(/    /g) || []).length +
      1;

    const name = line.replace(/^.*?(├──|└──)\s*/, "").trim();
    if (!name) continue;

    const isFolder = name.endsWith("/");
    const cleanName = isFolder ? name.slice(0, -1) : name;

    const parentPath = depthMap.get(depth - 1);
    if (!parentPath) continue;

    const fullPath = path.join(parentPath, cleanName);

    if (isFolder) {
      fs.mkdirSync(fullPath, { recursive: true });
      depthMap.set(depth, fullPath);
    } else {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, "");
    }
  }
}
