# hello-github-api

使用 `Koa`、`TypeScript` 和 `Cheerio` 构建的 [HelloGithub](https://github.com/521xueweihan/HelloGitHub) 非官方 API 服务。

**免责声明**：此服务仅作学习之用，不可用于其他用途。

## API Endpoint

### 1. [https://hello.curve.to/issue](https://hello.curve.to/issue)

- `/` : 展示往期所有文章
- `/:id` : 展示指定一期的文章
- `/random` : 随机展示某一期文章
- `/counts` : 列出最新一期的 id，如 `44`

以下 api 可直接爬取内容，不读取数据库：

- `/direct/:id` : 展示指定一期的文章
- `/direct/random` : 随机展示某一期文章
- `/direct/counts` : 列出最新一期的 id，如 `44`

#### 示例

展示第 44 期的所有内容

请求 URL：[https://hello.curve.to/issue/44](https://hello.curve.to/issue/44)

```json
{
  "status": 200,
  "message": "SUCCESS",
  "data": {
    "issue": 44,
    "body": [
      {
        "category": "C",
        "content": [
          {
            "title": {
              "desc": "1、scrcpy：一款可以用电脑显示并控制 Android 手机的开源工具。连接方便使用方便，手机无需 root、无需安装任何应用。支持 USB、Wi-Fi 两种方式连接，支持 Windows、macOS、Linux 三种操作系统。注意电脑端需要安装 adb 工具",
              "links": [
                {
                  "text": "scrcpy",
                  "href": "https://github.com/Genymobile/scrcpy"
                }
              ]
            },
            "imgUrl": [
              "https://raw.githubusercontent.com/521xueweihan/img/master/hellogithub/44/img/scrcpy.jpg"
            ]
          }
        ]
      }
    ]
  },
  "time": "2019-12-26 03:23:12"
}
```

### 2. [https://hello.curve.to/category](https://hello.curve.to/category)

- `/:tag` : 展示指定分类的所有内容
- `/:tag/:issue` : 展示指定某一期和某一分类的所有内容
- `/tags` : 展示所有分类标签

目前所有分类标签如下：

```
css
javascript
python
其它
开源书籍
go
java
php
c#
swift
c
c++
objective-c
ruby
机器学习
kotlin
rust
教程
```

#### 示例

展示第七期的 `C` 分类的所有内容

请求 URL：[https://hello.curve.to/category/c/7](https://hello.curve.to/category/c/7)

```json
{
  "status": 200,
  "message": "SUCCESS",
  "data": {
    "category": "C",
    "body": [
      {
        "issue": 7,
        "content": [
          {
            "title": {
              "desc": "1、BaiduPCS：C 写的百度网盘命令行工具，在线文档",
              "links": [
                {
                  "text": "BaiduPCS",
                  "href": "https://github.com/GangZhuo/BaiduPCS"
                },
                {
                  "text": "在线文档",
                  "href": "https://github.com/GangZhuo/BaiduPCS/wiki/BaiduPCS-%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8"
                }
              ]
            }
          }
        ]
      }
    ]
  },
  "time": "2019-12-26 03:26:36"
}
```

## 本地运行

本项目使用 `Koa` 作为后端框架，请确保先安装 `NodeJS`，然后执行以下命令：

```shell
npm install
npm start
```

## 问题和建议

如果你在使用中发现问题，或有建议，欢迎提出

如果此项目对你有帮助，欢迎 star、fork
