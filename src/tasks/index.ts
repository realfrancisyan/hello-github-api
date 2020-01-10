import * as schedule from 'node-schedule';
import {
  _getIssueCountsFromDB,
  _getIssue,
  savePosts
} from '../routes/issue/lib/funcs';

// 获取最新一期
const getLatestIssue = async () => {
  const latestIssueInDB = await _getIssueCountsFromDB(); // 获取数据库最新一期
  const latestIssue = `${latestIssueInDB + 1}`;

  // 保存内容
  const categories = await _getIssue(latestIssue);
  await savePosts(categories, latestIssue);

  console.log('end! get latest issue schedule... ' + new Date());
};

// 定期获取最新一期
export const scheduleGetLatestIssue = async () => {
  const rule = { hour: 11, minute: 37 }; // repeat every day at 20:10

  console.log('init job - get latest issue');

  schedule.scheduleJob(rule, async () => {
    console.log('Beginning get latest issue schedule... ' + new Date());
    await getLatestIssue();
  });

  console.log('end init job - get latest issue');
};
