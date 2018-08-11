/* global require */
/* global __dirname */

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const cfs = require('./common/cfs');
const cors = require('koa2-cors');
app.use(cors());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  await next();
});

app.use(router.routes());

const indexController = require('./controllers/indexController');
app.use(indexController.routes());

app.listen(3000);
console.log('app started at port 3000...');

// 读取的全部json文件数据
router.get('/data/all', async (ctx, next) => {
  let promisy = [];
  let fileArr = [];
  await cfs.readdir(`${__dirname}/json/`).then((results) => {
    fileArr = results;
    results.forEach((fileName) => {
      // 异步读取文件内容
      promisy.push(cfs.readFile(`${__dirname}/json/${fileName}`));
    });
  });
  await Promise.all(promisy).then((results) => {
    let response = [];
    results.forEach((item, index) => {
      response.push({
        fileName: fileArr[index],
        fileData: JSON.parse(item)
      });
    });
    ctx.response.body = response;
  });
});

/************** 扫描文件添加Api **************/
// 扫描json文件夹 读取文件夹下的文件名
cfs.readdir(`${__dirname}/json/`).then((result) => {
  console.log(`扫描到 ${result} 这${result.length}个文件`);
  result.forEach((item) => {
    // 异步读取文件内容
    readFileInitRouter(item);
  });
}).catch((error) => {
  console.log(error);
});

// 异步读取文件内容 初始化路由
const readFileInitRouter = (fileName) => {
  cfs.readFile(`${__dirname}/json/${fileName}`).then((result) => {
    const resp = JSON.parse(result);
    console.log(`[${fileName}] 添加 ${resp.length} 个接口`);
    resp.forEach((item) => {
      // router
      console.log(`[${fileName}] init router 【${item.URI}】`);
      router[item.method](item.URI, async (ctx, next) => {
        ctx.response.body = item.response;
      });
    });
  }).catch((error) => {
    console.log(error);
  });
};
// 同步读取文件
// const result = fs.readFileSync(`${__dirname}/json/test.json`).toString();
// const resp = JSON.parse(result);