<p align="center">
  <a href="https://zeroing.jd.com/micro-app/">
    <img src="https://cangdu.org/micro-app/_media/logo.png" alt="logo" width="200"/>
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@micro-zoe/micro-app">
    <img src="https://img.shields.io/npm/v/@micro-zoe/micro-app.svg" alt="version"/>
  </a>
  <a href="https://www.npmjs.com/package/@micro-zoe/micro-app">
    <img src="https://img.shields.io/npm/dt/@micro-zoe/micro-app.svg" alt="downloads"/>
  </a>
  <a href="https://github.com/micro-zoe/micro-app/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@micro-zoe/micro-app.svg" alt="license"/>
  </a>
  <a href="https://makeapullrequest.com/">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=blue" alt="PRs-welcome"/>
  </a>
  <a href="https://gitter.im/zoe-community/zoe-room">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a>
  <a href="https://travis-ci.com/github/bailicangdu/micro-app">
    <img src="https://travis-ci.com/bailicangdu/micro-app.svg?branch=master" alt="travis"/>
  </a>
  <a href="https://coveralls.io/github/bailicangdu/micro-app?branch=master">
    <img src="https://coveralls.io/repos/github/bailicangdu/micro-app/badge.svg?branch=master" alt="coveralls"/>
  </a>
</p>

English｜[简体中文](https://github.com/micro-zoe/micro-app/blob/master/README.zh-cn.md)｜[Discussions](https://github.com/micro-zoe/micro-app/discussions)｜[Gitter](https://gitter.im/zoe-community/zoe-room)

# 📖Introduction
[micro-app](https://github.com/micro-zoe/micro-app/issues/8) is a micro front-end framework for rendering based on WebComponent-like, it realizes the micro front-end from the component thinking, aiming to reduce the difficulty of getting started and improve work efficiency. 

It is the lowest cost framework for accessing micro front-end, and provides a series of perfect functions such as JS sandbox, style isolation, element isolation, preloading, resource address completion, plugin system, data communication and so on.

The micro-app has nothing to do with the technology stack, nor is it tied to the business, and can be used in any front-end framework.

# Getting Start
The micro front-end is divided into base application and sub application. We list the modifications required for base application and sub application respectively, and introduce the use of micro-app in detail.

## base application
> The base application takes the vue framework as an example

1、Install
```bash
yarn add @micro-zoe/micro-app
```

2、import at the entrance
```js
// main.js
import microApp from '@micro-zoe/micro-app'

microApp.start()
```

3、Assign a route to the sub application
```js
// router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPage from './my-page.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 👇 Non-strict matching, /my-page/xxx will be matched to the MyPage component
    path: '/my-page/*', 
    name: 'my-page',
    component: MyPage,
  },
]

export default routes
```

4、Use components in `my-page` pages
```html
<!-- my-page.vue -->
<template>
  <div>
    <h1>sub application</h1>
    <!-- name is the application name, globally unique, url is the html address -->
    <micro-app name='app1' url='http://localhost:3000/' baseurl='/my-page'></micro-app>
  </div>
</template>
```

> Please refer to [Routing Chapter](https://zeroing.jd.com/micro-app/docs.html#/zh-cn/route) for the relationship between url and sub application routing

## sub application
> The sub application takes the react framework as an example

1、Add basename for route

```js
// router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function AppRoute () {
  return (
    // 👇 the sub application can get the baseurl issued by the base application through window.__MICRO_APP_BASE_URL__
    <BrowserRouter basename={window.__MICRO_APP_BASE_URL__ || '/'}>
      <Switch>
        ...
      </Switch>
    </BrowserRouter>
  )
}
```

2、Set cross-domain support in the headers of webpack-dev-server.
```js
devServer: {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
},
```

Then micro front-end can be rendered normally, and the react sub application is embedded in the vue base application. The effect is as follows：

![image](https://img10.360buyimg.com/imagetools/jfs/t1/188373/14/17696/41854/6111f4a0E532736ba/4b86f4f8e2044519.png)

The above lists the usage of react and Vue framework. They can be combined freely. For example, the base application is react, the sub application is Vue, or the base application is Vue, the sub application is react, or both the base application and the sub application are react and Vue. The micro-app has no restrictions on the front-end framework, and any framework can be used as a base application to embed any type of sub application of the framework.

More detailed configuration can be viewed [Official website document](https://zeroing.jd.com/micro-app/docs.html#/zh-cn/start).

# 🤝 Participate in micro-app
If you are interested in this project, you are welcome to mention PR, and also welcome your "Star" ^_^

### development
1、Clone
```
git clone https://github.com/micro-zoe/micro-app.git
```

2、Installation dependencies
```
yarn bootstrap
```

3、Run project
```
yarn start
```

The react base application is started by default. If you want to start the vue base application, you can run: `yarn start:main-vue2`

# FAQ
<details>

  <summary>What are the advantages of micro-app?</summary>
  It is easy to use and low invasive. It only needs to change a small amount of code to access the micro front-end, and provides rich functions at the same time.

</details>
<details>
  <summary>How compatible?</summary>
  The micro-app relies on two newer APIs, CustomElements and Proxy.

  For browsers that do not support CustomElements, they can be compatible by introducing polyfills. For details, please refer to: [webcomponents/polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements)。

  However, Proxy is not compatible for the time being, so the micro-app cannot be run on browsers that do not support Proxy.

  Browser compatibility can be viewed: [Can I Use](https://caniuse.com/?search=Proxy)

  The general is as follows:
  - desktop: Except IE browser, other browsers are basically compatible.
  - mobile: ios10+、android5+
</details>

<details>
  <summary>Must sub applications support cross-domain?</summary>
  yes!

  If it is a development environment, you can set headers in webpack-dev-server to support cross-domain.

  ```js
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
  ```

  If it is a production environment, you can support cross-domain through [Configuration nginx](https://segmentfault.com/a/1190000012550346).

</details>

<details>
  <summary>Does it support vite?</summary>
  
  Yes, please see [adapt vite](https://zeroing.jd.com/micro-app/docs.html#/zh-cn/other?id=_3%e3%80%81%e9%80%82%e9%85%8dvite) for details.
</details>

# License
micro-app base on [MIT](https://github.com/micro-zoe/micro-app/blob/master/LICENSE) license
