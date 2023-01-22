# package-json-from-git

Generate package.json information from Git data. Useful for `create-xxx` tools.

## Install

```bash
npm i package-json-from-git
```

## Usage

```js
import { getPackageJsonFromGit } from 'package-json-from-git';

getPackageJsonFromGit().then((data) => {
  console.log(data);
});
```

```json
{
  "author": {
    "email": "i@guoyunhe.me",
    "name": "Guo Yunhe"
  },
  "bugs": {
    "url": "https://github.com/guoyunhe/package-json-from-git/issues"
  },
  "homepage": "https://github.com/guoyunhe/package-json-from-git#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/guoyunhe/package-json-from-git.git"
  }
}
```
