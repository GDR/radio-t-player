import { Duration } from 'luxon';

export const getClickedPercent = (offsetX, width) => {
  return Math.min(Math.max((offsetX / width * 100), 0), 100);
};

export const formatSeconds = (seconds) => {
  return Duration.fromMillis(seconds * 1000).toFormat('hh:mm:ss')
};