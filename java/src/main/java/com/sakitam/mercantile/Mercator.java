package com.sakitam.mercantile;

import java.io.Serializable;

public class Mercator implements Serializable {
    private static final long serialVersionUID = 1L;

    private double x;
	private double y;

	private double lng;

	private double lat;

	public Mercator() {
		super();
	}

	public Mercator(double x, double y) {
		super();
		this.setX(x);
		this.setY(y);
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;

		this.lng = this.x * Constant.R2D / Constant.RE;
	}

	public double getY() {
		return y;
	}

	public double getLng() {
		return lng;
	}

	public double getLat() {
		return lat;
	}

	public void setY(double y) {
		this.y = y;

		this.lat = ((Math.PI * 0.5) - 2.0 * Math.atan(Math.exp(-y / Constant.RE))) * Constant.R2D;
	}

	public static Mercator formLngLat(LngLat lngLat) {
		return new Mercator(lngLat.getX(), lngLat.getY());
	}

	public static LngLat toLngLat(Mercator xy, boolean clip) {
		return new LngLat(xy.getLng(), xy.getLat(), clip);
	}
}
