import glob from "glob";
import Router from "koa-router";
import Application, {BaseContext, Next} from "koa";


export interface Config {
  method: string
  route: string
  handlers: Array<(ctx: BaseContext, next?: Next) => Promise<void>>
}


export default (app: Application) => {
  glob(`${__dirname}/*`, { ignore: "**/index.js" }, (err, matches) => {
    if (err) {
      throw err;
    }

    matches.forEach((mod) => {
      const router = require(`${mod}/router`);

      const routes = router.default;
      const baseUrl = router.baseUrl;
      const instance = new Router({ prefix: baseUrl });

      routes.forEach((config: Config) => {
        const { method = "", route = "", handlers = [] } = config;

        const lastHandler = handlers.pop();

        instance[method.toLowerCase()](route, ...handlers, async function (ctx: BaseContext) {
            return await lastHandler(ctx);
          }
        );

        app.use(instance.routes()).use(instance.allowedMethods());
      });
    });
  });
};
