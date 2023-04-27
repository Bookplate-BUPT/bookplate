# 藏书票 Bookplate

## 前言

作为藏书票 Bookplate 的开发者，你应该：

1. 掌握 Git 的基本操作
2. 对 JavaScript 的基本数据类型有一定了解，以此上手 TypeScript
3. 有一定 JavaScript 基础，理解 JavaScript 中的**引用**
4. 拥有对同步、异步、Promise、async、await 的基本认识
5. 了解小程序的生命周期，包括小程序、页面、组件它们自身的生命周期，以及彼此之间的生命周期函数执行顺序
6. 熟悉 [Vant Weapp](https://youzan.github.io/vant-weapp/#/home) 组件库

## 环境准备

首先将本仓库 clone 下来，然后你需要联系项目的管理人员获得小程序的 appid 和云环境 ID ，替换对应内容并在 Git Bash 中运行以下指令

```bash
BOOKPLATE_APP_ID=XXXXX DEVELOPMENT_ENV=XXXXX PRODUCTION_ENV=XXXXX bash init.sh
```

然后才可以用微信开发者工具导入项目

紧接着在根目录下打开终端，并输入以下指令来安装依赖

```bash
yarn install
```

然后在微信开发者工具中找到 `工具` 点击 `构建npm` 

## 如何上手

**在继续往下之前，确保你对小程序本身有一定了解或基础，且完成了 *前言* 内容的学习**

为了能够充分理解整个项目的结构和封装，你需要：

1. 理解封装的含义和本项目的结构

   > - miniprogram（此目录仅展示本项目封装相关的文件夹）
   >   - consts（存放常量）
   >   - services（存放与数据库交互或云函数操作的方法）
   >     - index.ts（一般通用的方法）
   >     - books.ts（与书籍相关的方法）
   >     - ...
   >   - types（定义数据类型）
   >   - utils（存放不与数据库交互和云函数操作的一些基本通用方法）

2. 阅读 `types/index.ts` （可以先不用看 `Time` 类型）

   > 在这一步，你要理解项目中自定义的 `普通类型` 和 `DB类型` ，理解它们该在什么场合使用
   >
   > 同时你也可以看看 `utils/utils/ts` 中的 `removeDBIdentifier` 方法，这是它们的转换

3. 阅读 `services/users.ts` 

   > 这一步你需要理解项目对于数据库和云函数操作的基本封装方式
   >
   > 此处挑出一个基本的 services 里的文件，如果你不喜欢 `user.ts` 的话，也可以查看别的 services 文件夹下的文件
   >
   > 你会经常看到 `convertDateToTimestamp` 和 `convertTimestampToDate` 方法，现在你可以回头去看看之前跳过的 `Time` 类型，理解本项目是如何处理时间数据的
   
4. 阅读 `pages/personalInfo`

   > 这一步算是所有上述知识的一个巩固，此页面包含非常多的知识点，这是对项目封装和小程序基础知识的一个综合运用
   >
   > 同样，如果你不喜欢这个页面的话，也可以查看别的页面
