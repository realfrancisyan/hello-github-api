import HgModel from '../../../models/hg';
import { Conditions } from './interface';

export const _getCategory = async (name: string, issue?: number) => {
  const conditions: Conditions = { category: name }; // 查询条件
  if (issue) {
    conditions.issue = issue;
  }

  const config = {
    _id: false,
    category: true,
    content: true,
    issue: true
  };

  const categories = await HgModel.find(conditions, config);

  const posts = categories.map(item => {
    const post = {
      issue: item['issue'],
      content: item['content']
    };

    return post;
  });

  return posts;
};
