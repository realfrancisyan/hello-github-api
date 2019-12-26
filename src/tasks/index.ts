import * as schedule from 'node-schedule';
import {
  _getIssueCountsFromDB,
  _getIssue,
  savePosts
} from '../routes/issue/lib/funcs';

let job: any = null;

// 获取最新一期
const getLatestIssue = async () => {
  const latestIssueInDB = await _getIssueCountsFromDB(); // 获取数据库最新一期

  const latestIssue = latestIssueInDB + 1 + '';

  // 保存内容
  const categories = await _getIssue(latestIssue);
  await savePosts(categories, latestIssue);
};

// 定期获取最新一期
export const scheduleGetLatestIssue = async () => {
  const rule = { hour: 20, minute: 10 }; // repeat every day at 20:10

  console.log('init job - get latest issue');

  job = schedule.scheduleJob(rule, async () => {
    console.log('Beginning get latest issue schedule... ' + new Date());
    getLatestIssue();
  });

  console.log('end init job - get latest issue');
};
