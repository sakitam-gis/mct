import Constant from './Constant';
import Mercator from './Mercator';

export default class LngLat {
  private lng: number;
  private lat: number;

  private x: number;

  private y: number;

  private mercatorX: number;

  private mercatorY: number;

  constructor(lng: number, lat: number, clip = false) {
    this.setLng(lng, clip);
    this.setLat(lat, clip);
  }

  public getLng() {
    return this.lng;
  }

  public setLng(lng: number, clip = false) {
    this.lng = lng;

    if (clip) {
      if (this.lng > 180.0) {
        this.lng = 180.0;
      } else if (this.lng < -180.0) {
        this.lng = -180.0;
      }
    }

    this.x = Constant.RE * Constant.toRadians(this.lng);

    this.mercatorX = this.lng / 360.0 + 0.5; // 0-1
    return this;
  }

  public getLat() {
    return this.lat;
  }

  public setLat(lat: number, clip = false) {
    this.lat = lat;

    if (clip) {
      if (this.lat > 90.0) {
        this.lat = 90.0;
      } else if (this.lat < -90.0) {
        this.lat = -90.0;
      }
    }

    this.y = Constant.RE * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * Constant.toRadians(this.lat)));

    const s = Math.sin(Constant.toRadians(this.lat));

    this.mercatorY = 0.5 - (0.25 * Math.log((1.0 + s) / (1.0 - s))) / Math.PI; // 0-1
    return this;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getMercatorX() {
    return this.mercatorX;
  }

  public getMercatorY() {
    return this.mercatorY;
  }

  public static formMercator(xy: Mercator, clip = false): LngLat {
    return new LngLat(xy.getLng(), xy.getLat(), clip);
  }

  public static toMercator(coordinates: LngLat): Mercator {
    return Mercator.formLngLat(coordinates);
  }

  public equals(o: LngLat): boolean {
    if (o === this) {
      return true;
    }

    return (
      Constant.closeTo(o.getLng(), this.getLng()) && Constant.closeTo(o.getLat(), this.getLat())
    );
  }
}
