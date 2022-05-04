package com.sakitam.mercantile;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

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

	public boolean equals(Tile o) {
		if (o == this) {
			return true;
		}

		return o.getX() == this.getX()
				&& o.getY() == this.getY()
				&& o.getZoom() == this.getZoom();
	}
}
