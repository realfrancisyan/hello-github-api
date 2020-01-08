import * as Koa from 'koa';

export const handleError = async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};
