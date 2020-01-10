import { getCategory, getCategoryByIssue, getTags } from './controller';

const Router = (Router: any) => {
  const router = new Router({
    prefix: '/category'
  });

  router
    .get('/tags', getTags)
    .get('/:tag', getCategory)
    .get('/:tag/:issue', getCategoryByIssue);

  return router;
};

export default Router;
