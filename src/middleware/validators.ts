import User from "../models/users";
import { getToken } from "../utils/auth";
import { verify } from "jsonwebtoken";
import { Context, Next } from "koa";
import config from "../config";

export async function ensureUser(ctx: Context, next: Next) {
  const token = getToken(ctx);

  if (!token) {
    ctx.throw(401);
  }

  let decoded = null;
  try {
    decoded = verify(token, config.token);
  } catch (err: any) {
    ctx.throw(401);
  }

  ctx.state.user = await User.findById(decoded.id, "-password");
  if (!ctx.state.user) {
    ctx.throw(401);
  }

  return next();
}
