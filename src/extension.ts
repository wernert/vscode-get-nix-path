// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jaztest" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jaztest.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from jaztest!');
	});
	let disposable2 = vscode.commands.registerCommand('jaztest.copyabsolutepath', (uri) => {
		// The code you place here will be executed every time your command is executed
		if (typeof uri === 'undefined') {
			if (vscode.window.activeTextEditor) {
					uri = vscode.window.activeTextEditor.document.uri;
			}
		}
		if (!uri) {
				vscode.window.showErrorMessage('Cannot copy absolute path, as there appears no file is opened (or it is very large');
				return;
		}

		var path = uri.path;
		
		path = path.replace(':', '');

		// copy(path)

		// Display a message box to the user
		vscode.window.showInformationMessage('copypath from jaztest: ', path);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
