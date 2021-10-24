# Node Api Template

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Flucsimao%2Fnode-api-template%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/lucsimao/node-api-template/master)

A personal uncoupled rest api template using NodeJs and Typescript.

## Authors

- [@lucsimao](https://www.github.com/lucsimao)

# Summary

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Test](#Test)
- [Techs](#Techs)
- [References](#References)

# Installation

To install this project, run the following commands:
`git clone https://github.com/lucsimao/node-api-template`

# Installation

To install this project, run the following commands:

```
$ git clone https://github.com/lucsimao/testlink-facade-api
```

- For npm users

```
  $ npm install
  $ npm start
```

- For yarn users:

```
$ yarn install
$ yarn start
```

### Elastic Search

Caso o elastic search não funcione no docker, uma configuração do max_map_count pode ser necessária conforme a página oficial do [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#_set_vm_max_map_count_to_at_least_262144) recomenda.

Para windows

```sh
wsl -d docker-desktop
sysctl -w vm.max_map_count=262144
```

Para Linux

```sh
grep vm.max_map_count /etc/sysctl.conf
vm.max_map_count=262144
```

Para MacOS ou Windows sem WSL

```sh
docker-machine ssh
sudo sysctl -w vm.max_map_count=262144
```

# Test

To execute this project tests, you must run the following commands:

- **Unit Tests**

  ```
  $ npm run test:unit
  ```

  or

  ```
  $ yarn test:unit
  ```

- **Functional Tests**

```
$ npm run test:functional
```

```
$ yarn test:functional
```

- **Lint**

```
$ npm run lint
```

or

```
$ yarn lint
```

- **Style Check**
  `` npm run style:check`  ``npm run style:fix`or`yarn style:check` `yarn style:fix`

- **All Tests**
  ```npm test`
  or
  `yarn test`

# Techs

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

In this project, we used the following technologies:

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)- Text editor with following plugins installed: [DotENV](https://github.com/mikestead/vscode-dotenv), [ESLint](https://github.com/Microsoft/vscode-eslint), [GitLens](https://github.com/eamodio/vscode-gitlens) e [vscode-icons](https://github.com/vscode-icons/vscode-icons).
- [Jest](https://jestjs.io/) - Javascript Test Framework.
- [ESLint](https://github.com/eslint/eslint) - ESLint to padronize the project code.
- [Prettier](https://prettier.io/) - To format code automatically.
- [Stryker](https://stryker-mutator.io/docs/General/dashboard/) - To run mutation tests in project and use mutation badges.

# References

- [Waldemar Neto - DO ZERO A PRODUÇÃO: APRENDA A CONSTRUIR UMA API NODE.JS COM TYPESCRIPT ](https://github.com/waldemarnt/node-typescript-api)
- [@brunohafonso95](https://github.com/brunohafonso95)
- [Glaucia Lemos - Curso Typescript Zero To Hero](https://github.com/glaucia86/curso-typescript-zero-to-hero)
- [Alura - Formação Node JS](https://cursos.alura.com.br/formacao-node-js-12)
- [NodeJS Integration Test Best Practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [NodeJS Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Javascript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
