const Koa = require("koa");
const config = require("./config");
const app = new Koa();

app.listen(config.Port, () => {
  console.log(`app start at ${config.Port}`);
});
