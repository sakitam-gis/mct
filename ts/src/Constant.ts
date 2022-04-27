export default class Constant {
  /**
   * radius to rad
   */
  public static R2D = 180.0 / Math.PI;

  public static D2R = Math.PI / 180.0;

  /**
   * 地球赤道平均半径
   */
  public static RE = 6378137.0;

  /**
   * 墨卡托投影下最大纬度
   */
  public static MAX_MERCATOR_LAT = 85.051129;

  /**
   * 墨卡托投影下的最大经度
   */
  public static MAX_MERCATOR_LNG = 180.0;

  /**
   * 地球赤道周长
   */
  public static CE = 2 * Math.PI * Constant.RE;

  public static LL_EPSILON = 1e-11;

  public static EPSILON = Number.EPSILON || 1e-14;

  public static closeTo(a: number, b: number) {
    return Math.abs(a - b) < Constant.EPSILON;
  }

  public static toRadians(angdeg: number) {
    return angdeg * Constant.D2R;
  }

  public static toDegrees(angrad: number) {
    return angrad * Constant.R2D;
  }

  public static calcDistance(lon1: number, lat1: number, lon2: number, lat2: number) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    }

    if (
      (lat1 === lat2 && Math.abs(lon1 - lon2) === 360) ||
      (Math.abs(lat1 - lat2) === 360 && lon1 === lon2)
    ) {
      return 0;
    }

    const dLat = Constant.toRadians(lat1 - lat2);
    const sLat = Constant.toRadians(lat1 + lat2);
    const dLon = Constant.toRadians(lon1 - lon2);

    return (
      Constant.RE *
      Constant.ahav(
        Math.min(
          Math.max(
            0,
            Constant.hav(dLat) + (1 - Constant.hav(dLat) - Constant.hav(sLat)) * Constant.hav(dLon),
          ),
          1,
        ),
      )
    );
  }

  public static range(start: number, end?: number, step?: number) {
    let s = start;
    let e = end;
    let dx = step;
    if (e == null) {
      e = s || 0;
      s = 0;
    }
    if (!dx) {
      dx = e < s ? -1 : 1;
    }
    const length = Math.max(Math.ceil((e - s) / dx), 0);
    const range = Array(length);
    for (let idx = 0; idx < length; idx++, s += dx) {
      range[idx] = s;
    }
    return range;
  }

  public static minmax(zoom: number): number[] {
    if (zoom === undefined || zoom === null || zoom < 0) {
      throw new Error('zoom must be a positive integer');
    } else {
      const max = Math.pow(2, zoom);
      return [0, max - 1];
    }
  }
  private static ahav(x: number) {
    return 2 * Math.asin(Math.sqrt(x));
  }

  private static hav(x: number) {
    return Math.pow(Math.sin(0.5 * x), 2);
  }
}
