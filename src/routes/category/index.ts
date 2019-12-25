import { getCategory } from './controller';

const Router = (Router: any) => {
  const router = new Router({
    prefix: '/category'
  });

  router.get('/:name', getCategory);

  return router;
};

export default Router;
