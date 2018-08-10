# koa2-mock

## need to do ##
- [x] 读取json文件
- [x] 页面显示接口信息（字段信息）
- [x] 页面可以查询接口
- [x] 页面可以添加修改接口
- [x] 导入json文件可以查看前后接口差异

### 零. 环境
Koa需要支持ES2015和async function的node v7.6.0或更高版本。
##### node v8.11.1
##### npm v5.6.0

### 一. 安装
```
# 初始化package.json
$ npm init
# 安装Koa
$ npm install koa --save
```
### 二. 开始
##### 新建app.js文件
```
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, world!</h1>';
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.listen(3000);
console.log('app started at port 3000...');
```

##### 启动
```
node app.js
```
##### 访问 [http://localhost:3000](http://localhost:3000)
![](https://user-gold-cdn.xitu.io/2018/4/28/1630c367af6761b5?w=1215&h=184&f=png&s=61801)

### 三. 编写 RESTful API
1. 安装`koa-router`
```
$ npm install koa-router --save
```
2. 代码：
```
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

# 对于任何请求，都会调用该函数处理请求：
app.use(async (ctx, next) => {
   console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
   await next();
});

router.get('/person/info', async (ctx, next) => {
    ctx.response.body = {
        name: '张三',
        age: '18'
    };
});

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
```
3. 如果想要跨域，可以使用`koa2-cors`  
    安装：  
    ```
    $ npm install koa2-cors --save
    ```  
    使用：  
    ```
    const cors = require('koa2-cors');
    app.use(cors());
    ```