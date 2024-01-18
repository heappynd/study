declare function acquireVsCodeApi(): any;

export const vscode = acquireVsCodeApi();

console.log("vscode", vscode);
