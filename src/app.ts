import * as Koa from 'koa';
import * as json from 'koa-json';
import * as bodyParser from 'koa-body';
import applyApiMiddleware from './routes';
import { scheduleGetLatestIssue } from './tasks';
import { handleError } from './middleware/error';

const app = new Koa();

const bodyParserConfig = {
  multipart: true,
  urlencoded: true,
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE']
};

app
  .use(json())
  .use(bodyParser(bodyParserConfig))
  .use(handleError);

// Router Middleware
applyApiMiddleware(app);

const port = 4000;
app.listen(port, () => {
  console.log(`Server has started at http://localhost:${port}`);
  scheduleGetLatestIssue();
});
