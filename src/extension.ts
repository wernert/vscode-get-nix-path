// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const dopa = function(uri: vscode.Uri, absolute: boolean) {
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

		if (absolute === true){
			path = path.replace(':', '');
		}
		else {
			var workspace = vscode.workspace.getWorkspaceFolder(uri)?.uri.path;
			path = path.replace(workspace + '/', '');
		}
		
		vscode.env.clipboard.writeText(path).then((text) => {
			// vscode.window.showInformationMessage('copypath: ', path);
		});

	};
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "get nix path" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('getNixPath.showclipboard', () => {
		// The code you place here will be executed every time your command is executed
		vscode.env.clipboard.readText().then((text)=>{
			vscode.window.showInformationMessage('getNixPath clipboard:', text);
			/* code */
		}); 
		// Display a message box to the user
		
	});
	let disposable2 = vscode.commands.registerCommand('getNixPath.copyrelativepath', (uri) => {
		dopa(uri, false);

	});

	let disposable3 = vscode.commands.registerCommand('getNixPath.copyabsolutepath', (uri) => {
		// The code you place here will be executed every time your command is executed
		dopa(uri, true);

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {}
