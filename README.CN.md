# Chatterm
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<center>
✨ Use ChatGPT in Terminal like a pro ✨
</center>
<hr>

[英文文档](./README.md)

## 前置条件
必须先有 openai 官方网站的账号，可以通过这个链接注册，https://chat.openai.com/auth/login。

注册完成后获取如下两个 key。

* **API key**: https://platform.openai.com/account/api-keys.

* **Organization key**: https://platform.openai.com/account/org-settings

在环境变量中导出，方法如下：

```bash
export ORGANIZATION="YOUR_ORGANIZATION"
export OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

## 安装
```bash
npm i -g chatterm
# or
yarn global add chatterm
```

直接运行 `chatterm` 命令即可。

```bash
chatterm
```

## 使用方法
### 单行输入
https://user-images.githubusercontent.com/22005951/227783447-1c7485f0-ca0b-42ac-992c-be7cfa92d08c.mp4

### 多行输入
可使用 `/` 获得命令提示，目前仅支持 `/mode` 命令，用来切换多行输入模式。

切换后 mac、linux 系统会默认使用 vim 进行编辑，因此需要一定的 vim 操作基础（比如至少知道如何保存和退出😏），windows 则会默认使用 notepad 进行编辑。

https://user-images.githubusercontent.com/22005951/227783492-998a5047-876a-49a6-99c6-b3847b9cb8f4.mp4


## 原理
使用 openai 官方的 open API 实现核心聊天功能，以及 [inquirer.js](https://github.com/SBoudrias/Inquirer.js) 实现命令行的 UI 工作流。

## 参与贡献
**Working on your first Pull Request?** You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request).
