import moment from 'moment';

export const dateFormat = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const getLastNDays = (n) => {
  const dates = [];
  for (let i = n - 1; i >= 0; i--) {
    dates.push(moment().subtract(i, 'days').format('DD/MM/YYYY'));
  }
  return dates;
};
