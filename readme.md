🍺 项目前台使用 React 服务端渲染，并且全部使用 Hooks 语法来完成。后台使用 Koa 的上层框架 egg.js。


### 1.后台service启动方式
egg.js不需要使用pm2监控 ， 使用命令行就可以执行了
生产环境
启动时需注意先先停止掉7001（运行的服务）在npm run start 才能正常启动；
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
使用pm2管理 
```shell
pm2 list pm2 restart all 即可
```
```
yarn serve #rm -rf build && next build && next start
```
生产环境这里需要使用pm2 来管理运行的项目，pm2 list 查看列表，我们这里将运行的命令添加到pm2 中 
在对应的项目目录下，运行命令如下;

```
pm2 start npm --name "my-next" -- run server;
``
这里同样需要先停止掉后端运行的服务才能启动项目,需要注意的是，运行这个项目需要时间 ，我们不能立马看到项目启动成功，需要在后台等待一会儿在进行测试；
```
### 3.后台生产环境启动方式

后台管理网站使用的react 这里是属于前端静态目录资源 走nginx 代理，所以打包后放到nginx下管理就行 目录自己定义就可以
```shell
rm -rf /home/hexo/build && yarn build &&  && mv build/ /home/hexo/
```
