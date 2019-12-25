import { respond } from '../../lib/respond';
import HgModel from '../../models/hg';

// 获取某个分类下所有内容
export const getCategory = async (ctx: any) => {
  let { name } = ctx.params; // 分类名称

  const categories = await HgModel.find(
    { category: name },
    {
      _id: false,
      category: true,
      content: true,
      issue: true
    }
  );

  const result = categories.map(item => {
    const post = {
      issue: item['issue'],
      category: item['category'].toUpperCase(),
      content: item['content']
    };

    return post;
  });

  ctx.body = respond(result);
};
