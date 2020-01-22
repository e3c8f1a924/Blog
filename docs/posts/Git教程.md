---
layout: post
time: 2019-07-28 08:00
Top: 50
title: Git教程
description: Git的基本配置与使用。
tag: 学习笔记
---

# 为什么要用Git？

相信很多人都在使用`GitHub`，这东西用起来方便，特别是代码仓库的管理。但是，如果将仓库Clone到本地，或是将本地代码上传到仓库中可就没那么方便了（虽然`GitHub`有线下App，但那图形界面真的是累赘）。
所以，我们使用一个名叫`Git`的App来完成这些操作。

# 初步配置

我们从官网下载`Git`。[下载网址](https://git-scm.com/downloads)

下载完成后安装。

安装后，到任意文件夹下，右键点击`Git Bash Here`，打开Git命令行窗口。

首先输入如下命令，配置用户：

```
git config --global user.name "你的用户名"
git config --global user.email 你注册GitHub时使用的邮箱
```

正常情况下不会有信息显示。

然后，我们输入`ssh-keygen -t rsa -C "你注册GitHub时使用的邮箱"`，一直按回车，会出现如下一堆信息：

![](https://raw.githubusercontent.com/Bambusaceae/images/master/%E6%89%B9%E6%B3%A8%202019-07-28%20091507.jpg)

我们按照图中画白线的位置找到一个路径，用文本编辑器打开那个路径所指向的文件，复制里面的东西，然后打开[这个网页(前提是已登录GitHub)](https://github.com/settings/keys)，如下操作：

点击`New SSH Key`，`Title`随便填，`Key`就是刚才那个文件中的内容，最后点击`Add SSH Key`。

到这里，我们的初步配置环节就算结束了。

# 基础用法

## 从GitHub上将代码克隆到本地

使用`git clone 仓库地址`命令。

克隆成功后，你会发现当前目录下多了一个和仓库名称一样的文件夹，它就是仓库中的代码。

## 将代码提交到GitHub

分为以下三步：

1. `git add`

使用`git add 目录或文件`将代码加入到缓存。

2. `git commit`

使用`git commit -m"备注"`创建一个commit。

3. `git push`

使用`git push origin master`上传到`GitHub`上。

**注意！以上三步必须在仓库文件夹内执行！**
