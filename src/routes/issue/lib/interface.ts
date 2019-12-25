// 内容按序列分类
export interface OrderedItem {
  title?: string;
  code?: object;
  list?: object;
  imgUrl?: string[];
  paragraphs?: string[];
}

// 内容标题
export interface ContentTitle {
  desc: string;
  links?: object[];
}

// 内容代码块
export interface ContentCode {
  block: string;
  language?: string;
}

// 内容
export interface Content {
  category: string;
  content: [];
}
