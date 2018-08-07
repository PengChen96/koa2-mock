/* global require */
/* global __dirname */

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const fs = require('fs');
const cors = require('koa2-cors');
app.use(cors());
// views
const indexView = require('./views/index.js');

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  ctx.response.type = 'text/html';
  ctx.response.body = indexView({name: '张三'});
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  await next();
});

router.post('/read', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/json/index.json`, (err, data) => {
      if (err) {
        reject('error');
      } else {
        resolve(data.toString());
      }
    });
  }).then((result) => {
    ctx.response.body = result;
  }).catch((error) => {
    console.log(error);
  });
});


app.use(router.routes());

const testController = require('./controllers/test');
app.use(testController.routes());

app.listen(3000);
console.log('app started at port 3000...');

// 同步读取文件
// const result = fs.readFileSync(`${__dirname}/json/test.json`).toString();
// const resp = JSON.parse(result);
// console.log(resp.name);

// 异步读取文件
new Promise((resolve, reject) => {
  fs.readFile(`${__dirname}/json/index.json`, 'utf8', (err, data) => {
    if (err) {
      reject('error');
    } else {
      resolve(data.toString());
    }
  });
}).then((result) => {
  const resp = JSON.parse(result);
  resp.forEach((item) => {
    // router
    router[item.method](item.URI, async (ctx, next) => {
      ctx.response.body = item.response;
    });
  });
}).catch((error) => {
  console.log(error);
});