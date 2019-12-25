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

// 查询数据库文章内容，传入 issue 表示找对应该期内容，否则全部
export interface DBConditions {
  issue?: string;
}

// 查询数据库文章内容时，对应只展示下面几个字段
export interface DBConfig {
  _id: boolean;
  category: boolean;
  content: boolean;
  issue?: boolean;
}
