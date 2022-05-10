package com.sakitam.mercantile;

import java.io.Serializable;

public class LngLatBBox implements Serializable {
    private static final long serialVersionUID = 1L;

    private double west;

    private double south;
    private double east;
    private double north;

    public LngLatBBox() {
        super();
    }

    public LngLatBBox(double west, double south, double east, double north) {
        super();
        this.west = west;
        this.south = south;
        this.east = east;
        this.north = north;
    }

    public double getEast() {
        return east;
    }

    public double getNorth() {
        return north;
    }

    public double getSouth() {
        return south;
    }

    public double getWest() {
        return west;
    }

    public void setEast(double east) {
        this.east = east;
    }

    public void setNorth(double north) {
        this.north = north;
    }

    public void setSouth(double south) {
        this.south = south;
    }

    public void setWest(double west) {
        this.west = west;
    }

    public boolean equals(LngLatBBox o) {
        if (o == this) {
            return true;
        }

        return Constant.closeTo(o.getEast(), this.getEast())
                && Constant.closeTo(o.getNorth(), this.getNorth())
                && Constant.closeTo(o.getWest(), this.getWest())
                && Constant.closeTo(o.getSouth(), this.getSouth());
    }
}
