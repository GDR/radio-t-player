
export const getClickedPercent = (offsetX, width) => {
  return Math.min(Math.max((offsetX / width * 100), 0), 100);
};