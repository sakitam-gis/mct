import { describe, test, expect, beforeAll } from 'vitest';
import { Mercantile, Tile } from '../src';

beforeAll(async () => {
  console.log(`[Mercantile]: start testing..`);
});

describe('Mercantile', async () => {
  test('tiles', async () => {
    const tiles = Mercantile.tiles(-105, 39.99, -104.99, 40, [14]);

    const targets = [new Tile(3413, 6202, 14), new Tile(3413, 6203, 14)];

    expect(tiles.filter((t) => targets.findIndex((tar) => t.equals(tar)) > -1).length).toEqual(2);
  });

  test('tiles clip', async () => {
    const tiles1 = Mercantile.tiles(-181.0, 0.0, -170.0, 10.0, [2], true);
    const tiles2 = Mercantile.tiles(-180.0, 0.0, -170.0, 10.0, [2]);

    expect(tiles1.filter((t, idx) => t.equals(tiles2[idx])).length).toEqual(tiles1.length);
  });
});
