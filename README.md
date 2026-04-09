# learn-game

一个基于 React + Vite 构建的棋牌学习项目，面向中文用户提供八十分、四川麻将（川麻）和斗地主三类游戏的入门与进阶学习内容。项目通过分模块教程、互动式练习和本地学习进度记录，帮助用户逐步掌握规则与基础策略。

## 项目特点

- 支持 3 种游戏学习：八十分、四川麻将、斗地主
- 首页提供游戏选择与整体学习进度展示
- 每个游戏包含入门阶段与进阶阶段内容
- 支持展开式章节学习与练习弹窗交互
- 使用 `localStorage` 自动保存本地学习进度
- 组件按需懒加载，提升首屏加载性能
- 已配置 GitHub Pages 部署脚本

## 技术栈

- React 18
- Vite 5
- JavaScript (ESM)
- CSS

## 功能说明

### 1. 游戏选择页

首页用于展示所有可学习的游戏模块，包括：

- 游戏名称与简介
- 对应的封面图片
- 单个游戏学习进度
- 全部游戏的总体学习进度

### 2. 学习模块

当前包含以下学习内容：

- 八十分学习指南
- 川麻学习指南
- 斗地主学习指南

每个模块都采用类似结构：

- 入门阶段
- 进阶阶段
- 可展开的知识章节
- 互动练习场景
- 上一步 / 下一步练习流程

### 3. 学习进度追踪

项目通过 [`src/utils/progressTracker.js`](/Users/admin/PycharmProjects/learn_game/src/utils/progressTracker.js) 管理学习状态，默认保存在浏览器本地：

- 已完成章节
- 已完成练习
- 最近访问时间
- 单游戏完成百分比
- 整体完成百分比

默认存储键名为：

```text
game_learning_progress
```

## 本地运行

### 环境要求

- Node.js 18 及以上版本
- npm 9 及以上版本

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

默认开发地址：

```text
http://localhost:5173
```

### 打包生产版本

```bash
npm run build
```

### 本地预览生产包

```bash
npm run preview
```

默认预览地址：

```text
http://localhost:4173
```

## 测试

项目现已补充基于 `Vitest + Testing Library + jsdom` 的前端测试，用于覆盖现有主要功能。

### 运行测试

```bash
npm run test
```

### 监听模式

```bash
npm run test:watch
```

### 当前测试覆盖范围

- 首页游戏选择页渲染、进度展示与页面跳转返回
- 3 个学习模块的标签切换、章节展开与练习弹窗交互
- 练习流程中的上一步、下一步、关闭行为
- `ProgressBar` 组件的文本与样式渲染
- `LazyImage` 组件在懒加载与降级场景下的图片加载行为
- `progressTracker` 中的初始化、去重、进度计算与重置逻辑

### 测试文件位置

```text
src/test/
├── setup.js
├── App.test.jsx
├── ProgressBar.test.jsx
├── LazyImage.test.jsx
├── learningComponents.test.jsx
└── progressTracker.test.js
```

## 部署说明

项目在 [`vite.config.js`](/Users/admin/PycharmProjects/learn_game/vite.config.js) 中配置了：

```js
base: '/learn-game/'
```

这表示它已经适配以 `/learn-game/` 作为子路径部署，适合发布到 GitHub Pages。

部署命令：

```bash
npm run build
npm run deploy
```

部署前请确认仓库的 GitHub Pages 路径与 `base` 配置一致。

## 项目结构

```text
learn_game/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── assets/
│   ├── components/
│   │   ├── EightyPointsLearning.jsx
│   │   ├── SichuanMahjongLearning.jsx
│   │   ├── DoudizhuLearning.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── LazyImage.jsx
│   │   └── *.css
│   └── utils/
│       ├── progressTracker.js
│       └── images.js
└── README.md
```

## 主要脚本

[`package.json`](/Users/admin/PycharmProjects/learn_game/package.json) 中当前可用脚本如下：

- `npm run dev`：启动开发服务器
- `npm run build`：构建生产包
- `npm run preview`：预览生产包
- `npm run lint`：执行 ESLint 检查
- `npm run deploy`：将 `dist` 发布到 GitHub Pages

## 代码说明

- [`src/App.jsx`](/Users/admin/PycharmProjects/learn_game/src/App.jsx)：应用入口页面，负责游戏选择、页面切换和进度汇总
- [`src/components/EightyPointsLearning.jsx`](/Users/admin/PycharmProjects/learn_game/src/components/EightyPointsLearning.jsx)：八十分学习模块
- [`src/components/SichuanMahjongLearning.jsx`](/Users/admin/PycharmProjects/learn_game/src/components/SichuanMahjongLearning.jsx)：川麻学习模块
- [`src/components/DoudizhuLearning.jsx`](/Users/admin/PycharmProjects/learn_game/src/components/DoudizhuLearning.jsx)：斗地主学习模块
- [`src/components/ProgressBar.jsx`](/Users/admin/PycharmProjects/learn_game/src/components/ProgressBar.jsx)：进度条组件
- [`src/components/LazyImage.jsx`](/Users/admin/PycharmProjects/learn_game/src/components/LazyImage.jsx)：懒加载图片组件
- [`src/utils/progressTracker.js`](/Users/admin/PycharmProjects/learn_game/src/utils/progressTracker.js)：学习进度存储与计算逻辑

## 当前项目特征补充

- 项目图片资源主要通过远程图片接口生成并加载
- 学习内容和练习题目前以静态前端内容形式实现
- 当前未接入后端服务，属于纯前端应用
- 用户数据不会同步到云端，清理浏览器缓存后本地进度可能丢失

## 后续可扩展方向

- 增加更完整的题库与答题判定逻辑
- 增加章节完成状态的可视化标识
- 增加学习历史与复习建议
- 接入账户系统，实现多端同步
- 为移动端进一步优化交互体验

## 许可证

当前仓库未声明开源许可证。如需开源发布，建议补充 `LICENSE` 文件。
