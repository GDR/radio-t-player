import { formatSeconds } from "@/utils/playerUtils";

describe('playerUtils', () => {
  it('Should format time', () => {
    const formatted = [
      formatSeconds(0),
      formatSeconds(59),
      formatSeconds(60),
      formatSeconds(3600),
      formatSeconds(86400),
      formatSeconds(360000),
    ];

    expect(formatted)
      .toEqual([
        '00:00:00',
        '00:00:59',
        '00:01:00',
        '01:00:00',
        '24:00:00',
        '100:00:00',
      ]);
  })
})