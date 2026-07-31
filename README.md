# Rename - 批量文件重命名工具

<img align="right" src="./src/assets/icon256.ico" width="80" alt="Rename Tool Icon"/>

基于浏览器的本地批量文件重命名工具，所有操作完全在浏览器内完成，不上传任何文件到服务器。

> [!important]
> 感谢原作者[JasonGrass](https://github.com/JasonGrass)的技术支持与部署指导：[原始仓库 JasonGrass/rename](https://github.com/JasonGrass/rename)

## ✨ 特性

- **完全本地化** - 使用浏览器 File System Access API，文件不离开本地
- **实时预览** - 修改规则即时显示重命名结果
- **多规则组合** - 支持正则替换、插入序号、日期格式化等多种规则
- **文件过滤** - 按文件名、扩展名、大小、修改时间筛选目标文件
- **可拖拽排序** - 规则执行顺序可自由调整
- **批量执行** - 一键应用所有重命名规则
- **中英文切换** - 支持简体中文和英文界面切换，语言偏好自动保存


## 🚀 本地开发

### 环境要求

- Node.js 16+
- 现代浏览器（Chrome 112+ / Edge 112+）

### 运行开发服务器

```bash
npm install
npm run dev
```

### 构建生产版本

```bash
npm install
npm run build
```

构建产物输出到 `dist` 目录。

### 本地预览构建产物

```bash
npm run preview
```

## 📦 技术栈

- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite 5
- **UI 组件**：Element Plus + VXE Table
- **状态管理**：Pinia
- **样式**：Less

## 🎯 使用示例

### 插入日期格式

在文件名中插入修改日期：

```
<date.modify:YYYY-MMDD-HHmmss>
```

### 正则替换

使用正则表达式批量替换文件名片段。

### 序号填充

为文件名添加自动递增的序号，支持零填充。

更多用法请访问在线版本体验。

## 📄 许可证

本项目采用 AGPL-3.0 许可证。详见 [LICENSE](./LICENSE) 文件。


## ⚠️ 浏览器兼容性

本工具依赖 [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)，需要以下浏览器版本：

- Chrome / Edge 112+
- 不支持 Firefox、Safari（API 支持有限）
- 移动端浏览器暂不支持

建议使用最新版本的 Chrome 或 Edge 浏览器以获得最佳体验。
