import * as vscode from 'vscode';
import { fetchCourses, fetchCourseContents } from './api';

export class CourseTreeProvider implements vscode.TreeDataProvider<CourseItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<CourseItem | undefined | void> = new vscode.EventEmitter<CourseItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<CourseItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor(private context: vscode.ExtensionContext) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: CourseItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: CourseItem): Promise<CourseItem[]> {
        if (element) {
            try {
                const contents = await fetchCourseContents(this.context, element.courseId, element.folderId);
                return contents.map(item => {
                    const hasChildren = item.hasChildren;
                    const state = hasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;
                    const treeItem = new CourseItem(item.title, state, element.courseId, item.id);
                    if (hasChildren) {
                        treeItem.iconPath = new vscode.ThemeIcon('folder');
                    } else {
                        treeItem.iconPath = new vscode.ThemeIcon('file');
                        
                        // Add click command to open the content in the external browser
                        treeItem.command = {
                            command: 'bb.openWebLink',
                            title: 'Open in BlackBoard',
                            arguments: [`https://bb.cuhk.edu.cn/webapps/blackboard/content/listContent.jsp?course_id=${element.courseId}&content_id=${item.id}`]
                        };
                    }
                    return treeItem;
                });
            } catch (err: any) {
                const details = err.response?.data?.message || err.message || JSON.stringify(err);
                vscode.window.showErrorMessage(`Failed to fetch course contents: ${details}`);
                return [];
            }
        } else {
            try {
                const courses = await fetchCourses(this.context);
                return courses.map(c => new CourseItem(
                    c.course?.name || c.courseId,
                    vscode.TreeItemCollapsibleState.Collapsed,
                    c.courseId
                ));
            } catch (err) {
                return [];
            }
        }
    }
}

export class CourseItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly courseId: string,
        public readonly folderId?: string
    ) {
        super(label, collapsibleState);
        this.contextValue = folderId ? 'contentItem' : 'courseItem';
        if (!folderId) {
            this.iconPath = new vscode.ThemeIcon('book');
        }
    }
}
