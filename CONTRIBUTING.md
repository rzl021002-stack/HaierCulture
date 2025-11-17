# 贡献指南

感谢您对海尔文化展数字化平台的关注！我们欢迎各种形式的贡献。

## 行为准则

我们致力于提供一个热情、尊重和包容的社区。请阅读并遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。

## 如何贡献

### 🐛 报告 Bug

如果您发现 Bug，请通过 [GitHub Issues](https://github.com/rzl021002-stack/HaierCulture/issues/new) 报告。

**提交 Bug 报告时，请包含：**
- 清晰的标题
- Bug 的详细描述
- 复现步骤
- 预期行为 vs 实际行为
- 截图或视频（如适用）
- 您的环境信息（OS、浏览器、Node 版本等）

### ✨ 建议功能

我们欢迎功能建议！请通过 [GitHub Issues](https://github.com/rzl021002-stack/HaierCulture/issues/new) 提交。

**提交功能建议时，请包含：**
- 清晰的标题
- 详细的描述
- 使用场景和好处
- 可能的实现方式

### 📝 提交代码

#### 准备工作

1. **Fork 项目**
```bash
git clone https://github.com/YOUR_USERNAME/HaierCulture.git
cd HaierCulture
```

2. **创建分支**
```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/bug-description
```

3. **安装依赖**
```bash
npm install
```

4. **启动开发服务器**
```bash
npm run dev
```

#### 开发规范

**代码风格：**
- 使用 TypeScript 编写代码
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码

**命名规范：**
- 组件名使用 PascalCase（例：`ExhibitionMap.tsx`）
- 文件名使用 PascalCase
- 变量/函数名使用 camelCase
- 常量名使用 UPPER_SNAKE_CASE

**代码质量：**
- 编写有意义的提交信息
- 添加适当的代码注释
- 为新功能添加 TypeScript 类型
- 遵循 DRY 原则

#### Git 提交规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码风格（不影响功能）
- `refactor:` - 代码重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建系统、依赖更新等

**示例：**
```
feat(exhibition-map): add zoom animation support

- Implement smooth zoom transition
- Add mouse wheel support
- Update camera controls

Closes #123
```

#### 提交 Pull Request

1. **推送到您的 Fork**
```bash
git push origin feature/your-feature-name
```

2. **创建 Pull Request**
- 清楚地描述您的更改
- 链接相关的 Issue（如 `Closes #123`）
- 提供截图或演示（如适用）

3. **CR 过程**
- 代码审查通常在 1-3 工作日内完成
- 及时响应审查意见
- 根据反馈进行必要的更改

**PR 检查清单：**
- [ ] 代码遵循项目的代码风格
- [ ] 提交了有意义的提交信息
- [ ] 更新了相关文档
- [ ] 添加了必要的测试
- [ ] 所有测试通过
- [ ] 没有新的 Lint 警告

### 📚 改进文档

文档很重要！如果您发现错误或有改进建议：

1. 编辑相关的 `.md` 文件
2. 测试 Markdown 的正确性
3. 提交 PR

## 开发工作流

### 分支策略

```
main
  └── feature/xxx          # 新功能
  └── fix/xxx              # Bug 修复
  └── docs/xxx             # 文档更新
  └── refactor/xxx         # 重构
```

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器
open http://localhost:3000

# 4. 类型检查
npm run type-check

# 5. 构建生产版本
npm run build
npm start
```

## 项目结构

```
app/              - Next.js 核心应用
components/       - React 组件
  ├── ui/        - UI 基础组件
  └── ...        - 功能组件
```

## 常见问题

**Q: 我应该在哪里提交问题？**
A: 在 [GitHub Issues](https://github.com/rzl021002-stack/HaierCulture/issues) 中。

**Q: 如何联系项目维护者？**
A: 通过 GitHub Issues 或 Pull Request 与我们联系。

**Q: 需要多长时间才能合并我的 PR？**
A: 通常 3-7 个工作日，取决于更改的复杂性。

## 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下发布。

## 致谢

感谢所有为改进这个项目做出贡献的人！

---

**祝您开发愉快！** 🚀
