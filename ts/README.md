Affine
======

Matrices describing affine transformation of the plane.

Install
----

```bash
npm i @sakitam-gis/affine -S

import Affine from '@sakitam-gis/affine'
```

Usage
-----

The 3x3 augmented affine transformation matrix for transformations in two
dimensions is illustrated below.

```bash
| x |   | a  b  c | | x |
| y | = | d  e  f | | y |
| 1 |   | 0  0  1 | | 1 |
```

Matrices can be created by passing the values ``a, b, c, d, e, f`` to the
``Affine`` constructor or by using its ``identity()``,
``translation()``, ``scale()`` class methods.

GIS
----

raster extent: west, south, east, north
raster size: width, height

```js
const t = Affine.translation(west, north);
const s = Affine.scale((east - west) / width, (south - north) / height);

const geoTransform = t.multiply(s).toArray();
```
