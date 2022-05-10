import BBox from './BBox';
import Constant from './Constant';
import LngLat from './LngLat';
import LngLatBBox from './LngLatBBox';

export default class Tile {
  private x: number;
  private y: number;
  private zoom: number;

  public static formQuadkey(qk: string) {
    if (!qk) return new Tile(0, 0, 0);
    let x = 0;
    let y = 0;
    const zoom = qk.length;
    Constant.range(zoom, 0, -1).map(function (i) {
      const mask = 1 << (i - 1);
      switch (parseInt(qk[zoom - i], 0)) {
        case 0:
          break;
        case 1:
          x += mask;
          break;
        case 2:
          y += mask;
          break;
        case 3:
          x += mask;
          y += mask;
          break;
        default:
          throw new Error('Invalid quadkey digit sequence');
      }
    });
    return new Tile(x, y, zoom);
  }

  constructor(x: number, y: number, zoom: number) {
    this.x = x;
    this.y = y;
    this.zoom = zoom;
  }

  public isValid() {
    const z = this.getZoom();
    const x = this.getX();
    const y = this.getY();
    return z >= 0 && 0 <= x && x <= 2 ** z - 1 && 0 <= y && y <= 2 ** z - 1;
  }

  public parent(zoom?: number): Tile | null {
    // 等 0 级瓦片没有父级
    if (this.zoom === 0) return null;
    let z = this.zoom - 1;
    if (zoom !== undefined) {
      if (this.zoom < zoom) {
        throw new Error('[mct]: zoom must be an number and less than that of the tile');
      } else {
        z = zoom;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let rTile: Tile = this;

    while (rTile.getZoom() > z) {
      const { x, y, zoom: zz } = rTile;
      if (x % 2 == 0 && y % 2 == 0) {
        rTile = new Tile(Math.floor(x / 2), Math.floor(y / 2), zz - 1);
      } else if (x % 2 === 0) {
        rTile = new Tile(Math.floor(x / 2), Math.floor((y - 1) / 2), zz - 1);
      } else if (x % 2 !== 0 && y % 2 === 0) {
        rTile = new Tile(Math.floor((x - 1) / 2), Math.floor(y / 2), zz - 1);
      } else {
        rTile = new Tile(Math.floor((x - 1) / 2), Math.floor((y - 1) / 2), zz - 1);
      }
    }
    return rTile;
  }

  public children(zoom?: number): Tile[] {
    let z = this.zoom + 1;
    if (zoom !== undefined) {
      if (this.zoom > zoom) {
        throw new Error('[mct]: zoom must be an number and greater than that of the tile');
      } else {
        z = zoom;
      }
    }

    const tiles: Tile[] = [this];
    while (tiles[0].getZoom() < z) {
      const { x, y, zoom: zz } = tiles.shift() as Tile;
      tiles.push(
        new Tile(x * 2, y * 2, zz + 1),
        new Tile(x * 2 + 1, y * 2, zz + 1),
        new Tile(x * 2 + 1, y * 2 + 1, zz + 1),
        new Tile(x * 2, y * 2 + 1, zz + 1),
      );
    }

    return tiles;
  }

  public quadkey() {
    const { x, y, zoom } = this;
    const digits = new Array(zoom);
    let mask = 1 << (zoom - 1);
    let i, charCode;
    for (i = 0; i < zoom; ++i) {
      charCode = 48;
      if (x & mask) {
        charCode += 1;
      }
      if (y & mask) {
        charCode += 2;
      }
      digits[i] = String.fromCharCode(charCode);
      mask >>= 1;
    }
    return digits.join('');
  }

  public neighbors() {
    const x = this.getX();
    const y = this.getY();
    const z = this.getZoom();
    const [, max] = Constant.minmax(this.getZoom());
    const tiles: Tile[] = [];
    for (const i of [-1, 0, 1]) {
      for (const j of [-1, 0, 1]) {
        if (i === 0 && j === 0) {
          continue;
        } else if (x + i < 0 || y + j < 0) {
          continue;
        } else if (x + i > max || y + j > max) {
          continue;
        } else {
          tiles.push(new Tile(x + 1, y + 1, z));
        }
      }
    }

    return tiles.filter((t) => t.isValid());
  }

  public getXYZ(): Map<string, number> {
    const xyz: Map<string, number> = new Map<string, number>();

    xyz.set('x', this.getX());
    xyz.set('y', this.getY());
    xyz.set('z', this.getZoom());

    return xyz;
  }

  public getX(): number {
    return this.x;
  }

  public setX(x: number) {
    this.x = x;
    return this;
  }

  public getY() {
    return this.y;
  }

  public setY(y: number) {
    this.y = y;
    return this;
  }

  public getZoom() {
    return this.zoom;
  }

  public setZoom(zoom: number) {
    this.zoom = zoom;
    return this;
  }

  /**
   * 返回瓦片左上角的经度和纬度
   */
  public ul() {
    const Z2 = Math.pow(2, this.zoom);
    const lonDeg = (this.x / Z2) * 360.0 - 180.0;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * this.y) / Z2)));
    const latDeg = Constant.toDegrees(latRad);
    return new LngLat(lonDeg, latDeg);
  }

  /**
   * 返回瓦片右下角的经度和纬度
   */
  public lr() {
    const Z2 = Math.pow(2, this.zoom);
    const lonDeg = ((this.x + 1) / Z2) * 360.0 - 180.0;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * (this.y + 1)) / Z2)));
    const latDeg = Constant.toDegrees(latRad);
    return new LngLat(lonDeg, latDeg);
  }

  public getLngLatBbox(): LngLatBBox {
    const ul = this.ul();
    const lr = this.lr();
    return new LngLatBBox(ul.getLng(), lr.getLat(), lr.getLng(), ul.getLat());
  }

  public getBBox(): BBox {
    const tileSize = Constant.CE / Math.pow(2, this.zoom);

    const left = this.x * tileSize - Constant.CE / 2;
    const right = left + tileSize;

    const top = Constant.CE / 2 - this.y * tileSize;
    const bottom = top - tileSize;
    return new BBox(left, bottom, right, top);
  }

  public equals(o: Tile): boolean {
    if (o === this) {
      return true;
    }

    return (
      Constant.closeTo(o.getX(), this.getX()) &&
      Constant.closeTo(o.getY(), this.getY()) &&
      Constant.closeTo(o.getZoom(), this.getZoom())
    );
  }
}
