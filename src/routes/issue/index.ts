import {
  getIssue,
  getIssueCounts,
  getRandomIssue,
  getDirectIssue,
  getDirectIssueCounts,
  getDirectRandomIssue,
  getAllIssues
} from './controller';

const Router = (Router: any) => {
  const router = new Router({
    prefix: '/issue'
  });

  router
    .get('/', getAllIssues)
    .get('/counts', getIssueCounts)
    .get('/random', getRandomIssue)
    .get('/:id', getIssue)
    .get('/direct/counts', getDirectIssueCounts)
    .get('/direct/random', getDirectRandomIssue)
    .get('/direct/:id', getDirectIssue);

  return router;
};

export default Router;
