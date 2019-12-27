import { respond } from '../../lib/respond';
import { _getCategory } from './lib/funcs';

// 获取某个分类下所有内容
export const getCategory = async (ctx: any) => {
  let { name } = ctx.params; // 分类名称

  const posts = await _getCategory(name);

  const result = {
    category: name.toUpperCase(),
    body: posts
  };

  ctx.body = respond(result);
};

// 按某一期获取某个分类下所有内容
export const getCategoryByIssue = async (ctx: any) => {
  let { name, issue } = ctx.params; // 分类名称

  // 异常处理
  if (isNaN(issue)) {
    ctx.body = respond('Issue is invalid.', 401);
    return;
  }

  const posts = await _getCategory(name, issue);

  const result = {
    category: name.toUpperCase(),
    body: posts
  };

  ctx.body = respond(result);
};
