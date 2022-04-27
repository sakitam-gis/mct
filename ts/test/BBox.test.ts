import { describe, test, expect, beforeAll } from 'vitest';
import { BBox } from '../src';

beforeAll(async () => {
  console.log(`[BBox]: start testing..`);
});

describe('BBox', async () => {
  test('get', async () => {
    const bbox = new BBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705);
    expect(bbox.getLeft()).toBeCloseTo(-9.140625, 16);
    expect(bbox.getBottom()).toBeCloseTo(53.12040528310657, 16);
    expect(bbox.getRight()).toBeCloseTo(-8.7890625, 16);
    expect(bbox.getTop()).toBeCloseTo(53.33087298301705, 16);
  });

  test('set', async () => {
    const bbox = new BBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705);
    bbox.setLeft(-180);
    bbox.setBottom(-90);
    bbox.setRight(180);
    bbox.setTop(90);
    expect(bbox.getLeft()).toBeCloseTo(-180, 16);
    expect(bbox.getBottom()).toBeCloseTo(-90, 16);
    expect(bbox.getRight()).toBeCloseTo(180, 16);
    expect(bbox.getTop()).toBeCloseTo(90, 16);
  });

  test('equals', async () => {
    const bbox1 = new BBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705);
    const bbox2 = new BBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705);
    const bbox3 = new BBox(-9.040625, 53.12040528310657, -8.7890625, 53.33087298301705);
    expect(bbox1.equals(bbox1)).toEqual(true);
    expect(bbox1.equals(bbox2)).toEqual(true);
    expect(bbox1.equals(bbox3)).toEqual(false);
  });
});
