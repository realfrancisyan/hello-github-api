import { respond } from '../../lib/respond';
import { _getIssueCounts, _getIssue, getCategoriesFromDB } from './lib/funcs';
import { getRandomInt } from '../../lib/common';

// 获取内容
export const getIssue = async (ctx: any) => {
  let { id } = ctx.params; // 第几期

  // const categories = await _getIssue(id);
  const categories = await getCategoriesFromDB(+id);

  const result = {
    issue: +id,
    body: categories
  };
  ctx.body = respond(result);
};

// 获取内容（直接爬取，不读取数据库）
export const getDirectIssue = async (ctx: any) => {
  let { id } = ctx.params; // 第几期

  const categories = await _getIssue(id);

  const result = {
    issue: +id,
    body: categories
  };
  ctx.body = respond(result);
};

// 获取随机内容
export const getRandomIssue = async (ctx: any) => {
  const counts = await _getIssueCounts(); // 获取期数总数
  const id = getRandomInt(1, counts) + ''; // 获取随机期数

  const categories = await _getIssue(id);

  const result = {
    issue: +id,
    body: categories
  };
  ctx.body = respond(result);
};

// 获取期数总数
export const getIssueCounts = async (ctx: any) => {
  const counts = await _getIssueCounts();
  ctx.body = respond(counts);
};
