import { describe, test, expect, beforeAll } from 'vitest';
import { LngLatBBox } from '../src';

beforeAll(async () => {
  console.log(`[LngLatBBox]: start testing..`);
});

describe('LngLatBBox', async () => {
  test('get', async () => {
    const bbox = new LngLatBBox(-180, -90, 180, 90);
    expect(bbox.getWest()).toBeCloseTo(-180, 16);
    expect(bbox.getSouth()).toBeCloseTo(-90, 16);
    expect(bbox.getEast()).toBeCloseTo(180, 16);
    expect(bbox.getNorth()).toBeCloseTo(90, 16);
  });

  test('set', async () => {
    const bbox = new LngLatBBox(-180, -90, 180, 90);
    bbox.setWest(-90);
    expect(bbox.getWest()).toBeCloseTo(-90, 16);
    bbox.setSouth(-45);
    expect(bbox.getSouth()).toBeCloseTo(-45, 16);
    bbox.setEast(90);
    expect(bbox.getEast()).toBeCloseTo(90, 16);
    bbox.setNorth(45);
    expect(bbox.getNorth()).toBeCloseTo(45, 16);
  });

  test('equals', async () => {
    const bbox1 = new LngLatBBox(-180, -90, 180, 90);
    const bbox2 = new LngLatBBox(-90, -45, 90, 45);
    bbox1.setWest(-90).setSouth(-45).setEast(90).setNorth(45);

    expect(bbox1.equals(bbox2)).toEqual(true);
  });
});
