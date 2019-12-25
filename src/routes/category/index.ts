import { getCategory, getCategoryByIssue } from './controller';

const Router = (Router: any) => {
  const router = new Router({
    prefix: '/category'
  });

  router.get('/:name', getCategory).get('/:name/:issue', getCategoryByIssue);

  return router;
};

export default Router;
