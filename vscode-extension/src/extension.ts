
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	
	console.log('Congratulations, your extension "vscode-extension" is now active!');

	
	let disposable = vscode.commands.registerCommand('vscode-extension.helloWorld', () => {
		
		vscode.window.showInformationMessage('Hello World from vscode-extension!');

		vscode.window.activeTextEditor
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
