import moment from 'moment';

export const getClickedPercent = (offsetX, width) => {
  return Math.min(Math.max((offsetX / width * 100), 0), 100);
};

export const formatSecondsToTime = (seconds) => {
  return moment().startOf('day')
    .seconds(seconds)
    .format('HH:mm:ss')
};