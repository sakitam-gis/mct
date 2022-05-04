package com.sakitam.mercantile;

public class LngLatBBox {
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

        return Double.compare(o.getEast(), this.getEast()) == 0
                && Double.compare(o.getNorth(), this.getNorth()) == 0
                && Double.compare(o.getWest(), this.getWest()) == 0
                && Double.compare(o.getSouth(), this.getSouth()) == 0;
    }
}
