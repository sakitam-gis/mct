import Constant from './Constant';
import LngLat from './LngLat';

export default class Mercator {
  private x: number;
  private y: number;

  private lng;
  private lat;

  public static formLngLat(lngLat: LngLat): Mercator {
    return new Mercator(lngLat.getX(), lngLat.getY());
  }

  public static toLngLat(xy: Mercator, clip = false): LngLat {
    return new LngLat(xy.getLng(), xy.getLat(), clip);
  }

  constructor(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }

  public getX() {
    return this.x;
  }

  public setX(x: number) {
    this.x = x;

    this.lng = (this.x * Constant.R2D) / Constant.RE;
    return this;
  }

  public getY() {
    return this.y;
  }

  public getLng() {
    return this.lng;
  }

  public getLat() {
    return this.lat;
  }

  public setY(y: number) {
    this.y = y;

    this.lat = (Math.PI * 0.5 - 2.0 * Math.atan(Math.exp(-y / Constant.RE))) * Constant.R2D;
    return this;
  }

  public equals(m: Mercator) {
    if (m === this) {
      return true;
    }
    return Constant.closeTo(this.getX(), m.getX()) && Constant.closeTo(this.getY(), m.getY());
  }
}
