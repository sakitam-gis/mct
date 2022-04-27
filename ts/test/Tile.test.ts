import { describe, test, expect, beforeAll } from 'vitest';
import { Tile, LngLat, LngLatBBox, BBox } from '../src';

beforeAll(async () => {
  console.log(`[Tile]: start testing..`);
});

describe('Tile', async () => {
  test('get', async () => {
    const tile = new Tile(0, 0, 0);
    const xyz = new Map();
    xyz.set('x', 0);
    xyz.set('y', 0);
    xyz.set('z', 0);
    expect(tile.getXYZ()).toEqual(xyz);
  });

  test('ul', async () => {
    const tile = new Tile(486, 332, 10);
    const p = new LngLat(-9.140625, 53.33087298301705);
    expect(tile.ul().equals(p)).toBe(true);
  });

  test('lr', async () => {
    const tile = new Tile(486, 332, 10);
    const p = new LngLat(-8.7890625, 53.120405283106564);
    expect(tile.lr().equals(p)).toBe(true);
  });

  test('getBBox', async () => {
    const tile = new Tile(486, 332, 10);
    const b = new BBox(
      -1017529.7205322646,
      7005300.768279833,
      -978393.9620502543,
      7044436.526761843,
    );
    expect(tile.getBBox().equals(b)).toBe(true);
  });

  test('getLngLatBbox', async () => {
    const tile = new Tile(486, 332, 10);
    const b = new LngLatBBox(-9.140625, 53.120405283106564, -8.7890625, 53.33087298301705);
    expect(tile.getLngLatBbox().equals(b)).toBe(true);
  });

  test('parent', async () => {
    const tile = new Tile(486, 332, 10);
    const t = new Tile(243, 166, 9);
    expect(tile.parent()?.equals(t)).toBe(true);

    const t1 = new Tile(121, 83, 8);
    expect(tile.parent(8)?.equals(t1)).toBe(true);
  });

  test('parent error', async () => {
    const tile = new Tile(486, 332, 10);
    expect(() => tile.parent(11)).toThrowError(
      '[mct]: zoom must be an number and less than that of the tile',
    );
  });

  test('children', async () => {
    const [x, y, z] = [243, 166, 9];
    const tile = new Tile(x, y, z);
    const ts = tile.children();
    expect(ts.length).toEqual(4);
    const rs = [
      new Tile(2 * x, 2 * y, z + 1),
      new Tile(2 * x + 1, 2 * y, z + 1),
      new Tile(2 * x + 1, 2 * y + 1, z + 1),
      new Tile(2 * x, 2 * y + 1, z + 1),
    ];

    expect(ts.filter((t, idx) => t.equals(rs[idx])).length).toEqual(4);

    const ts1 = tile.children(11);
    const targets = [
      new Tile(972, 664, 11),
      new Tile(973, 664, 11),
      new Tile(973, 665, 11),
      new Tile(972, 665, 11),
      new Tile(974, 664, 11),
      new Tile(975, 664, 11),
      new Tile(975, 665, 11),
      new Tile(974, 665, 11),
      new Tile(974, 666, 11),
      new Tile(975, 666, 11),
      new Tile(975, 667, 11),
      new Tile(974, 667, 11),
      new Tile(972, 666, 11),
      new Tile(973, 666, 11),
      new Tile(973, 667, 11),
      new Tile(972, 667, 11),
    ];

    expect(ts1.filter((t, idx) => t.equals(targets[idx])).length).toEqual(16);
  });

  test('children error', async () => {
    const tile = new Tile(486, 332, 10);
    expect(() => tile.children(9)).toThrowError(
      '[mct]: zoom must be an number and greater than that of the tile',
    );
  });

  test('quadkey', async () => {
    const tile = new Tile(486, 332, 10);
    expect(tile.quadkey()).toBe('0313102310');

    const tile1 = new Tile(0, 0, 0);
    expect(tile1.quadkey()).toBe('');
  });

  test('formQuadkey', async () => {
    const tile = new Tile(486, 332, 10);
    expect(Tile.formQuadkey('0313102310').equals(tile)).toBe(true);
  });

  test('isValid', async () => {
    const tile = new Tile(486, 332, 10);
    expect(tile.isValid()).toBe(true);
    expect(new Tile(-1, 0, 1).isValid()).toBe(false);
    expect(new Tile(0, -1, 1).isValid()).toBe(false);
    expect(new Tile(-1, -1, 1).isValid()).toBe(false);
  });

  test('neighbors', async () => {
    const tile = new Tile(0, 0, 0);
    expect(tile.neighbors().length).toBe(0);

    const tile1 = new Tile(243, 166, 9);
    const tiles = tile1.neighbors();
    expect(tiles.length).toBe(8);

    const tile2 = new Tile(0, 166, 9);

    const tiles2 = tile2.neighbors();

    expect(tiles2.length).toBe(5);
  });

  test('set', async () => {
    const tile = new Tile(1, 0, 1);
    const xyz = new Map();
    xyz.set('x', 1);
    xyz.set('y', 0);
    xyz.set('z', 1);
    expect(tile.getXYZ()).toEqual(xyz);
    tile.setY(1);
    tile.setX(1);
    tile.setZoom(1);
    const xyz1 = new Map();
    xyz1.set('x', 1);
    xyz1.set('y', 1);
    xyz1.set('z', 1);
    expect(tile.getXYZ()).toEqual(xyz1);
  });

  test('equals', async () => {
    const tile1 = new Tile(1, 1, 1);
    const tile2 = new Tile(1, 1, 1);
    const tile3 = new Tile(1, 1, 2);
    expect(tile1.equals(tile2)).toEqual(true);
    expect(tile1.equals(tile3)).toEqual(false);
  });
});
