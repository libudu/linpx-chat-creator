## 这是什么

这是linpx-chat-creator，是Linpx的子项目，一个交互式聊天框模拟器的即时编辑器。

LINPX是什么详见 https://github.com/libudu/linpx-web 。

如何运行、赞助信息等也详见LINPX的项目介绍。

具体是什么用一用就知道了。



## 如何运行

在开始之前你需要有一定前端基础，至少了解npm、ES6、react，否则最好补了基础再来

首先安装依赖：`yarn` 或 `npm install`

然后运行：`yarn start` 或 `npm start`

打包构建：`yarn build` 或 `npm run build`



## 源码讲解

整体使用基于react的umi框架，目录结构、路由、配置等都在umi框架之内。

UI框架主要使用了ant design和ant design mobile。

组件编写主要使用react hook，样式编写大量使用了tailwindcss，加上少量less。

部分过渡动画使用了react-transition-group。



如同视觉上看到了，主要分为Chat和Control两个部分，Chat是渲染出的聊天框演出效果，Control是编辑器控制部分。两者不直接进行数据交换，而是通过全局script对象，所有修改将触发script的更新和全局重渲染，得益于React的虚拟DOM机制能够高效更新DOM。



## TODO

### 打通上下游

支持脚本列表：

脚本导出和导入：点击导出后能够下载，点击导入能选择本地文件加载脚本

脚本上传与发布



### 扩充消息种类

提示消息：可能是时间戳或提示

图片消息：图片过多的项目需要预加载

动作消息：转场、清屏、插入代码等



### 扩充配置



### 界面美化

适配移动端

优化界面设计



### 脚本演出优化
