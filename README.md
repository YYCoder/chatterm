# Chatterm
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<center>
✨ Use ChatGPT in Terminal like a pro ✨
</center>
<hr>

## Prerequisite
you must have an openai account.

* **API key**: grab it here, https://platform.openai.com/account/api-keys.

* **Organization key**: grab it here, https://platform.openai.com/account/org-settings

export API key and organization key into environment.

```bash
export ORGANIZATION="YOUR_ORGANIZATION"
export OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

and you are all set! just run `chatterm`, have fun!

```bash
chatterm
```

## Install
```bash
npm i -g chatterm
# or
yarn global add chatterm
```

## Usage
### Basic
[](./docs/basic.mp4)

### Multi-Line Input
[](./docs/multi-line.mp4)


## Under the hood
It uses the openai official APIs for it's core feature, and [inquirer.js](https://github.com/SBoudrias/Inquirer.js) for terminal UI workflow.

## Contribution
**Working on your first Pull Request?** You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request).
