package com.sakitam.mercantile;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

public class Tile implements Serializable {
    private static final long serialVersionUID = 1L;

    private int x;
	private int y;
	private int zoom;

	public Tile() {
		super();
	}

	public Tile(int x, int y, int zoom) {
		super();
		this.x = x;
		this.y = y;
		this.zoom = zoom;
	}

	public boolean isValid() {
		int z = this.getZoom();
		int x = this.getX();
		int y = this.getY();
		return z >= 0 && 0 <= x && x <= (Math.pow(2.0, z) - 1) && 0 <= y && y <= (Math.pow(2.0, z) - 1);
	}

	public Tile parent(int zoom) {
		// 等 0 级瓦片没有父级
		if (this.zoom == 0) return null;
		int z = this.zoom - 1;
		if (this.zoom < zoom) {
			throw new IllegalArgumentException("[mct]: zoom must be an number and less than that of the tile");
		} else {
			z = zoom;
		}

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		Tile rTile = this;

		while (rTile.getZoom() > z) {
      		int x = rTile.getX();
      		int y = rTile.getY();
      		int zz = rTile.getZoom();

			if (x % 2 == 0 && y % 2 == 0) {
				rTile = new Tile((int) Math.floor(x / 2), (int) Math.floor(y / 2), zz - 1);
			} else if (x % 2 == 0) {
				rTile = new Tile((int) Math.floor(x / 2), (int) Math.floor((y - 1) / 2), zz - 1);
			} else if (x % 2 != 0 && y % 2 == 0) {
				rTile = new Tile((int) Math.floor((x - 1) / 2), (int) Math.floor(y / 2), zz - 1);
			} else {
				rTile = new Tile((int) Math.floor((x - 1) / 2), (int) Math.floor((y - 1) / 2), zz - 1);
			}
		}
		return rTile;
	}

	public ArrayList<Tile> children(int zoom) {
		int z = this.zoom + 1;
		if (this.zoom > zoom) {
			throw new IllegalArgumentException("[mct]: zoom must be an number and greater than that of the tile");
		} else {
			z = zoom;
		}
		ArrayList<Tile> tiles = new ArrayList<Tile>();
		tiles.add(this);

		while (tiles.get(0).getZoom() < z) {
			Tile tile = tiles.get(0);
			int x = tile.getX();
			int y = tile.getY();
			int zz = tile.getZoom();
			tiles.remove(0);
			tiles.add(new Tile(x * 2, y * 2, zz + 1));
			tiles.add(new Tile(x * 2 + 1, y * 2, zz + 1));
			tiles.add(new Tile(x * 2 + 1, y * 2 + 1, zz + 1));
			tiles.add(new Tile(x * 2, y * 2 + 1, zz + 1));
		}

		return tiles;
	}

	public String quadkey() {
		int x = this.getX();
		int y = this.getY();
		int zoom = this.getZoom();
		StringBuilder quadKey = new StringBuilder();
		for (int i = zoom; i > 0; i--) {
			char digit = '0';
			int mask = 1 << (i - 1);
			if ((x & mask) != 0) {
				digit++;
			}
			if ((y & mask) != 0) {
				digit++;
				digit++;
			}
			quadKey.append(digit);
		}

		return quadKey.toString();
	}

	public ArrayList<Tile> neighbors() {
		int x = this.getX();
		int y = this.getY();
		int z = this.getZoom();
    	int max = Constant.minmax(z).get("max");
		ArrayList<Tile> neighbours = new ArrayList<Tile>();

		int[] positions = {-1, 0, 1};
		for (int i = 0; i < positions.length; i++) {
			for (int j = 0; j < positions.length; j++) {
				if (i == 0 && j == 0) {
					continue;
				} else if (x + i < 0 || y + j < 0) {
					continue;
				} else if (x + i > max || y + j > max) {
					continue;
				} else {
					Tile t = new Tile(x + 1, y + 1, z);
					if (t.isValid()) {
						neighbours.add(t);
					}
				}
			}
		}

		return neighbours;
	}

	public Map<String, Integer> getXYZ() {
		Map<String, Integer> xyz = new HashMap<>();

		xyz.put(String.valueOf('x'), this.getX());
		xyz.put(String.valueOf('y'), this.getY());
		xyz.put(String.valueOf('z'), this.getZoom());

		return xyz;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getZoom() {
		return zoom;
	}

	public void setZoom(int zoom) {
		this.zoom = zoom;
	}

	public BBox getBBox() {
		double tileSize = Constant.CE / Math.pow(2, zoom);

		double left = x * tileSize - Constant.CE / 2;
		double right = left + tileSize;

		double top = Constant.CE / 2 - y * tileSize;
		double bottom = top - tileSize;
		return new BBox(left, bottom, right, top);
	}

	/**
	 * 返回瓦片左上角的经度和纬度
	 */
	public LngLat ul() {
		double Z2 = Math.pow(2, this.getZoom());
		double lonDeg = (this.getX() / Z2) * 360.0 - 180.0;
		double latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * this.getY()) / Z2)));
		double latDeg = Constant.toDegrees(latRad);
		return new LngLat(lonDeg, latDeg, true);
	}

	/**
	 * 返回瓦片右下角的经度和纬度
	 */
	public LngLat lr() {
		double Z2 = Math.pow(2, this.getZoom());
		double lonDeg = ((this.getX() + 1) / Z2) * 360.0 - 180.0;
		double latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * (this.getY() + 1)) / Z2)));
		double latDeg = Constant.toDegrees(latRad);
		return new LngLat(lonDeg, latDeg, true);
	}

	public LngLatBBox getLngLatBbox() {
		LngLat ul = this.ul();
		LngLat lr = this.lr();
		return new LngLatBBox(ul.getLng(), lr.getLat(), lr.getLng(), ul.getLat());
	}

	public boolean equals(Tile o) {
		if (o == this) {
			return true;
		}

		return (
			Constant.closeTo(o.getX(), this.getX()) &&
			Constant.closeTo(o.getY(), this.getY()) &&
			Constant.closeTo(o.getZoom(), this.getZoom())
		);
	}
}
