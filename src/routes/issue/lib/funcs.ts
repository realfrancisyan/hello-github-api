import * as cheerio from 'cheerio';
import { OrderedItem, ContentTitle, ContentCode, Content } from './interface';
import { fetchWithProxy, fetchWithoutProxy } from '../../../lib/fetch';
import { TARGET } from '../../../lib/constants';
import HgModel from '../../../models/hg';
import * as crypto from 'crypto';
import * as moment from 'moment';

// 提取代码块
const getCodeBlock = ($item: Cheerio, isRaw: boolean = false) => {
  let language = ''; // 代码块语言，默认无
  let block = '';
  if (!isRaw) {
    const classNames = $item.attr('class').split(' '); // 提取类名
    if (classNames.length > 1) {
      const type = classNames[1].split('-'); // 类名第二个是代码块语言
      language = type[type.length - 1]; // 提取代码块语言
    }

    // 提取代码块内容
    block = $item.find('pre').text();
  } else {
    block = $item.text();
  }

  const code: ContentCode = { block };
  if (language) code.language = language;

  return code;
};

// 提取列表
const getList = ($: CheerioStatic, $item: Cheerio) => {
  const listItems = $item
    .find('li')
    .get()
    .map(listItem => {
      const $listItem = $(listItem);
      const text = $listItem.text();

      return text;
    });

  const list = {
    items: listItems,
    type: $item.prop('tagName').toLowerCase() === 'ol' ? 'ol' : 'ul'
  };

  return list;
};

// 提取标题内容
const getTitle = ($: CheerioStatic, $item: Cheerio) => {
  const desc = $item.text();

  const links = $item.find('a');
  const title: ContentTitle = { desc };

  if (links.length) {
    title.links = links.get().reduce((filtered, link) => {
      const $link = $(link);
      const text = $link.text();

      let href = $link.attr('href');

      // 删除无用链接
      const linkToRemove =
        'https://hellogithub.com/periodical/statistics/click/?target=';
      if (href.includes(linkToRemove)) {
        href = href.split(linkToRemove).slice(1)[0];
      }

      const obj = {
        text,
        href
      };

      filtered.push(obj);

      return filtered;
    }, []);
  }

  return title;
};

// 判断是否标题内容
const checkIfDesc = (item: string | object) => {
  const isNumber = !isNaN(+item[0]); // 判断是否数字，标题一般带有数字
  const isContainSymbol =
    typeof item === 'string' && item.substring(0, 10).includes('、'); // 是否包含顿号

  const isDesc = isNumber && isContainSymbol;
  return isDesc;
};

// 获取分类内容
export const getCategoryContent = ($: CheerioStatic, $category: Cheerio) => {
  const range = $category.nextUntil('h3'); // 获取分类标题下的内容

  let isEnd = false; // 是否文章末尾
  const content = range.get().reduce((filtered, item) => {
    const $item = $(item);

    // 如果是文章末尾，则不再往下获取内容
    if (isEnd || $item.prop('tagName').toLowerCase() === 'br') {
      isEnd = true;

      return filtered;
    }

    // 提取代码块
    const isRaw = $item.prop('tagName').toLowerCase() === 'pre'; // 检测是否原始代码块，即没有语言标注
    const isCodeBlock = $item.hasClass('highlight') || isRaw; // 检测是否代码块
    if (isCodeBlock) {
      const code = getCodeBlock($item, isRaw);
      filtered.push(code);

      return filtered;
    }

    // 提取列表
    const isList = ['ul', 'ol'].includes($item.prop('tagName').toLowerCase()); // 检测是否列表
    if (isList) {
      const list = getList($, $item);
      filtered.push(list);

      return filtered;
    }

    // 提取图片
    const image = $item.find('img').attr('src');
    if (image) {
      filtered.push(image);
    }

    // 提取标题，过滤返回目录等无效信息
    const desc = $item.text();
    if (typeof desc === 'string') {
      const descStr = desc + '';
      if (descStr && !descStr.includes('返回目录')) {
        // 如果判断为标题，则提取标题
        if (checkIfDesc(descStr)) {
          const title = getTitle($, $item);
          filtered.push(title);
        } else {
          // 否则直接获取内容本身
          filtered.push(desc);
        }
      }
    }

    return filtered;
  }, []);

  return content;
};

// 将原始的分类内容序列化
// 原始的分类内容是一个未被序列化的数组，需要将其再次分类
export const getOrderedContent = (content: []) => {
  let obj: OrderedItem = {};
  const orderedContent = content.reduce((ordered, item: any, index) => {
    if (typeof item === 'object' && item.desc) {
      // 标题内容
      obj.title = item;
    } else if (typeof item === 'object' && item.block) {
      // 代码块
      obj.code = item;
    } else if (typeof item === 'object' && item.type) {
      // 列表
      obj.list = item;
    } else if (typeof item === 'string' && item.startsWith('http')) {
      // 图片链接
      if (!obj.imgUrl) {
        obj.imgUrl = [];
      }

      obj.imgUrl.push(item);
    } else {
      // 其他内容，如段落
      if (!obj.paragraphs) {
        obj.paragraphs = [];
      }
      obj.paragraphs.push(item);
    }

    // 按序列分类
    // 判断是否尽头，尽头就 push
    // 判断下一个是否为标题内容，是就 push
    const nextItem = content[index + 1];
    if (
      index === content.length - 1 ||
      (typeof nextItem === 'object' && nextItem['desc'])
    ) {
      ordered.push(obj);
      obj = {}; // 分类后清空
    }

    return ordered;
  }, []);
  return orderedContent;
};

// 获取所有期数
export const _getIssueCounts = async () => {
  const proxyUrl = `${TARGET}/tree/master/content`;
  const data = await fetchWithProxy(proxyUrl);
  const $ = cheerio.load(await data.text());

  const issues = $('tr')
    .get()
    .map(item => {
      const $tr = $(item);
      const issue = $tr.find('.content span a').text();
      return +issue;
    })
    .filter(item => item && !isNaN(item));

  const lastIssue = issues[issues.length - 1]; // 获取最后一期

  return lastIssue;
};

// 获取所有期数（从数据库读取）
export const _getIssueCountsFromDB = async () => {
  const config = { _id: false, issue: true };
  const result = await HgModel.findOne({}, config).sort({ _id: -1 });

  const lastIssue = result['issue'];
  return lastIssue;
};

// 获取某期内容
export const _getIssue = async (id: string) => {
  id = id.padStart(2, '0'); // 填充 0，如 1 => 01
  const proxyUrl = `${TARGET}/blob/master/content/${id}/HelloGitHub${id}.md`;
  const data = await fetchWithProxy(proxyUrl);
  const $ = cheerio.load(await data.text());

  const categories = $('article h3')
    .get()
    .reduce((filtered, category) => {
      const $category = $(category);
      const title = $category
        .text()
        .trim()
        .split(' ')[0]; // 获取分类标题

      const content = getCategoryContent($, $category); // 获取分类内容
      const orderedContent = getOrderedContent(content); // 将原始的分类内容序列化

      const result = {
        category: title, // 分类标题
        content: orderedContent
      };

      filtered.push(result);

      return filtered;
    }, []);

  return categories;
};

// 保存文章内容
export const savePosts = (categories: object[], issue: string) => {
  return new Promise(async resolve => {
    for (let item of categories) {
      const contentId = crypto.randomBytes(10).toString('hex'); // 生成唯一 id
      const createdAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

      const newItem = JSON.parse(JSON.stringify(item));
      const { category, content } = newItem;

      const post = {
        id: contentId,
        category: category.toLowerCase(),
        content,
        issue,
        createdAt
      };

      // 保存
      const newPost = new HgModel(post);
      await newPost.save();
    }

    resolve();
  });
};

// 从数据库获取内容
export const getCategoriesFromDB = async (issue: string) => {
  // 展示所有记录
  const categories = await HgModel.find(
    { issue },
    {
      _id: false,
      category: true,
      content: true
    }
  );

  const result = categories.map(item => {
    const post = {
      category: item['category'].toUpperCase(),
      content: item['content']
    };

    return post;
  });

  return result;
};

// 遍历所有往期内容，并保存到数据库
export const getCategoriesAndSave = async () => {
  const getCategories = async (issueId: string) => {
    const categories = await _getIssue(issueId);
    await savePosts(categories, issueId);
  };

  const timeout = 2000;

  const loop = (issueId: string) => {
    return new Promise(resolve => {
      setTimeout(async () => {
        await getCategories(issueId);
        console.log('iterating ' + issueId + '...');
        resolve();
      }, timeout);
    });
  };

  const lastIssueId = 44;
  const issues = Array.from({ length: lastIssueId }, (v, i) => i + 1 + '');

  for (let issueId of issues) {
    await loop(issueId);
  }
};
