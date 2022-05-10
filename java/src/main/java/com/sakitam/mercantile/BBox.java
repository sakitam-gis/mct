package com.sakitam.mercantile;

import java.io.Serializable;

public class BBox implements Serializable {
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

        return Constant.closeTo(o.getTop(), this.getTop())
                && Constant.closeTo(o.getBottom(), this.getBottom())
                && Constant.closeTo(o.getLeft(), this.getLeft())
                && Constant.closeTo(o.getRight(), this.getRight());
    }
}
