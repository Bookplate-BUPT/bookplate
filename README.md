# 藏书票 Bookplate

## 前言

作为藏书票 Bookplate 的开发者，你应该：

1. 掌握 Git 的基本操作
2. 有一定 JavaScript 基础，深刻认识到 JavaScript 中没有**形参**，一切都是**引用**
3. 对 JavaScript 和它的基本数据类型有一定了解，以此上手 TypeScript
4. 拥有对同步、异步、Promise、async、await 的基本认识
5. 了解小程序的生命周期，包括小程序、页面、组件它们自身的生命周期，以及彼此之间的生命周期函数执行顺序
7. 先从 `types/index.ts` 、`services/users.ts` 这两个文件开始看起，可以从 `pages/personalInfo` 开始学习

## 环境准备

首先将本仓库 clone 下来，然后你需要联系项目的管理人员获得小程序的 appid 和云环境 ID ，替换对应内容并运行以下指令

```bash
BOOKPLATE_APP_ID=XXXXX DEVELOPMENT_ENV=XXXXX PRODUCTION_ENV=XXXXX bash init.sh
```

然后才可以用微信开发者工具导入项目

紧接着在根目录下打开终端，并输入以下指令来安装依赖

```bash
yarn install
```

然后在微信开发者工具中找到 `工具` 点击 `构建npm` 

