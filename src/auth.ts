import * as vscode from 'vscode';

export const COOKIE_SECRET_KEY = 'bb_session_cookies';

export async function loginWithCookie(context: vscode.ExtensionContext) {
    const cookie = await vscode.window.showInputBox({
        prompt: 'Please enter your Blackboard s_session_id cookie',
        placeHolder: 'e.g., A1B2C3D4E5F6G7H8I9J0',
        password: true, // Hide input for security
        ignoreFocusOut: true
    });

    if (cookie) {
        await context.secrets.store(COOKIE_SECRET_KEY, cookie);
        vscode.window.showInformationMessage('Blackboard session cookie saved successfully!');
        // Refresh the courses view after login
        vscode.commands.executeCommand('bb.refreshCourses');
    } else {
        vscode.window.showInformationMessage('Login cancelled or empty cookie provided.');
    }
}
