import { DateTime } from "luxon";

export const parseSeconds = (date) => {
  const toDate = DateTime.fromISO(date)
  const fromDate = toDate.startOf('day')

  return toDate.diff(fromDate).shiftTo('seconds').seconds
}