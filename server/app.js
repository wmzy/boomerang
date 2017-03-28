const path = require('path');
const Koa = require('koa');
const staticServe = require('koa-static');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const URLON = require('URLON');

const router = new Router();

router
  .all('/raw/:jsonString', ctx => {
    ctx.body = URLON.parse(ctx.params.jsonString);
  });

const app = new Koa();

app.use(staticServe(path.resolve(__dirname, '../public')));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('Listening on port 3000');

module.exports = app;
