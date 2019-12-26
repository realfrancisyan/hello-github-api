import * as moment from 'moment';

const responseType = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};

export const respond = (data: any = '', status = 200) => {
  return {
    status,
    message: status === 200 ? responseType.SUCCESS : responseType.FAIL,
    data,
    time: moment().format('YYYY-MM-DD HH:mm:ss')
  };
};
