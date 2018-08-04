const router = require('koa-router')();

router.get('/test', async (ctx, next) => {
    ctx.response.body = {
        name: '张三',
        age: '18'
    };
});

module.exports = router;