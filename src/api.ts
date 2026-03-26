import axios from 'axios';
import * as vscode from 'vscode';
import { COOKIE_SECRET_KEY } from './auth';

const BB_BASE_URL = 'https://bb.cuhk.edu.cn';

export async function getSessionCookie(context: vscode.ExtensionContext): Promise<string | undefined> {
    return await context.secrets.get(COOKIE_SECRET_KEY);
}

export async function fetchCourses(context: vscode.ExtensionContext): Promise<any[]> {
    const cookie = await getSessionCookie(context);
    if (!cookie) {
        throw new Error('Not logged in. Please run BB: Login.');
    }

    try {
        const response = await axios.get(`${BB_BASE_URL}/learn/api/public/v1/users/me/courses?expand=course`, {
            headers: {
                'Cookie': `s_session_id=${cookie}`
            }
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        throw error;
    }
}

export async function fetchCourseContents(context: vscode.ExtensionContext, courseId: string, folderId: string | null = null): Promise<any[]> {
    const cookie = await getSessionCookie(context);
    if (!cookie) {
        throw new Error('Not logged in.');
    }

    try {
        let url = `${BB_BASE_URL}/learn/api/public/v1/courses/${courseId}/contents`;
        if (folderId) {
            url = `${BB_BASE_URL}/learn/api/public/v1/courses/${courseId}/contents/${folderId}/children`;
        }
        const response = await axios.get(url, {
            headers: {
                'Cookie': `s_session_id=${cookie}`
            }
        });
        return response.data.results || [];
    } catch (error) {
        console.error(`Failed to fetch contents for course ${courseId}:`, error);
        throw error;
    }
}
