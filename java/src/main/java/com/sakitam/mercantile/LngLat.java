package com.sakitam.mercantile;

import java.io.Serializable;

public class LngLat implements Serializable {
    private static final long serialVersionUID = 1L;

    private double lng;
	private double lat;

	private double x;

	private double y;

	private double mercatorX;

	private double mercatorY;

	public LngLat() {
		super();
	}

	public LngLat(double lng, double lat, boolean clip) {
		super();
		this.setLng(lng, clip);
		this.setLat(lat, clip);
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng, boolean clip) {
		this.lng = lng;

		if (clip) {
			if (this.lng > 180.0) {
				this.lng = 180.0;
			} else if (this.lng < -180.0) {
				this.lng = -180.0;
			}
		}

		this.x = Constant.RE * Math.toRadians(this.lng);

		this.mercatorX = this.lng / 360.0 + 0.5; // 0-1
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat, boolean clip) {
		this.lat = lat;

		if (clip) {
			if (this.lat > 90.0) {
				this.lat = 90.0;
			} else if (this.lat < -90.0) {
				this.lat = -90.0;
			}
		}

		this.y = Constant.RE * Math.log(Math.tan((Math.PI * 0.25) + (0.5 * Math.toRadians(this.lat))));

		double s = Math.sin(Math.toRadians(this.lat));

		this.mercatorY = 0.5 - 0.25 * Math.log((1.0 + s) / (1.0 - s)) / Math.PI; // 0-1
	}

	public double getX() {
		return x;
	}

	public double getY() {
		return y;
	}

	public double getMercatorX() {
		return mercatorX;
	}

	public double getMercatorY() {
		return mercatorY;
	}

	public static LngLat formMercator(Mercator xy, boolean clip) {
		return new LngLat(xy.getLng(), xy.getLat(), clip);
	}

	public static Mercator toMercator(LngLat coordinates) {
		return Mercator.formLngLat(coordinates);
	}

	public boolean equals(LngLat o) {
		if (o == this) {
			return true;
		}

		return Double.compare(o.getLng(), this.getLng()) == 0
				&& Double.compare(o.getLat(), this.getLat()) == 0;
	}
}
