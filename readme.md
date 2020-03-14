🍺 项目前台使用 React 服务端渲染，并且全部使用 Hooks 语法来完成。后台使用 Koa 的上层框架 egg.js。


### 1.后台生产环境启动方式
egg.js不需要使用pm2监控 ， 使用命令行就可以执行了
生产环境
```shell
yarn start #启动项目
yarn stop #停止项目
```
开发环境
```shell
yarn dev
```
### 2.后台生产环境启动方式
前端博客地址使用的nuxt.js 
开发环境使用命令
```shell
yarn dev
```
生产环境使用命令
```
yarn serve #rm -rf build && next build && next start
```
### 3.后台生产环境启动方式
后台管理网站使用的react 这里是属于前端静态目录资源 走nginx 代理，所以打包后放到nginx下管理就行 目录自己定义就可以
```shell
rm -rf /home/hexo/build && yarn build &&  && mv build/ /home/hexo/
```
