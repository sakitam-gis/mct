import Constant from './Constant';

export default class LngLatBBox {
  private west: number;
  private south: number;
  private east: number;
  private north: number;

  constructor(west: number, south: number, east: number, north: number) {
    this.west = west;
    this.south = south;
    this.east = east;
    this.north = north;
  }

  public getEast() {
    return this.east;
  }

  public getNorth() {
    return this.north;
  }

  public getSouth() {
    return this.south;
  }

  public getWest() {
    return this.west;
  }

  public setEast(east: number) {
    this.east = east;
    return this;
  }

  public setNorth(north: number) {
    this.north = north;
    return this;
  }

  public setSouth(south: number) {
    this.south = south;
    return this;
  }

  public setWest(west: number) {
    this.west = west;
    return this;
  }

  public equals(o: LngLatBBox) {
    if (o === this) {
      return true;
    }

    return (
      Constant.closeTo(o.getEast(), this.getEast()) &&
      Constant.closeTo(o.getNorth(), this.getNorth()) &&
      Constant.closeTo(o.getWest(), this.getWest()) &&
      Constant.closeTo(o.getSouth(), this.getSouth())
    );
  }
}
