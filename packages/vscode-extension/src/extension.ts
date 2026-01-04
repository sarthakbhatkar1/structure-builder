import * as vscode from "vscode";
import { createStructureFromTree } from "@structure-builder/core";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "structureBuilder.build",
      () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const workspace = vscode.workspace.workspaceFolders?.[0];
        if (!workspace) return;

        createStructureFromTree(
          editor.document.getText(),
          workspace.uri.fsPath
        );

        vscode.window.showInformationMessage("Structure created");
      }
    )
  );
}

export function deactivate() {}
