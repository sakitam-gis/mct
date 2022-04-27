import { describe, test, expect, beforeAll } from 'vitest';
import { LngLat } from '../src';

beforeAll(async () => {
  console.log(`[LngLat]: start testing..`);
});

describe('LngLat', async () => {
  test('get', async () => {
    const lngLat = new LngLat(-75.15963, -14.704620000000013);
    expect(lngLat.getLng()).toBeCloseTo(-75.15963, 16);
    expect(lngLat.getLat()).toBeCloseTo(-14.704620000000013, 16);
    expect(lngLat.getX()).toBeCloseTo(-8366731.739810849, 16);
    expect(lngLat.getY()).toBeCloseTo(-1655181.9927159154, 16);
    expect(lngLat.getMercatorX()).toBeCloseTo(0.29122325, 16);
    expect(lngLat.getMercatorY()).toBeCloseTo(0.5413020911682254, 16);
  });

  test('clip', async () => {
    const lngLat = new LngLat(-181.0, 0.0, true);
    expect(lngLat.getLng()).toBeCloseTo(-180, 16);
    expect(lngLat.getLat()).toBeCloseTo(0);
    expect(lngLat.getX()).toBeCloseTo(-20037508.342789244, 16);
    expect(lngLat.getY()).toBeCloseTo(0);
    expect(lngLat.getMercatorX()).toBeCloseTo(0);
    expect(lngLat.getMercatorY()).toBeCloseTo(0.5);
  });

  test('set', async () => {
    const lngLat = new LngLat(-75.15963, -14.704620000000013);

    lngLat.setLng(180);
    lngLat.setLat(0);

    expect(lngLat.getLng()).toBeCloseTo(180);
    expect(lngLat.getLat()).toBeCloseTo(0);
    expect(lngLat.getX()).toBeCloseTo(20037508.342789244, 16);
    expect(lngLat.getY()).toBeCloseTo(0);
    expect(lngLat.getMercatorX()).toBeCloseTo(1);
    expect(lngLat.getMercatorY()).toBeCloseTo(0.5);
  });

  test('equals', async () => {
    const lngLat1 = new LngLat(-75.15963, -14.704620000000013);
    const lngLat2 = new LngLat(10, 20);
    const lngLat3 = new LngLat(10, 21);

    lngLat1.setLng(10).setLat(20);

    expect(lngLat1.equals(lngLat2)).toEqual(true);
    expect(lngLat2.equals(lngLat3)).toEqual(false);
    expect(lngLat1.equals(lngLat3)).toEqual(false);
  });
});
