import { respond } from '../../lib/respond';
import { _getCategory, _getTags } from './lib/funcs';
import * as Koa from 'koa';

// 获取某个分类下所有内容
export const getCategory = async (ctx: Koa.Context) => {
  const { tag } = ctx.params; // 分类名称

  const posts = await _getCategory(tag);

  const result = {
    category: tag.toUpperCase(),
    body: posts
  };

  ctx.body = respond(result);
};

// 按某一期获取某个分类下所有内容
export const getCategoryByIssue = async (ctx: Koa.Context) => {
  const { tag, issue } = ctx.params; // 分类名称

  // 异常处理
  if (isNaN(issue)) {
    ctx.body = respond('Issue is invalid.', 401);
    return;
  }

  const posts = await _getCategory(tag, issue);

  const result = {
    category: tag.toUpperCase(),
    body: posts
  };

  ctx.body = respond(result);
};

// 获取所有分类标签
export const getTags = async (ctx: Koa.Context) => {
  const result = await _getTags();
  ctx.body = respond(result);
};
