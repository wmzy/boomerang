const path = require('path');
const Koa = require('koa');
const staticServe = require('koa-static');
const bodyParser = require('koa-bodyparser');


const app = new Koa();

app.use(staticServe(path.resolve(__dirname, '../public')));
app.use(async ctx => {
  ctx.body = {};
});

app.listen(3000);
console.log('Listening on port 3000');

module.exports = app;
