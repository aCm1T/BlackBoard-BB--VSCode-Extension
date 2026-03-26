# 本地调试与开发指南

如果您希望在本地二次开发、修改或调试此插件，请按照以下指引操作：

### 1. 准备环境
克隆代码仓库，并在 VSCode 中打开该项目文件夹。
```bash
git clone https://github.com/aCm1T/cuhksz-bb-explorer.git
cd cuhksz-bb-explorer
```

### 2. 安装依赖项
在集成的 VSCode 终端中运行以下命令，安装需要的包：
```bash
npm install
```

### 3. 启动调试
按下 `F5` 键启动配置好的调试器。这将自动弹出一个全新的“扩展开发主机 (Extension Development Host)”窗口，并挂载您当前的代码。

### 4. 自动编译与热重载
如果您修改了 `src/` 目录下的 TypeScript 源代码文件，代码需要重新编译才能在插件中生效。
- 项目的 `.vscode/tasks.json` 已配置为会在启动 `F5` 后从后台自动执行 `watch` 监听编译。
- 如果没有按预期工作，您可以手动启动编译任务：按 `Ctrl+Shift+B`（Windows/Linux）或 `Cmd+Shift+B`（Mac），选择 `npm: watch`。
- 修改代码并保存后，**请切回到那台“扩展开发主机”窗口**，并按下组合键 `Ctrl+R`（或 `Cmd+R`）以直接重新加载前台窗口，应用您的最新代码更改。

### 5. 查看开发者控制台
如果您在代码中写了相关的 `console.log` 或是遇到了应用报错，您可以在主要（原始代码所在）的 VSCode 窗口中打开 **调试控制台 (Debug Console)**（按 `Ctrl+Shift+Y` 或 `Cmd+Shift+Y`）来查看详细的输出信息。
