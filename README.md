# Chatterm
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<center>
✨ Use ChatGPT in Terminal like a pro ✨
</center>
<hr>

[中文文档](./README.CN.md)

## Prerequisite
you must have an openai account. you can use this link [https://chat.openai.com/auth/login](https://chat.openai.com/auth/login) to sign up.

then, grab following two keys from the web UI:

* **API key**: grab it here, https://platform.openai.com/account/api-keys.

* **Organization key**: grab it here, https://platform.openai.com/account/org-settings

export API key and organization key into environment.

```bash
export ORGANIZATION="YOUR_ORGANIZATION"
export OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

## Install
```bash
npm i -g chatterm
# or
yarn global add chatterm
```

and you are all set! just run `chatterm`, have fun!

```bash
chatterm
```


## Usage
### Basic
https://user-images.githubusercontent.com/22005951/227783447-1c7485f0-ca0b-42ac-992c-be7cfa92d08c.mp4

### Multi-Line Input
use prefix `/` to find all the available commands, currently only support `/mode` to select multi-line input.

after select `multi-line` mode, for mac and linux, it will use `vim` as default editor, so it required some basic knowledge about `vim`(at least know how to save and quit😏), for windows, it will use `notepad` as default editor.

https://user-images.githubusercontent.com/22005951/227783492-998a5047-876a-49a6-99c6-b3847b9cb8f4.mp4


## Under the hood
It uses the openai official APIs for it's core feature, and [inquirer.js](https://github.com/SBoudrias/Inquirer.js) for terminal UI workflow.

## Contribution
**Working on your first Pull Request?** You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request).
