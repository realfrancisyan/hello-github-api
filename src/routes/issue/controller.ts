import { respond } from '../../lib/respond';
import { getRandomInt } from '../../lib/common';
import {
  _getIssueCounts,
  _getIssue,
  getCategoriesFromDB,
  _getIssueCountsFromDB
} from './lib/funcs';
import * as Koa from 'koa';

// 获取内容
export const getIssue = async (ctx: Koa.Context) => {
  let { id } = ctx.params; // 第几期

  // 异常判断
  if (isNaN(id) || +id < 1) {
    ctx.body = respond('Id is invalid.', 401);
    return;
  }

  const categories = await getCategoriesFromDB(id);

  const result = {
    issue: +id,
    body: categories
  };
  ctx.body = respond(result);
};

// 获取随机内容
export const getRandomIssue = async (ctx: Koa.Context) => {
  const counts = await _getIssueCountsFromDB(); // 获取期数总数
  const id = getRandomInt(1, counts) + ''; // 获取随机期数

  const categories = await getCategoriesFromDB(id);

  const result = {
    issue: +id,
    body: categories
  };
  ctx.body = respond(result);
};

// 获取期数总数
export const getIssueCounts = async (ctx: Koa.Context) => {
  const counts = await _getIssueCountsFromDB();
  ctx.body = respond(counts);
};

// 获取所有内容
export const getAllIssues = async (ctx: Koa.Context) => {
  const categories = await getCategoriesFromDB();

  const result = {
    issue: 'all',
    body: categories
  };
  ctx.body = respond(result);
};

/**
 * 以下是直接爬取，不读取数据库
 * direct
 * direct
 * direct
 * direct
 */

// 获取内容（直接爬取，不读取数据库）
export const getDirectIssue = async (ctx: Koa.Context) => {
  let { id } = ctx.params; // 第几期

  // 异常判断
  if (isNaN(id) || +id < 1) {
    ctx.body = respond('Id is invalid.', 401);
    return;
  }

  const categories = await _getIssue(id);

  const result = {
    issue: +id,
    body: categories
  };
  ctx.body = respond(result);
};

// 获取随机内容（直接爬取，不读取数据库）
export const getDirectRandomIssue = async (ctx: Koa.Context) => {
  const counts = await _getIssueCounts(); // 获取期数总数
  const id = getRandomInt(1, counts) + ''; // 获取随机期数

  const categories = await _getIssue(id);

  const result = {
    issue: +id,
    body: categories
  };
  ctx.body = respond(result);
};

// 获取期数总数（直接爬取，不读取数据库）
export const getDirectIssueCounts = async (ctx: Koa.Context) => {
  const counts = await _getIssueCounts();
  ctx.body = respond(counts);
};
