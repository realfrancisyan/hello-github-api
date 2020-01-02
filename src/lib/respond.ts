import * as moment from 'moment-timezone';

const responseType = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};

export const respond = (data: any = '', status = 200) => {
  return {
    status,
    message: status === 200 ? responseType.SUCCESS : responseType.FAIL,
    data,
    time: moment()
      .tz('Asia/Beijing')
      .format('YYYY-MM-DD HH:mm:ss')
  };
};
