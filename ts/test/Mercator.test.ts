import { describe, test, expect, beforeAll } from 'vitest';
import { Mercator, LngLat } from '../src';

beforeAll(async () => {
  console.log(`[Mercator]: start testing..`);
});

describe('Mercator', async () => {
  test('get', async () => {
    const mercator = new Mercator(-8366731.739810849, -1655181.9927159154);
    expect(mercator.getLng()).toBeCloseTo(-75.15963, 16);
    expect(mercator.getLat()).toBeCloseTo(-14.704620000000013, 16);
    expect(mercator.getX()).toBeCloseTo(-8366731.739810849, 16);
    expect(mercator.getY()).toBeCloseTo(-1655181.9927159154, 16);
  });

  test('formLngLat', async () => {
    const lngLat = new LngLat(-75.15963, -14.704620000000013, true);
    const mc = Mercator.formLngLat(lngLat);
    expect(mc.equals(new Mercator(-8366731.739810849, -1655181.9927159154))).toBe(true);
  });

  test('toLngLat', async () => {
    const mercator = new Mercator(-8366731.739810849, -1655181.9927159154);
    const lngLat = new LngLat(-75.15963, -14.704620000000013);

    expect(Mercator.toLngLat(mercator).equals(lngLat)).toBe(true);
  });

  test('equals', async () => {
    const mercator = new Mercator(0.5, 0.5);
    const mercator1 = new Mercator(0.5, 0.5);
    const mercator2 = new Mercator(0.4, 0.4);

    expect(mercator.equals(mercator1)).toBe(true);
    expect(mercator.equals(mercator2)).toBe(false);

    mercator2.setX(0.5).setY(0.5);

    expect(mercator.equals(mercator2)).toBe(true);
  });
});
