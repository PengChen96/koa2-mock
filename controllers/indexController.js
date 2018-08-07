/* global require */
/* global module */

const router = require('koa-router')();
// views
const indexView = require('../views/index.js');

router.get('/index', async (ctx, next) => {
  ctx.response.type = 'text/html';
  ctx.response.body = indexView({name: '乔'});
});

module.exports = router;