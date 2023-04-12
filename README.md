# 藏书票 Bookplate

## 前言

作为 `藏书票 Bookplate` 的开发者，希望你对以下建议展开行动

1. 深刻认识 JavaScript 中没有**形参**，一切都是**引用**
2. 对 JavaScript 基本数据类型有一定了解，以此上手 TypeScript
3. 学习小程序的生命周期，包括小程序、页面、组件它们自身的生命周期，以及它们之间的生命周期执行顺序
4. 拥有对同步、异步、Promise、async、await 的基本认识
5. 拥有一定阅读官方源代码（非本项目代码）的能力
6. 先从 `types/index.ts` 、`services/users.ts` 这两个文件开始看起

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

