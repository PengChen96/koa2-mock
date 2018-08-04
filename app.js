const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const cors = require('koa2-cors');
app.use(cors());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, world!</h1>';
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

taxController = require('./controllers/tax');
app.use(taxController.routes());

app.listen(3000);
console.log('app started at port 3000...')