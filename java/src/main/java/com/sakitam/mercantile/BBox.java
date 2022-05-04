package com.sakitam.mercantile;

public class BBox {
    private static final long serialVersionUID = 1L;

    private double left;
    private double right;
    private double bottom;
    private double top;

    public BBox() {
        super();
    }

    public BBox(double left, double bottom, double right, double top) {
        super();
        this.left = left;
        this.bottom = bottom;
        this.right = right;
        this.top = top;
    }

    public double getBottom() {
        return bottom;
    }

    public double getLeft() {
        return left;
    }

    public double getRight() {
        return right;
    }

    public double getTop() {
        return top;
    }

    public void setBottom(double bottom) {
        this.bottom = bottom;
    }

    public void setLeft(double left) {
        this.left = left;
    }

    public void setRight(double right) {
        this.right = right;
    }

    public void setTop(double top) {
        this.top = top;
    }

    public boolean equals(BBox o) {
        if (o == this) {
            return true;
        }

        return Double.compare(o.getTop(), this.getTop()) == 0
                && Double.compare(o.getBottom(), this.getBottom()) == 0
                && Double.compare(o.getLeft(), this.getLeft()) == 0
                && Double.compare(o.getRight(), this.getRight()) == 0;
    }
}
