<div align="center">
  <h1>xiaohe-eslint-config</h1>
  <span>✌️ ESLint config preset for xiaohe (forked from antfu/eslint-config@3.11.2)</span>
</div>

<br>

[![github stars][github-stars-src]][github-stars-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

xiaohe0601 / [github@xiaohe0601](https://github.com/xiaohe0601) / [gitee@xiaohe0601](https://gitee.com/xiaohe0601)

### 🚁 Installation

#### PNPM

``` shell
pnpm add -D eslint @xiaohe01/eslint-config
```

#### YARN

``` shell
yarn add --dev eslint @xiaohe01/eslint-config
```

#### NPM

``` shell
npm install -D eslint @xiaohe01/eslint-config
```

> [!WARNING]
> ESLint `9.5.0+` is now required

### 🛹 Usage

Create `eslint.config.js` in your project root

```js
import defineConfig from "@xiaohe01/eslint-config";

export default defineConfig();
```

> [!NOTE]
> If you want to use TypeScript configuration files,
> please refer to [typescript-configuration-files](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files).

Add script for `package.json`, for example

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

For more information, please refer to [antfu/eslint-config](https://github.com/antfu/eslint-config).

### 🐶 Discussion & Communication

- ❓：For questions or bug feedback, you can submit an [issues](https://github.com/xiaohe0601/xiaohe-eslint-config/issues)
  and PRs are welcome~
- 📫：[xiaohe0601@outlook.com](mailto:xiaohe0601@outlook.com)
- 🐧：Not yet available

### 🏆 License

- MIT [LICENSE](./LICENSE)

<!-- Badges -->

[github-stars-src]: https://img.shields.io/github/stars/xiaohe0601/xiaohe-eslint-config?style=flat&colorA=080f12&colorB=1fa669&logo=GitHub

[github-stars-href]: https://github.com/xiaohe0601/xiaohe-eslint-config

[npm-version-src]: https://img.shields.io/npm/v/@xiaohe01/eslint-config?style=flat&colorA=080f12&colorB=1fa669

[npm-version-href]: https://npmjs.com/package/@xiaohe01/eslint-config

[npm-downloads-src]: https://img.shields.io/npm/dm/@xiaohe01/eslint-config?style=flat&colorA=080f12&colorB=1fa669

[npm-downloads-href]: https://npmjs.com/package/@xiaohe01/eslint-config

[bundle-src]: https://img.shields.io/bundlephobia/minzip/@xiaohe01/eslint-config?style=flat&colorA=080f12&colorB=1fa669&label=minzip

[bundle-href]: https://bundlephobia.com/result?p=@xiaohe01/eslint-config

[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669

[jsdocs-href]: https://www.jsdocs.io/package/@xiaohe01/eslint-config

[license-src]: https://img.shields.io/github/license/xiaohe0601/xiaohe-eslint-config.svg?style=flat&colorA=080f12&colorB=1fa669

[license-href]: https://github.com/xiaohe0601/xiaohe-eslint-config/blob/main/LICENSE