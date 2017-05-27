const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const URLON = require('urlon');
const jsf = require('json-schema-faker');

const router = new Router({prefix: '/api/v1'});

router
  .all('/raw/:jsonString(.*)', ctx => {
    ctx.body = URLON.parse(ctx.params.jsonString);
  })
  .all('/schema/:jsonString(.*)', ctx => {
    const schema = URLON.parse(ctx.params.jsonString);
    ctx.body = jsf(schema);
  })
;

const app = new Koa();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('Listening on port 3000');

module.exports = app;
