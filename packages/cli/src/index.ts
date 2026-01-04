#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { createStructureFromTree } from "@structure-builder/core";

const file = process.argv[2];
if (!file) {
  console.error("Usage: structure-builder <structure.txt>");
  process.exit(1);
}

const content = fs.readFileSync(path.resolve(file), "utf-8");
createStructureFromTree(content, process.cwd());
console.log("✅ Structure created");
