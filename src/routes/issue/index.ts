import {
  getIssue,
  getIssueCounts,
  getRandomIssue,
  getDirectIssue
} from './controller';

const Router = (Router: any) => {
  const router = new Router({
    prefix: '/issue'
  });

  router
    .get('/counts', getIssueCounts)
    .get('/random', getRandomIssue)
    .get('/direct/:id', getDirectIssue)
    .get('/:id', getIssue);

  return router;
};

export default Router;
