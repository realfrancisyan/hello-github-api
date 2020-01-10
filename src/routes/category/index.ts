import { getCategory, getCategoryByIssue, getTags } from './controller';

const Router = (Router: any) => {
  const router = new Router({
    prefix: '/category'
  });

  router
    .get('/tags', getTags)
    .get('/:name', getCategory)
    .get('/:name/:issue', getCategoryByIssue);

  return router;
};

export default Router;
