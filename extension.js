// vscode-wp-template-navigator 插件主入口
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
    let disposable = vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'php' }, {
        provideDefinition(document, position, token) {
            const line = document.lineAt(position);
            const text = line.text;
            console.log('正在分析行内容:', text);

            // 匹配 get_template_part() 调用
            const regex = /get_template_part\(\s*(['"])(.*?)\1(?:\s*,\s*(['"])(.*?)\3)?/;
            const match = text.match(regex);
            if (!match) {
                console.log('未匹配 get_template_part 调用');
                return;
            }

            const templateBase = match[2]; // e.g., 'super-builder-template/module_a_image_t'
            const templateSuffix = match[4]; // 可能是 module_a_image_t_a
            const baseParts = templateBase.split('/');
            const fileName = baseParts.pop();
            const subDir = baseParts.join('/');

            // 构造可能的模板文件名
            const candidates = [];
            if (templateSuffix) {
                candidates.push(`${fileName}-${templateSuffix}.php`);
            }
            candidates.push(`${fileName}.php`);

            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                console.log('未找到工作区');
                return;
            }

            const baseDir = workspaceFolders[0].uri.fsPath;

            // 获取当前文件路径
            const currentFile = document.uri.fsPath;
            console.log('当前文件路径:', currentFile);

            // 提取当前主题目录路径（以 wp-content/themes/ 为分隔）
            const themeMatch = currentFile.match(/wp-content[\\/]+themes[\\/]+([^\\/]+)/);
            if (!themeMatch) {
                console.log('未能定位当前文件所属主题，放弃查找');
                return;
            }
            const currentTheme = themeMatch[1];
            console.log('当前主题名:', currentTheme);

            const themeDir = path.join(baseDir, 'wp-content', 'themes', currentTheme);
            console.log('当前主题目录:', themeDir);

            // 在当前主题目录递归查找模板文件
            for (const candidate of candidates) {
                const relativePath = path.join(subDir, candidate);
                console.log('尝试查找模板文件相对路径:', relativePath);
                const foundPath = findFileRecursive(themeDir, relativePath);
                if (foundPath) {
                    console.log('模板文件已找到:', foundPath);
                    return new vscode.Location(vscode.Uri.file(foundPath), new vscode.Position(0, 0));
                }
            }

            console.log('未找到匹配的模板文件');
            return;
        }
    });

    context.subscriptions.push(disposable);
}

// 递归搜索文件
function findFileRecursive(startDir, relativePath) {
    const items = fs.readdirSync(startDir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(startDir, item.name);
        if (item.isDirectory()) {
            const result = findFileRecursive(fullPath, relativePath);
            if (result) return result;
        } else if (item.isFile()) {
            if (fullPath.endsWith(relativePath)) {
                return fullPath;
            }
        }
    }

    return null;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
