import { describe, test, expect, beforeAll } from 'vitest';
import { Constant } from '../src';

beforeAll(async () => {
  console.log(`[Constant]: start testing..`);
});

describe('Constant', async () => {
  test('toRadians', async () => {
    const rad = Constant.toRadians(45);
    expect(rad).toBeCloseTo(0.7853981633974483, 16);
  });

  test('toRadians', async () => {
    const rad = Constant.toDegrees(0.7853981633974483);
    expect(rad).toBeCloseTo(45, 16);
  });

  test('closeTo', async () => {
    const r = Constant.closeTo(0.1 + 0.2, 0.3);
    expect(r).toEqual(true);
  });

  test('calcDistance', async () => {
    const l1 = Constant.calcDistance(-180, -90, 180, 90);
    expect(l1).toBeCloseTo(20037508.342789244, 16);
    const l2 = Constant.calcDistance(-90, -45, 90, 45);
    expect(l2).toBeCloseTo(20037508.342789244, 16);
  });

  test('range', async () => {
    const r1 = Constant.range(3);
    expect(r1).toStrictEqual([0, 1, 2]);
    const r2 = Constant.range(3, 6);
    expect(r2).toStrictEqual([3, 4, 5]);
    const r3 = Constant.range(3, 0, -1);
    expect(r3).toStrictEqual([3, 2, 1]);
  });

  test('minmax', async () => {
    const r1 = Constant.minmax(1);
    expect(r1).toEqual([0, 1]);
    const r2 = Constant.minmax(0);
    expect(r2).toEqual([0, 0]);
    expect(() => Constant.minmax(-1)).toThrowError('zoom must be a positive integer');
  });
});
