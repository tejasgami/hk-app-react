import * as moment from 'moment';

export const getGmt1Now = () => {
  return moment().utcOffset(1);
};

export const getGmt1NowTimeStamp = () => {
  return getGmt1Now().valueOf();
};

export const lastSyncTime = () => {
  return getGmt1Now().format('HH:mm');
};

export const tableDateTime = (date) => {
  return moment(date).format('DD.MM.YYYY HH:mm');
};
