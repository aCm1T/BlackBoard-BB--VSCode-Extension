# BlackBoard(BB) VSCode Extension

这是一个非官方的 Visual Studio Code 插件，专为极客学生和开发者们打造，允许您在写代码的编辑器内无缝浏览和访问 CUHK(SZ) BlackBoard 的课程与文件资料。

*[阅读英文版说明 (English)](README.md)*

## 开发初衷与作用 (Motivation)

作为一名学生开发者，在日常敲代码的过程中，我们往往需要频繁在 IDE 代码编辑器和笨重、缓慢的浏览器网页之间来回切换，以便查看课件、作业说明或是复习讲义。这种频繁的“上下文切换 (Context Switching)”会极大打断编程思路并降低效率。

**BlackBoard Explorer** 切中了这一痛点。本项目旨在将大学的 BlackBoard 系统**直接深度集成**到 VSCode 的原生侧边栏活动区域。您的一只手甚至不需要离开键盘，就能顺滑地像浏览电脑本地文件一样浏览您的所有课程资料。一键直达，代码与学习两不误。

## 技术原理与实现 (How it Works)

BlackBoard 及许多高校内网通常使用了基于统一身份认证 (SSO) 与 CAS 的繁琐重定向登录机制，这给传统后台自动登录请求或是 OAuth 接入造成了极大阻碍。

为了优雅且安全地绕过这层限制，本插件采用**用户授权式 Session 会话重用**机制：
1. **身份认证 (Authentication)**：插件绝不会向您索要账号和密码，而是让您从浏览器中提取处于活跃状态的身份令牌 `s_session_id` (Cookie)，并借助 VSCode 操作系统原生级别的加密保险箱 `SecretStorage` 进行安全存储。
2. **数据请求 (API Interaction)**：插件使用标准的 HTTP REST 请求，精准捕获并调用 Blackboard 对内的开放 API 接口（例如查找课程的 `/learn/api/public/v1/users/me/courses` 以及逐层获取子文件的 `/contents` 与 `/children` 接口）。
3. **界面渲染 (UI Integration)**：解析返回的 JSON 数据结构，并完美映射到 VSCode 开放的原生侧边栏 API `TreeDataProvider`。通过它实时构建出支持无限层级的、带有系统级原生文件图标 (`ThemeIcon`) 的侧边栏拓展视图。配合经过封装的 `vscode.commands`，实现对具体的树节点（Leaf Nodes）绑定“一键跳转系统浏览器打开”事件。

## 主要功能

- **课程导航**: 自动获取并查看您当前注册的所有课程列表。
- **内容浏览**: 递归嵌套请求，展开单门课程以无限深入地探索里面的文件夹和具体资料。
- **原生体验**: 直观地集成到 VSCode 的左侧活动栏，提供原生的折叠体验及标准的文件/文件夹图标。
- **一键直达**: 鼠标左键直接点击具体的文档节点，由于您已经在默认浏览器中登录过 BB，系统会自动把您“引流”到对应的外部网页版 Blackboard 进行无缝预览或高速下载。
- **极致安全**: 不接触任何密码，Session Cookie 被严密保存在 VSCode 内部凭据管理器中。

---

## 详细使用说明书 (全方位操作)

为了保证插件能够成功访问数据，您首先需要提供您位于浏览器的 Blackboard 会话 Cookie (`s_session_id`)。请按照下方指南操作：

### 第一步：获取您的会话 Cookie
1. 打开您的日常网页浏览器 (如 Chrome, Edge, Safari, Firefox 等)。
2. 访问 [CUHK(SZ) BlackBoard](https://bb.cuhk.edu.cn) 并使用您的账号密码完成登录。
3. 登录成功进入主页后，打开网页的**开发者工具** (按键盘 `F12` 或者 `Ctrl+Shift+I` / Mac 用户请按 `Cmd+Option+I`)。
4. 在开发者工具的顶部菜单中，切换到 **Application (应用)** 选项卡（Chrome/Edge等浏览器）或者 **Storage (存储)** 选项卡（Firefox）。
5. 在左侧边栏中，展开 **Cookies** 菜单，然后点击找到 `https://bb.cuhk.edu.cn`。
6. 在右侧列表中找到一栏名为 `s_session_id` 的 Cookie。
7. 双击该 Cookie 对应的 **Value (值)** 并将其全选复制（它通常是一长串无规律字母和数字的组合）。

### 第二步：在 VSCode 中进行登录
1. 打开 Visual Studio Code 编辑器。
2. 按下 `F1` 或组合键 `Ctrl+Shift+P`（Mac 用户按 `Cmd+Shift+P`）唤出顶部命令面板。
3. 在搜索框内输入查找到：**`BB: Login`** 命令并按下回车。
4. 此时顶部会拉起一个密码输入框。将您刚才在浏览器中复制的这串 `s_session_id` 数值右键粘贴进去，并按下回车键。
5. 提交后，如果在该窗口右下角弹出提示：“Blackboard session cookie saved successfully!”，则大功告成。

### 第三步：全方位浏览与交互操作
1. **呼出窗口**：用鼠标点击 VSCode 界面最左侧竖向活动栏中的 **BlackBoard 原生图标**。
2. **课程初始化**：此时您的所有课程数据会自动异步加载显示在 "My Courses"（我的课程）视图模块下。
3. **层级下钻 (Expand)**：点击任意一门课程即可向下深入展开，您可以像使用 Windows 资源管理器一样自由浏览其中的无数个子内容层级和夹层。
4. **一键查看 (View)**：点击任意一个单体**具体文档/文件**，电脑会自动调起您的系统默认浏览器，定位并跳转开启 Blackboard，让您实现查阅或下载自由。
5. **刷新同步 (Refresh)**：如果您的课程由于刚添加没有立刻显示，或是您希望手动使其重新通过网络请求数据，请点击顶部面板右上角的**刷新小图标**，或者通过全局命令面板手动再次运行 **`BB: Refresh Courses`** 命令来强刷视图。

---

## 运行环境要求

- Visual Studio Code 客户端版本 `1.85.0` 或更高。
- 拥有一名活跃的 CUHK(SZ) BlackBoard 用户账号，以及有效的登录会话 Cookie 字符串。

## 参与贡献与开发

如果您希望在本地修改或调试此插件，请参阅单独的 [开发与调试指南 (Development Guide)](CONTRIBUTING_zh-CN.md)。

## 开源协议

本项目全盘遵循 [MIT 开源协议](LICENSE) (MIT License)。

## 免责声明

这是一个**纯粹由社区爱好者驱动的非官方**开源小工具，与 Blackboard Inc. 及 CUHK(SZ) 校方没有任何官方关联、维护、授权、认可或赞助绑定关系。请使用者自行斟酌、承担相应风险并在遇到故障时主动参与开源维护。
