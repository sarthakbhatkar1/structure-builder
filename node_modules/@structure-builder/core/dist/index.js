"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructureFromTree = createStructureFromTree;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function createStructureFromTree(treeText, rootDir) {
    const lines = treeText
        .split("\n")
        .map((l) => l.replace(/\r/g, ""))
        .filter((l) => l.trim() !== "");
    const depthMap = new Map();
    for (const line of lines) {
        if (/^[│\s]+$/.test(line))
            continue;
        if (!line.includes("├──") && !line.includes("└──")) {
            const rootName = line.trim().replace(/\/$/, "");
            const rootPath = path.join(rootDir, rootName);
            fs.mkdirSync(rootPath, { recursive: true });
            depthMap.set(0, rootPath);
            continue;
        }
        const prefix = line.split(/├──|└──/)[0];
        const depth = (prefix.match(/│   /g) || []).length +
            (prefix.match(/    /g) || []).length +
            1;
        const name = line.replace(/^.*?(├──|└──)\s*/, "").trim();
        if (!name)
            continue;
        const isFolder = name.endsWith("/");
        const cleanName = isFolder ? name.slice(0, -1) : name;
        const parentPath = depthMap.get(depth - 1);
        if (!parentPath)
            continue;
        const fullPath = path.join(parentPath, cleanName);
        if (isFolder) {
            fs.mkdirSync(fullPath, { recursive: true });
            depthMap.set(depth, fullPath);
        }
        else {
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
            if (!fs.existsSync(fullPath))
                fs.writeFileSync(fullPath, "");
        }
    }
}
