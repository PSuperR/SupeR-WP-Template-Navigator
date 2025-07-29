# WP Template Navigator

**版本:** 0.0.1  
**作者:** SupeR92  
**贡献者:** ChatGPT 协助开发  
**仓库:** https://github.com/PSuperR/SupeR-WP-Template-Navigator

---

## 插件介绍

WP Template Navigator 是一个针对 WordPress 开发的 VSCode 插件，能够智能导航 `get_template_part()` 调用，快速定位当前主题中的模板文件，提升模板开发效率。

- 支持 PHP 文件内 `get_template_part()` 路径解析  
- 仅在当前主题目录中查找，避免跳转到其他主题  
- 保留详细调试日志，方便问题排查

---

## 安装

1. 下载源码或从 VSCode Marketplace 安装（如有）  
2. 在 VSCode 中打开插件目录，执行 `npm install`（如有依赖）  
3. 启动 VSCode，打开 WordPress PHP 项目即可自动激活

---

## 使用方法

在 PHP 文件中，按住 `Ctrl`（Windows/Linux）或 `Cmd`（macOS），点击 `get_template_part()` 调用的模板路径即可快速跳转到对应模板文件。

---

## 打包发布

如果你想从源码打包生成 VSCode 插件 `.vsix` 文件，可以按照以下步骤操作：

1. 安装 `vsce`（VSCode 插件打包工具）：

    ```bash
    npm install -g vsce
    ```

2. 在项目根目录执行打包命令：

    ```bash
    vsce package
    ```

执行成功后，会在当前目录生成一个 `.vsix` 文件，比如 `SupeR-wp-template-navigator-0.0.1.vsix`。

3. 你可以通过 VSCode 侧边栏“扩展”页的“...”菜单选择“从 VSIX 安装...”来安装这个插件包，或上传到 VSCode Marketplace。

---

## 版权许可

MIT License © 2025 SupeR

本软件授权任何人免费使用、复制、修改、合并、发布、分发、再授权和/或销售本软件及其副本，前提是**必须在所有副本或重要部分中保留作者名称和本许可声明**。

使用本软件时无需承担任何责任，软件按“原样”提供，不附带任何形式的明示或暗示保证。


---

## 联系方式

如果有任何问题或建议，请通过 GitHub Issues 反馈，或联系作者：  
- GitHub: https://github.com/PSuperR/SupeR-WP-Template-Navigator

---

## 贡献

欢迎贡献代码、提出问题和建议，感谢大家的支持！

本项目部分代码和方案由 AI 助手 ChatGPT 协助完成，感谢其智能建议与支持。

---
