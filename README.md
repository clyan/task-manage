**技术栈：** react， hook, ts ，react-query, css-in-js， ts,

**功能：** jwt 登录注册， 项目列表， 项目详情， 项目编辑删除， 任务列表，任务排序，看板列表，看板排序。

**亮点及细节：**

乐观更新： 先更新状态，再请求后端更新数据。

# 初始化项目

[create-react-app 文档](https://create-react-app.dev/docs/getting-started)

```bash
npx create-react-app task-manage --template typescript
```

[npx 的作用](http://www.ruanyifeng.com/blog/2019/02/npx.html):

1. **npx 想要解决的主要问题，就是调用项目内部安装的模块**

比如：项目内部安装了测试工具 一般来说，调用 Mocha ，只能在项目脚本和 package.json 的[`scripts`](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)字段里面， 如果想在命令行下调用，必须像这样`node-modules/.bin/mocha --version` 。

npx 的原理很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。

由于 npx 会检查环境变量`$PATH`，所以系统命令也可以调用。

```js
 npx ls
```

2.  **避免全局安装模块**

`create-react-app`这个模块是全局安装，npx 可以运行它，而且不进行全局安装。

npx 将`create-react-app`下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载`create-react-app`。

```
npx create-react-app
```

**修改默认配置：**

react 项目都是使用[react-script](https://github.com/facebook/create-react-app#readme)运行的，梁总方案。

1. 运行`yarn eject`（不可逆，慎用，不推荐）

2. 安装[react-app-rewired](https://github.com/timarney/react-app-rewired/blob/master/README_zh.md) (推荐)使用新配置文件来覆盖部分默认的 React 配置

   - ```js
     yarn add  --dev react-app-rewired
     ```

   - 修改 package.json

     - ```json
       "scripts": {
       -   "start": "react-scripts start",
       +   "start": "react-app-rewired start",
       -   "build": "react-scripts build",
       +   "build": "react-app-rewired build",
       -   "test": "react-scripts test --env=jsdom",
       +   "test": "react-app-rewired test --env=jsdom",
           "eject": "react-scripts eject"
       }
       ```

   - 新建 config-overrides.js， 并配置，包含`Webpack 配置 - 开发和生产` 、`Jest 配置 - 测试` 、 `Webpack Dev Server` 、`路径配置 - 开发&生产` 、参考 [文档](https://github.com/timarney/react-app-rewired/blob/master/README_zh.md)

     - ```js
       // 仅参考
       module.exports = {
         webpack: function (config, env) {
           return config;
         },
         jest: function (config) {
           return config;
         },
         devServer: function (configFunction) {
           return function (proxy, allowedHost) {
             return config;
           };
         },
         paths: function (paths, env) {
           return paths;
         },
       };
       ```

**初始化的项目结构：**

**辅助功能：** 使用[tree-node-cli](https://github.com/yangshun/tree-node-cli) 生成文件树

```js
yarn add tree-node-cli
# or globally
yarn add -g tree-node-cli

# 显示
treee -L 3 -I "node_modules|.git"
```

```js
task-manage 项目名
├── package.json
├── public	不参与的公共资源，静态文件
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json	pwa配置
│   └── robots.txt		搜索引擎的爬虫配置
├── README.md
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts	预先定义的ts类型
│   ├── reportWebVitals.ts	埋点上报
│   └── setupTests.ts		单元测试
├── tsconfig.json			ts配置
└── yarn.lock
```

# 规范工程

**参考地址：** [团队编码规范](https://blog.csdn.net/csdn_yudong/article/details/106884274) 、[git 工作流](https://juejin.cn/post/6844903866451001352#heading-1) 、[提交 Pr 流程](https://www.jianshu.com/p/8b7d025a81dc)、[git 工作流](https://github.com/xirong/my-git)、[白话文 git](https://blog.csdn.net/weixin_30263277/article/details/99099322)

**避免使用 `相对路径` 嵌套过深 :** 配置别名， `tsconfig`中配置`baseUrl:'./src'`

```
# 假设： user属于src目录
# 配置前
# src/util/common/index.js
import { getName } from '../../user'

# 配置后
import { getName } from 'user'
```

## prettier

**代码格式化问题：** [prettier](https://prettier.io/docs/en/install.html)

配置 prettier 有多种方式，参考官网文档，这里采用 prettier 与 prettier-quick

```js
yarn add  --dev prettier pretty-quick
```

新建配置文件.prettierrc.json 与 忽略格式化的配置文件.prettierignore.json

```bash
echo {}> .prettierrc.json
type build coverage > .prettierignore
```

```bash

```

**.prettierignore 忽略的文件目录**

```
  build
  coverage

```

## husky

**每次提交前自动格式化命令：**

`husky` 是一个为 git 客户端增加 hook 的工具,安装后，它会自动在仓库中的 `.git/` 目录下增加相应的钩子；

安装 [husky6.0](https://typicode.github.io/husky/#/?id=install-1) 注意 4.0 与 6.0 有很大区别

`npx husky-init && yarn`

````bash
# 生成以下文件：

```bash
.husky
├── pre-commit
└── _
    └── husky.sh
````

修改： pre-commit 文件

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install pretty-quick --staged
```

以上配置：commit 时就会自动格式化了

`eslint`与`prettier` 一起使用， 使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation) 解决冲突它关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则

```js
yarn add eslint-config-prettier
```

修改 package.json 的 eslintConfig.extends : 加上"prettier"， 覆盖 eslint 的规则

```
  "eslintConfig": {
  "extends": [
      "react-app",
    "react-app/jest",
      "prettier"
  ]
  },
```

**commit 模板：**

本地安装 [你可能已经忽略的 git commit 规范](https://zhuanlan.zhihu.com/p/100574040)

## commitizen

[commitizen](https://github.com/commitizen/cz-cli)

```
# 安装commitizen
$ npm install --save-dev commitizen
# 接下来安装适配器
# for npm >= 5.2
npx commitizen init cz-conventional-changelog --yarn --dev --exact
# for npm < 5.2
$ ./node_modules/.bin/commitizen init cz-conventional-changelog --save-dev --save-exact
// package.json script字段中添加commit命令 "scripts": {    "commit": "git-cz" }
// use $ npm run commit
```

添加 package.json

```
  "scripts": {
    "commit": "cz"
  },
    "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
```

**使用中文：**

```
 yarn add cz-customizable -D
```

修改 package.json

```js
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
```

.cz-config.js

```js
"use strict";

module.exports = {
  types: [
    { value: "特性", name: "特性:    一个新的特性" },
    { value: "修复", name: "修复:    修复一个Bug" },
    { value: "文档", name: "文档:    变更的只有文档" },
    { value: "格式", name: "格式:    空格, 分号等格式修复" },
    { value: "重构", name: "重构:    代码重构，注意和特性、修复区分开" },
    { value: "性能", name: "性能:    提升性能" },
    { value: "测试", name: "测试:    添加一个测试" },
    { value: "工具", name: "工具:    开发工具变动(构建、脚手架工具等)" },
    { value: "回滚", name: "回滚:    代码回退" },
  ],

  scopes: [
    { name: "模块1" },
    { name: "模块2" },
    { name: "模块3" },
    { name: "模块4" },
  ] /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */, // it needs to match the value for field type. Eg.: 'fix' // override the messages, defaults are as follows

  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个scope (可选):", // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "短说明:\n",
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue，例如：#31, #34(可选):\n",
    confirmCommit: "确定提交说明?",
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["特性", "修复"], // limit subject length

  subjectLimit: 100,
};
```

**用法：** 先 git add. 再 执行 yarn commit 即可

## commitlint

:sparkles:集成 gitmoji 与

[commitlint](https://github.com/conventional-changelog/commitlint): 规范提交信息, 规范参考： [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

```bash
  yarn add @commitlint/config-conventional @commitlint/cli
```

**添加配置文件`commitlint.config.js` :** 参考[[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js)

```js
module.exports = {
  extends: [" "],
};
```

**添加 husky 配置:**

windows10 下不要使用单引号，不然会不成功（踩坑很久）[参考](https://zhuanlan.zhihu.com/p/366786798)

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## gitmoji

github 表情：[gitmoji](https://gitmoji.dev/) [gitmoji/github](https://github.com/carloscuesta/gitmoji/)

```bash
yarn add gitmoji-cli -g
```

**.eslintrc.json 配置 :** 一定要小心，各种报错，这里使用默认的配置

# MOCK

1.  代码入侵（直接写死 mock 数据，或者请求本地的 JSON 文件）

    - 优点：无

    - 缺点：

      - 与其他方案相比 Mock 效果不好
      - 与真实 server 环境切换非常麻烦，一切需要侵入代码切换环境的行为都是不好的

      2.  请求拦截

              1. 代表：mock.js
              2. 优点：
              3. 与前端代码分离
              4. 生成随机的数据
                 		3. 缺点：
              5. 数据都是动态生成的假数据，无法生成模拟增删改查的情况
              6. 只支持ajax, 不支持fetch
                 		4. ajax与fetch的区别

          3. 接口管理工具
             1. 代表： rap, swagger, moco, yapi
             2. 优点：
          4. 配置功能强大，接口管理与 Mock 一体，后端修改接口 Mock，也跟着改变，可靠 3. 缺点:
          5. 配置复杂，依赖后端，可能出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况
          6. 一般会作为大团队的基础建设而存在，没有这个条件的话慎重考虑
          7. 本地 node 服务器
             1. 代表：json-server
             2. 优点：
          8. 配置简单，json-server 甚至可以 0 代码 30 秒启动一个 RESTFUL Server
          9. 自定义程度高， 一切尽在掌握中
          10. 增删改查真实模拟 3. 缺点：
          11. 与接口管理工具相比，无法随着后端 API 的改动而自动修改.

配置： [json-server](https://github.com/typicode/json-server)

```js
yarn add json-server
```

`根目录` 新建文件夹：`__json_server_mock__ ` 加下划线的目的：` 阅读代码表示，此文件夹与该项目无关`

新建`db.json`: 如下，内容符合 json 即可

```json
{
  "users": []
}
```

package.json 添加 scripts 配置

```json
  "scripts": {
    "json-server": "json-server __json_server_mock__/db.json --watch --port 3001"
  },
```

# 开发项目

1. **状态提升： 将状态放置父组件， 通过参数传入子组件**

2. **新增`.env`, `.env.development`文件, webpack 会在 huild 时调用.env, start 时调用 development, 然后重启项目**

   1. ```bash
      # .env 生产环境（上线的地址）
      REACT_APP_API_URL=http://online.com

      # .env.development 开发环境, mock地址（本项目的json-server）
      REACT_APP_API_URL=http://localhost:3001
      ```

   2. 使用例子

      1. ```js
         const apiBaseUrl = process.env.REACT_APP_API_URL;

         fetch(`${apiBaseUrl}/projects?name=${param.name}&personId=
         ${param.personId}`).then(async (res) => {
           if (res.ok) setList(await res.json());
         });
         ```

3. **避免值不存在使用 `?. ` 避免找不到 underfined.name， 报错**

   - ```js
     users.find((user) => user.id === project.personId)?.name;
     ```

4. **处理参数歧义问题**

   1. ```
      `${apiBaseUrl}/projects?name=${param.name}&personId=${param.personId}`

      当name,personId为空时， 是要查询所有的，还是就是查询为空的元素，
      避免歧义： 对传参进行处理，
      ```

   2. ```js
      // 如果参数为除0以外的值，则认为他不需要传此参数，从参数中删除。注意object引用问题。
      export const isFalsy = (value) => (value === 0 ? false : !value);
      export const cleanObject = (obj) => {
        const result = { ...obj };
        Object.keys(result).forEach((key) => {
          const value = result[key];
          if (isFalsy(value)) {
            delete result[key];
          }
        });
        return result;
      };
      ```

5. **使用`qs` 包，替代硬编码参数**

   1. ```
      yarn add qs
      ```

   2. 范例：

      1. ```js
         fetch(`${apiBaseUrl}/projects?name=${param.name}&personId=
         ${param.personId}`).then(async (res) => {
           if (res.ok) setList(await res.json());
         });

         // 更改为
         fetch(`${apiBaseUrl}/projects?${qs.stringify(obj)}`).then(
           async (res) => {
             if (res.ok) setList(await res.json());
           }
         );
         ```

6. **custom Hook**

   1. 遵循 use 开头

   2. useMount

      - ```js
        export const useMount = (callback) => {
          useEffect(() => {
            callback();
          }, []);
        };
        ```

   3. useDebounce : 防抖：[防抖和节流](https://zhuanlan.zhihu.com/p/157711895?from_voters_page=true)

      - 应用场景：

        - 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
        - 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
        - 文本编辑器实时保存，当无任何更改操作一秒后进行保存

      - ```js
        export const useDebounce = (value, delay) => {
          const [debouncedValue, setDebouncedValue] = useState(value);
          useEffect(() => {
            const timer = setTimeout(() => setDebouncedValue(value), delay);
            return () => clearTimeout(timer);
          }, [value, delay]);
          return debouncedValue;
        };
        ```

# TS

[eslint 支持](https://blog.csdn.net/weixin_43972992/article/details/113731326)

create-react-app 已经默认支持 ts-eslint

单独运行 ts 文件：

```bash
tsc  <file>
```

**` tsconfig`中配置`baseUrl:'./src'` 默认所有文件从 src 中引入， 找不到则从 node-modules 中**

**作用:**

使错误在静态代码时就能够被发现，

弱类型， 会隐式类型转换

代码提示

```text
默认情况下，当你在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。要解决这个问题你应该在 TypeScript 文件的根级别位置含有 import 或者 export，它会在这个文件中创建一个本地的作用域。

a.ts

let a: String = '123'
b.ts

let b = a
可以访问。

但是如果在文件中包含import或者export就会创建一个本地的作用域

export let a: String = '123'
这样其他文件下就不能访问
```

**ts object 类型存在的问题：**

```js
let a: object
a = { name :'jack' }
a = ()=> {}
a = new RegExp('')
// 以上都不报错， 源于object 的复杂性


//使用一下方式定义：
b = {  [key:string]: unknown }

b = ()=> {} // 报错
```

**注意事项：**

​ `unknown` 代替 `any` : 限制更多。

​ 泛型

vscode 可能导致检验失效，重启 vscode。

**ts 工具类型（utility types）：**

抽象出联合类型，使用类型别名

**type** 的作用就体现出来了

例：MyFavoriteNumber 与 JackFavoriteNumber 类型一致， 如果需要给此两种类型都分别加一个 {}，

如 3：会显得很冗余。

解决： 使用 type 定义一个新的类型，基于此类型可以创建新的变量。

```js
let MyFavoriteNumber: string | number
MyFavoriteNumber = 1;
MyFavoriteNumber = "s";

let JackFavoriteNumber: string | number

# 3
let JackFavoriteNumber: string | number | {}
let MyFavoriteNumber: string | number | {}

type FavoriteNumber =  string | number| {}
let roseFavoriteNumber: FavoriteNumber = '6'
```

再看 interface

```js
interface Person {
  name: String;
}
const xiaoming: Person = { name: "小明" };
```

大部分情况下 type 与 interface 可以互换。

**主要区别：**

​ type 可以 定义联合类型， 交叉类型，二 interface 不行。

```
a | b     a& b
```

**interface 也不能实现 utility type**

useHttp 中返回的函数参数类型与 http 的参数类型其实是一致的（都为 string, Config），所有不需要重新定义，使用 utility type 直接从 http 参数中获取类型信息

**如：** Parameters<typeof http> 获取 http 函数参数 用作的此函数的类型，

**解释：** typeof http 获取 http 的参数为函数类型， 而 Parameters 读取 http 的参数类型

**注意：** 此处 typeof 为 ts 中静态使用，与 js 中的动态 typeof 区分。

```js
interface Config extends RequestInit {
  data?: object;
  token?: string;
}

// 初始
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: [string, Config]) =>
    http(endpoint, { ...config, token: user?.token });
};

export const http = (
  endPoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {};

// 改造
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
export const http = (
  endPoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {};
```

![image-20210501120003571](E:\learnMaterials\InterView\project\imgs\image-20210501120003571.png)

![image-20210501120015257](E:\learnMaterials\InterView\project\imgs\image-20210501120015257.png)

**其他例子：**

当我们不知道定义变量时的名字和 age 时， 我们无法给出初始值， 所以我们需要可选的类型， 虽然可以直接添加？解决，但是当我们在用第三方库时，我们不希望改动它的代码。

```js
type Person = {
  name: string,
  age: number,
};
const xiaoming: Person = { name: "xiaoming" }; // 不传age报错

// 例
type Person = {
  name?: string,
  age?: number,
};
```

**解决：** 使用 Partial <Person> 允许不传入任何属性， 所有属性都是可选的。

在 Person 的基础上让它的参数可选。

```
 const xiaoming: Partial<Person> = {  name: 'xiaoming' } // 不报错
```

**当我们又需要一个类型， 一个人只能传年龄，不能传名字时，不能满足**

**解决：**使用 Omit<any, any>， <源类型， 要删除的类型>,

**注意：**此时就必须传 age 属性

```js
const shenmi = Omit<Person, 'name'>  = { age: '18' } // 排除name

// | 排除多个

const shenmi = Omit<Person, 'name' | 'age'>
```

原理：

```js
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

```

# 登录

jsonserver 强依赖 restful 规范，不符合规范，则需要引入中间件，配置/login 路径

**package.json：** 添加中间件

```
json-server __json_server_mock__/db.json --watch --port 3001 --middlewares ./__json_server_mock__/middleware.js
```

**middleware:**

```js
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "ywy" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "账号或密码错误" });
    }
  }
  next();
};
```

千万不要将 tsx 写成 ts

安装 [jira-dev-tool](https://www.npmjs.com/package/jira-dev-tool)：本项目的开发者工具

```
yarn add jira-dev-tool@next
```

删除 jsonserver mock 服务，改用 jira-dev-tool，

更新 msw：

```js
npx msw init ./public
```

使用如下：

```js
import { AppProviders } from "context";
import React from "react";

import { loadServer, DevTools } from "jira-dev-tool";

loadServer(() =>
  ReactDOM.render(
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>,
    document.getElementById("root")
  )
);
```

# 封装请求

fetch 401 500 ，无论返回什么状态都不会触发 catch,

只有当网络断开连接，网络连接失败才返回异常，需要自己处理。

axios, 会捕捉异常。

[react-query](https://zhuanlan.zhihu.com/p/265146038)

# 添加 UI 库

安装：[ant-design](https://github.com/ant-design/ant-design)

```bash
yarn add antd
```

create-react-app 创建项目 ant 自定义主题配置 解决方案。使用如下方案，这里不采用，而采用前文提到的

[参考](https://www.cnblogs.com/zyl-Tara/p/10635033.html)

使用 **react-app-rewired** 自定义配置，前文已安装。

接着安装 less 与 customize-cra 与 less-loader

**注意：** less-loader 版本问题，默认安装已经超过 8.0， 传入参数要求为一个函数，降级处理

```
yarn add less less-loader@7.1.0  customize-cra
```

[customize-cra 配置文档](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options)

使用 babel-plugin-import，它是一个用于按需加载组件代码和样式的 babel 插件。

```js
yarn add babel-plugin-import -D
```

**添加 config-overwite.js :**

```js
const { override, fixBabelImports, addLessLoader } = require("customize-cra");
// 关闭css与js的map文件。。
process.env.GENERATE_SOURCEMAP = "false";
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: { "@primary-color": "red" }, // 修改主题颜色
      javascriptEnabled: true,
    },
  })
);
```

## 布局

使用 flex 与 gird

## css in js

传统 css:

- 缺乏模块的组织，
- 缺乏作用域，全部在全局作用域
- 隐式依赖
- 没有变量
- css 与 html 耦合， 修改需要修改很多地方

安装 **css in js 库之一： ** [@emotion/css](https://emotion.sh/docs/@emotion/css)

在 react 中使用，安装如下两个包

```bash
yarn add @emotion/react @emotion/styled
```

支持行内， 与 react 的 style 不同， emotion 支持伪类，级联

react 不支持子类， 伪类

安装 vscode-styled-components 插件，

使用 emotion 行内样式：

React17 中: [参考](https://blog.csdn.net/qq_21567385/article/details/111590431)

方案一： 头部加上 /\*_ @jsxImportSource @emotion/react _/

```js
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";


// 使用emotion的css
<Form css={{ marginBottom: '2rem' }}>
<Form>
```

方案二： @emotion/babel-preset-css-prop **(目前未测试成功， 先用第一种)**

```js
yarn add -D  @emotion/babel-preset-css-prop
```

​ 原来的 config-overrides.js`基础上增加配置

```js
const { addBabelPreset } = require("customize-cra");

module.exports = override(addBabelPreset("@emotion/babel-preset-css-prop"));
```

rem:

浏览器默认字体大小：16px, `16 * 62.5%= 10` 1rem 等于 10px, 10px 就等于

```css
html {
  font-size: 62.5%;
}
```

flex 与 grid 应用场景

1. 考虑一维布局还是二维布局， 二维布局用 grid,
2. 从内容出发还是从布局出发：
   1. **从内容出发：** 现有一组内容（数量不固定，）希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间。
   2. **从布局出发：** grid

处理时间：dayjs

```
yarn add dayjs
```

react 中以组件的形式引入 svg: `ReactComponent as 组件名称`

```js
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
```

# React 问题总结

_React.StrictMode_ 严格模式， antd 库出现问题。 (开发环境还是推荐打开)，

解决: _React.StrictMode_

```
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Wave which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node
```

**a 标签，不提供 href 的警告, 使用 href="/#" 加一个 /**

# 阶段问题残留

**useMount 依赖问题:** 加上 elint 注释。 // eslint-disable-line react-hooks/exhaustive-deps

**antd table:** 官方给 Table 组件提供了一个 `rowKey` 属性，用于给表格的每一行设定一个 key 值

![image-20210427152859445](E:\learnMaterials\InterView\project\imgs\image-20210427152859445.png)

jira-dev-tool 的问题。

![image-20210427153255304](E:\learnMaterials\InterView\project\imgs\image-20210427153255304.png)

**原因在于不能存在多个渲染节点， 使用最新的 jira-dev-tool， 将 DevTools 防止#root 节点内部。**

```
import { AppProviders } from "context";
import { loadServer, DevTools } from "jira-dev-tool";

loadServer(() =>
  ReactDOM.render(
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>,
    document.getElementById("root")
  )
);

```

**异步问题，**

useAsync error 不能再同步异步代码混合使用，适合在纯异步中使用。让抛出错误成为可选的。

请求还未完成，但是页面已经销毁了。。

![image-20210502161644098](E:\learnMaterials\InterView\project\imgs\image-20210502161644098.png)

```js
/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false,反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
```

**使用： 参考 27 行，在 setState 是判断当前组件是否已经卸载。**

```js
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const mountedRef = useMountedRef();

  // 一定要使用两层函数
  const [retry, setRetry] = useState(() => () => {});
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  // 用来触发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise类型数据");
    }
    return promise.then((data) => {
      // 判断当前组件是否已挂载，已卸载则不再设置值
      if (mountedRef.current) setData(data);
      return data;
    });
  };

  return {};
};
```

**错误边界：** 已有 [react-error-boundary](https://www.npmjs.com/package/react-error-boundary)

简单手写 `ErrorBoundary` :

只能处理渲染时的 error, 不能处理事件点击触发的 error

```js
import React, { ReactNode } from "react";

// 必须用class组件
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  // componentDidCatch(error, errorInfo) {
  //   // 你同样可以将错误日志上报给服务器
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}

export default ErrorBoundary;
```

不触发事件抛出的异常

```js
<Button
  onClick={() => {
    throw new Error("错误");
  }}
></Button>
```

触发：value 不存在 noExist 属性

```js
  const value:any = undefined;
  return (
      { value.noExist }
 )
```

# 定义 title

**方案一：**

[react-helmet](https://github.com/nfl/react-helmet)

react hook 与 闭包 经典的坑

**方案二：**

自定 hook: 使用 useRef 避免闭包， useRef 始终存在于生命周期，持久化变量。

```js
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]); // eslint-disable-line react-hooks/exhaustive-deps
};
```

# react-router

**路由：** [react-router](https://github.com/ReactTraining/react-router) 这里使用 6 版本

安装选择 v[6.0.0-beta.0](https://github.com/ReactTraining/react-router/releases/tag/v6.0.0-beta.0) 安装完成后缺少 history 包， 接着安装 history (跟版本有关)

```bash
yarn add react-router@6 react-router-dom@6
```

```js
yarn add history
```

react-router@6 与 react-router-dom@6 的关系

**类似于：** react 和 react-dom 的区别， react 核心库，处理虚拟的，计算的、理论的逻辑，类似于我们在组件中 state 的状态， useEffect 的状态怎么来影响虚拟 dom 树，旧的与新的 dom 树进行 diff, react 出的结果由 react-dom 消费, 主要是用于跨平台。

## useUrlQueryParams

**使用 useUrlQueryParams 管理 url 参数状态**

**原理：** 原生的 URLSearchParams

这里利用 react-router-dom 中的 useSearchParams

**实现效果描述：** 当复制此时 name= '快递'时，另一个人访问时，自动填充快递

![image-20210429123955454](E:\learnMaterials\InterView\project\imgs\image-20210429123955454.png)

**代码：**

```js
export const useUrlQueryParams = <T extends string>(keys: T[]) => {
  const [searchParam, setSearchParam] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => ({ ...prev, [key]: searchParam.get(key) || "" }),
          {} as { [key in T]: string }
        ),
      [searchParam] //eslint-disable-line  react-hooks/exhaustive-deps
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParam),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const; // 解决 返回类型异常问题
};
```

**无限循环渲染问题：** 通过 [why-did-you- render](https://github.com/welldone-software/why-did-you-render) 库排查

```bash
yarn add @welldone-software/why-did-you-render
```

src/ wdyr.ts:

```
import React from 'react';
// 开发环境运行
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
  	// true 跟踪所有的函数组件, 这里使用false
    trackAllPureComponents: false,
  });
}
```

src/ index:第一行引入

```js
import "./wdyr";
```

调试某个函数组件

```js
// ProjectListScreen为组件的名称

ProjectListScreen.whyDidYouRender = true;
```

**循环引用示例:**

**react-hook 依赖的坑** ： **基本类型， 组件状态可放， 非组件组件状态，非基本类型不可放入依赖**

依赖 obj 为一个对象， 每次 setNum 重新渲染组件，obj 都不同，会导致页面继续执行 setNum 导致无限循环。

obj 为一个基本类型时，不会发生

```js
const function Test() {
    // const obj = { name: '13' }
    const obj = 1;
    const [num, setNum] =  useState(0);
    useEffect(() => {
        console.log("effect");
        setNum(num + 1)
    }, [obj])
    return (
    	<div>
        	{num}
    	</div>
	)
}
```

**使用 useMemo 解决：**

useMemo 传入的依赖，需要是 state, 如：由 useState 的定义的值，当值为对象或数组（引用类型时）才不会导致无限引用

**字符串 id 与数值 id 的问题** ：自定义 id-select 的问题

**柯理化实战：**

**改进前：**

```js
  // 柯理化改造。。
  const pinProject = (id:number, pin: boolean) =>  mutate({ id,  pin })
  return (
    <Table
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChagne={(pin)=> {
                pinProject(project.id, pin)
            }} />
          }
        },
      ]
      </Table>
	)
```

**id 是先有的，pin 是 onCheckedChagne 后才有的，所以可以进行柯理化。**

注意`2` `9` `10` 行的变化

**改进后：**

```js
  // 柯理化改造。。
  const pinProject = (id:number)=> (pin: boolean) =>  mutate({ id,  pin })
  return (
    <Table
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChagne={pinProject(project.id)} />
          }
        },
      ]
      </Table>
	)
```

**问题： 当点击收藏后，服务端返回数据，必须要重新获取服务端的数据，更新页面**

**useState 存入一个函数，会把函数直接运行！！！** 惰性初始 state! 参照官网

**方案一：**

useState 保存函数，不能直接传入函数, 使用两个函数。

```js
const [callback, setCallback] = React.useState(() => () => {
    alert('init')
})

<button onClick={() => setCallback( () => () => { alert('update') })}> </button>
```

**方案二：**

使用 useRef 保存函数

```js
const callbackRef = useRef(() => alert('init'))
const callback = callbackRef.current;

// 使用
<button onClick={() => (callbackRef.current = () => { alert('update') })}> </button>

// 获取最新的值, 一定要，执行这个函数 callbackRef.current()，不然获取到的初始化的值
<button onClick={() => callbackRef.current()}> </button>
```

**useState 与 use Ref 的区别**

1. useState 的值在每个 rernder 中都是独立存在的。而 useRef.current 则更像是相对于 render 函数的一个全局变量，每次他会保持 render 的最新状态。这种关系更像是 js 一个经典的案例：for 循环中异步打印 i 的值，let 声明的 i 就相当于每个都是独立作用域，互相之间不会干扰。var 则反之。

2. useState 值的更新会触发组件重新渲染，而 useRef 的 current 不会出发重渲染
3. useState 保存函数式状态会有问题。

**优化：**

eslint-disable-line react-hooks/exhaustive-deps 禁止了依赖项， 比如 useEffect 内部使用了 callback 可依赖项里面没有

```js
export const useMount = (callback: Function): void => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
```

使用 useCallBack 优化。

写自定 hook 时， 如果要返回一个函数，就要用 useCallback 包裹， 如果是返回一个对象则用 useMemo 包裹
