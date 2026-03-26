import * as vscode from 'vscode';
import { loginWithCookie } from './auth';
import { CourseTreeProvider } from './courseProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "cuhksz-bb-explorer" is now active!');

    const courseProvider = new CourseTreeProvider(context);
    vscode.window.registerTreeDataProvider('bb.coursesView', courseProvider);

    // Register login command
    let loginDisposable = vscode.commands.registerCommand('bb.login', () => {
        loginWithCookie(context);
    });

    // Register refresh command
    let refreshDisposable = vscode.commands.registerCommand('bb.refreshCourses', () => {
        courseProvider.refresh();
    });

    let openWebLinkDisposable = vscode.commands.registerCommand('bb.openWebLink', (url: string) => {
        vscode.env.openExternal(vscode.Uri.parse(url));
    });

    context.subscriptions.push(loginDisposable, refreshDisposable, openWebLinkDisposable);
}

export function deactivate() {}
