## Mercantile for TS

Spherical mercator coordinate and tile utilities

### Install

```bash
npm i @sakitam-gis/mercantile -S

import { BBox, LngLat, LngLatBBox, Mercator, Mercantile, Tile } from '@sakitam-gis/mercantile'
```

### Usage

#### Main
```ts
// get Tiles from LngLatBBox
const tiles = Mercantile.tiles(-105, 39.99, -104.99, 40, [14]);

const targets = [new Tile(3413, 6202, 14), new Tile(3413, 6203, 14)];

expect(tiles.filter((t) => targets.findIndex((tar) => t.equals(tar)) > -1).length).toEqual(2);

// get Tiles from cliped LngLatBBox
const tiles1 = Mercantile.tiles(-181.0, 0.0, -170.0, 10.0, [2], true);
const tiles2 = Mercantile.tiles(-180.0, 0.0, -170.0, 10.0, [2]);

expect(tiles1.filter((t, idx) => t.equals(tiles2[idx])).length).toEqual(tiles1.length);
```

#### BBox

```ts
const bbox = new BBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705);
// get
expect(bbox.getLeft()).toBeCloseTo(-9.140625, 16);
expect(bbox.getBottom()).toBeCloseTo(53.12040528310657, 16);
expect(bbox.getRight()).toBeCloseTo(-8.7890625, 16);
expect(bbox.getTop()).toBeCloseTo(53.33087298301705, 16);
// set
bbox.setLeft(-180);
bbox.setBottom(-90);
bbox.setRight(180);
bbox.setTop(90);

expect(bbox.getLeft()).toBeCloseTo(-180, 16);
expect(bbox.getBottom()).toBeCloseTo(-90, 16);
expect(bbox.getRight()).toBeCloseTo(180, 16);
expect(bbox.getTop()).toBeCloseTo(90, 16);

// check equals
const bbox1 = new BBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705);
const bbox2 = new BBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705);
const bbox3 = new BBox(-9.040625, 53.12040528310657, -8.7890625, 53.33087298301705);
expect(bbox1.equals(bbox1)).toEqual(true);
expect(bbox1.equals(bbox2)).toEqual(true);
expect(bbox1.equals(bbox3)).toEqual(false);
```

#### LngLatBBox

```ts
// get
const bbox = new LngLatBBox(-180, -90, 180, 90);
expect(bbox.getWest()).toBeCloseTo(-180, 16);
expect(bbox.getSouth()).toBeCloseTo(-90, 16);
expect(bbox.getEast()).toBeCloseTo(180, 16);
expect(bbox.getNorth()).toBeCloseTo(90, 16);
// set
const bbox = new LngLatBBox(-180, -90, 180, 90);
bbox.setWest(-90);
expect(bbox.getWest()).toBeCloseTo(-90, 16);
bbox.setSouth(-45);
expect(bbox.getSouth()).toBeCloseTo(-45, 16);
bbox.setEast(90);
expect(bbox.getEast()).toBeCloseTo(90, 16);
bbox.setNorth(45);
expect(bbox.getNorth()).toBeCloseTo(45, 16);
// check equals
const bbox1 = new LngLatBBox(-180, -90, 180, 90);
const bbox2 = new LngLatBBox(-90, -45, 90, 45);
bbox1.setWest(-90).setSouth(-45).setEast(90).setNorth(45);

expect(bbox1.equals(bbox2)).toEqual(true);
```

#### LngLat

```ts
// get
const lngLat = new LngLat(-75.15963, -14.704620000000013);
expect(lngLat.getLng()).toBeCloseTo(-75.15963, 16);
expect(lngLat.getLat()).toBeCloseTo(-14.704620000000013, 16);
expect(lngLat.getX()).toBeCloseTo(-8366731.739810849, 16);
expect(lngLat.getY()).toBeCloseTo(-1655181.9927159154, 16);
expect(lngLat.getMercatorX()).toBeCloseTo(0.29122325, 16);
expect(lngLat.getMercatorY()).toBeCloseTo(0.5413020911682254, 16);

// clip coordinates
const lngLat = new LngLat(-181.0, 0.0, true);
expect(lngLat.getLng()).toBeCloseTo(-180, 16);
expect(lngLat.getLat()).toBeCloseTo(0);
expect(lngLat.getX()).toBeCloseTo(-20037508.342789244, 16);
expect(lngLat.getY()).toBeCloseTo(0);
expect(lngLat.getMercatorX()).toBeCloseTo(0);
expect(lngLat.getMercatorY()).toBeCloseTo(0.5);

// set
const lngLat = new LngLat(-75.15963, -14.704620000000013);

lngLat.setLng(180);
lngLat.setLat(0);

expect(lngLat.getLng()).toBeCloseTo(180);
expect(lngLat.getLat()).toBeCloseTo(0);
expect(lngLat.getX()).toBeCloseTo(20037508.342789244, 16);
expect(lngLat.getY()).toBeCloseTo(0);
expect(lngLat.getMercatorX()).toBeCloseTo(1);
expect(lngLat.getMercatorY()).toBeCloseTo(0.5);

// check equals
const lngLat1 = new LngLat(-75.15963, -14.704620000000013);
const lngLat2 = new LngLat(10, 20);
const lngLat3 = new LngLat(10, 21);

lngLat1.setLng(10).setLat(20);

expect(lngLat1.equals(lngLat2)).toEqual(true);
expect(lngLat2.equals(lngLat3)).toEqual(false);
expect(lngLat1.equals(lngLat3)).toEqual(false);
```

#### Mercator

```ts
// get
const mercator = new Mercator(-8366731.739810849, -1655181.9927159154);
expect(mercator.getLng()).toBeCloseTo(-75.15963, 16);
expect(mercator.getLat()).toBeCloseTo(-14.704620000000013, 16);
expect(mercator.getX()).toBeCloseTo(-8366731.739810849, 16);
expect(mercator.getY()).toBeCloseTo(-1655181.9927159154, 16);

// get Mercator coordinates from LngLat
const lngLat = new LngLat(-75.15963, -14.704620000000013, true);
const mc = Mercator.formLngLat(lngLat);
expect(mc.equals(new Mercator(-8366731.739810849, -1655181.9927159154))).toBe(true);

// Mercator to LngLat

const mercator = new Mercator(-8366731.739810849, -1655181.9927159154);
const lngLat = new LngLat(-75.15963, -14.704620000000013);

expect(Mercator.toLngLat(mercator).equals(lngLat)).toBe(true);

// check equals
const mercator = new Mercator(0.5, 0.5);
const mercator1 = new Mercator(0.5, 0.5);
const mercator2 = new Mercator(0.4, 0.4);

expect(mercator.equals(mercator1)).toBe(true);
expect(mercator.equals(mercator2)).toBe(false);

mercator2.setX(0.5).setY(0.5);

expect(mercator.equals(mercator2)).toBe(true);
```

#### Tile

```ts
// create Tile and get
const tile = new Tile(0, 0, 0);
const xyz = new Map();
xyz.set('x', 0);
xyz.set('y', 0);
xyz.set('z', 0);
expect(tile.getXYZ()).toEqual(xyz);

// get Tile top-left
const tile = new Tile(486, 332, 10);
const p = new LngLat(-9.140625, 53.33087298301705);
expect(tile.ul().equals(p)).toBe(true);

// get Tile bottom-right
const tile = new Tile(486, 332, 10);
const p = new LngLat(-8.7890625, 53.120405283106564);
expect(tile.lr().equals(p)).toBe(true);

// get Tile bbox
const tile = new Tile(486, 332, 10);
const b = new BBox(
  -1017529.7205322646,
  7005300.768279833,
  -978393.9620502543,
  7044436.526761843,
);
expect(tile.getBBox().equals(b)).toBe(true);

// get Tile LngLatBBox
const tile = new Tile(486, 332, 10);
const b = new LngLatBBox(-9.140625, 53.120405283106564, -8.7890625, 53.33087298301705);
expect(tile.getLngLatBbox().equals(b)).toBe(true);

// get Tile parent Tile
const tile = new Tile(486, 332, 10);
const t = new Tile(243, 166, 9);
expect(tile.parent()?.equals(t)).toBe(true);

const t1 = new Tile(121, 83, 8);
expect(tile.parent(8)?.equals(t1)).toBe(true);

// get Tile children

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

// get Tile quadkey
const tile = new Tile(486, 332, 10);
expect(tile.quadkey()).toBe('0313102310');

const tile1 = new Tile(0, 0, 0);
expect(tile1.quadkey()).toBe('');

// create Tile from quadkey
const tile = new Tile(486, 332, 10);
expect(Tile.formQuadkey('0313102310').equals(tile)).toBe(true);

// check Tile isValid
const tile = new Tile(486, 332, 10);
expect(tile.isValid()).toBe(true);
expect(new Tile(-1, 0, 1).isValid()).toBe(false);
expect(new Tile(0, -1, 1).isValid()).toBe(false);
expect(new Tile(-1, -1, 1).isValid()).toBe(false);

// get Tile neighbors Tile
const tile = new Tile(0, 0, 0);
expect(tile.neighbors().length).toBe(0);

const tile1 = new Tile(243, 166, 9);
const tiles = tile1.neighbors();
expect(tiles.length).toBe(8);

const tile2 = new Tile(0, 166, 9);

const tiles2 = tile2.neighbors();

expect(tiles2.length).toBe(5);

// update Tile
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

// check Tile is equals
const tile1 = new Tile(1, 1, 1);
const tile2 = new Tile(1, 1, 1);
const tile3 = new Tile(1, 1, 2);
expect(tile1.equals(tile2)).toEqual(true);
expect(tile1.equals(tile3)).toEqual(false);
```
