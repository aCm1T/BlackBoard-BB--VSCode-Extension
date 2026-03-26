# Development & Local Debugging Guide

If you want to modify, debug, or contribute to this extension locally, follow the steps below:

### 1. Setup the Environment
Clone the repository and open the folder in VSCode.
```bash
git clone https://github.com/aCm1T/cuhksz-bb-explorer.git
cd cuhksz-bb-explorer
```

### 2. Install Dependencies
Run the following command in the integrated terminal to install the necessary Node modules:
```bash
npm install
```

### 3. Start Debugging
Press `F5` to start debugging. This will open a new "Extension Development Host" window with the extension automatically loaded in dev mode. 

### 4. Compilation & Hot-Reloading
If you make changes to the TypeScript source code inside the `src/` directory, they need to be recompiled to take effect. 
- The debugging configuration (`.vscode/launch.json` and `tasks.json`) should automatically run the `watch` compiler in the background.
- If it doesn't, you can manually run the `watch` task: Press `Ctrl+Shift+B` (Windows/Linux) or `Cmd+Shift+B` (Mac) and select `npm: watch`.
- After compilation succeeds, go to the active **Development Host** window and press `Ctrl+R` (or `Cmd+R`) to reload the window and apply your changes.

### 5. Viewing Logs
You can view code outputs, errors, and standard `console.log` messages in the **Debug Console** (`Ctrl+Shift+Y` or `Cmd+Shift+Y`) located in your primary formatting (original) VSCode window.
