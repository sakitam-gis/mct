import Constant from './Constant';

export default class BBox {
  private left: number;
  private right: number;
  private bottom: number;
  private top: number;

  constructor(left: number, bottom: number, right: number, top: number) {
    this.left = left;
    this.bottom = bottom;
    this.right = right;
    this.top = top;
  }

  public getBottom() {
    return this.bottom;
  }

  public getLeft() {
    return this.left;
  }

  public getRight() {
    return this.right;
  }

  public getTop() {
    return this.top;
  }

  public setBottom(bottom) {
    this.bottom = bottom;
  }

  public setLeft(left) {
    this.left = left;
  }

  public setRight(right) {
    this.right = right;
  }

  public setTop(top) {
    this.top = top;
  }

  /**
   * check bbox is equals
   * @param o BBox
   * @return boolean
   */
  public equals(o: BBox) {
    if (o === this) {
      return true;
    }

    return (
      Constant.closeTo(o.getTop(), this.getTop()) &&
      Constant.closeTo(o.getBottom(), this.getBottom()) &&
      Constant.closeTo(o.getLeft(), this.getLeft()) &&
      Constant.closeTo(o.getRight(), this.getRight())
    );
  }
}
