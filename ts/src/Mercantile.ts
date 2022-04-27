import Tile from './Tile';
import LngLat from './LngLat';
import Constant from './Constant';

export default class Mercantile {
  public static tile(lng: number, lat: number, zoom: number, clip = false): Tile {
    const lngLat = new LngLat(lng, lat, clip);
    const mercatorX = lngLat.getMercatorX();
    const mercatorY = lngLat.getMercatorY();

    const z = Math.pow(2.0, zoom);

    const xTile =
      mercatorX <= 0.0
        ? 0.0
        : mercatorX >= 1.0
          ? z - 1.0
          : Math.floor((mercatorX + Constant.EPSILON) * z);

    const yTile =
      mercatorY <= 0.0
        ? 0.0
        : mercatorY >= 1.0
          ? z - 1.0
          : Math.floor((mercatorY + Constant.EPSILON) * z);

    return new Tile(xTile, yTile, zoom);
  }

  /**
   * 根据范围生成瓦片
   * @param west
   * @param south
   * @param east
   * @param north
   * @param zooms TODO 注意此处有可能只传单个 zoom, 类型为 int，需要重载
   * @param clip
   * @return
   */
  public static tiles(
    west: number,
    south: number,
    east: number,
    north: number,
    zooms: number[],
    clip = false,
  ): Tile[] {
    const ws = new LngLat(west, south, clip);
    const en = new LngLat(east, north, clip);

    const w = Math.max(-Constant.MAX_MERCATOR_LNG, ws.getLng());
    const s = Math.max(-Constant.MAX_MERCATOR_LAT, ws.getLat());
    const e = Math.min(Constant.MAX_MERCATOR_LNG, en.getLng());
    const n = Math.min(Constant.MAX_MERCATOR_LAT, en.getLat());

    const overlappedTiles: Tile[] = [];

    for (let z = 0; z < zooms.length; z++) {
      const ulTile = Mercantile.tile(w, n, zooms[z], clip);
      const lrTile = Mercantile.tile(
        e - Constant.LL_EPSILON,
        s + Constant.LL_EPSILON,
        zooms[z],
        clip,
      );

      for (let i = ulTile.getX(); i < lrTile.getX() + 1; i++) {
        for (let j = ulTile.getY(); j < lrTile.getY() + 1; j++) {
          overlappedTiles.push(new Tile(i, j, zooms[z]));
        }
      }
    }

    return overlappedTiles;
  }
}
