import moment from 'moment';

/**
 * 获取在一定时间段后的时间
 * @param timestamp 间隔时间搓
 * @returns
 */
const getFutureTime = (timestamp: number): string => {
  let nowTimestamp = new Date().getTime();
  return moment(new Date(nowTimestamp + timestamp)).format(
    'yyyy-MM-DD HH:mm:ss',
  );
};

export default getFutureTime;
