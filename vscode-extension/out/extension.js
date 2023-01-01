"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "vscode-extension" is now active!');
    let disposable = vscode.commands.registerCommand('vscode-extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from vscode-extension!');
        vscode.window.activeTextEditor;
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map