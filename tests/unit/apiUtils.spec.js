import { DateTime } from "luxon";
import { parseSeconds } from "@/utils/apiUtils";

describe('apiUtils', () => {
  it('Should parse date to seconds', () => {
    const dates = [
      DateTime.local().startOf('day').plus({ minutes: 10 }),
      DateTime.local().startOf('day').plus({ seconds: 10 }),
      DateTime.local().startOf('day').plus({ hours: 10 }),
      DateTime.local().startOf('day').plus({ hours: 1, minutes: 1, seconds: 1}),
    ];

    const parsedDates = dates.map((date) => parseSeconds(date))
    
    expect(parsedDates)
      .toEqual([
        600,
        10,
        36000,
        3661,
      ])
  })
})