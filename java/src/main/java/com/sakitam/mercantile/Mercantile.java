package com.sakitam.mercantile;

import java.util.ArrayList;
import java.io.Serializable;

public class Mercantile implements Serializable {
    private static final long serialVersionUID = 1L;

    public Mercantile() {
        super();
    }

    public static LngLatBBox bounds(Tile t) {
        int z = t.getZoom();
        int x = t.getX();
        int y = t.getY();

        double Z2 = Math.pow(2.0, z);

        double ulLonDeg = x / Z2 * 360.0 - 180.0;
        double ulLatRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / Z2)));
        double ulLatDeg = Math.toDegrees(ulLatRad);

        double lrLonDeg = (x + 1) / Z2 * 360.0 - 180.0;
        double lrLatRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * (y + 1) / Z2)));
        double lrLatDeg = Math.toDegrees(lrLatRad);

        return new LngLatBBox(ulLonDeg, lrLatDeg, lrLonDeg, ulLatDeg);
    }

    private static LngLat xy(double lng, double lat) {
        return new LngLat(lng, lat, false);
    }

    private static LngLat xy(double lng, double lat, boolean truncate) {
        return new LngLat(lng, lat, truncate);
    }

    public static BBox xyBounds(Tile t) {
        int z = t.getZoom();
        int x = t.getX();
        int y = t.getY();

        double tileSize = Constant.CE / Math.pow(2.0, z);

        double left = x * tileSize - Constant.CE / 2.0;
        double right = left + tileSize;

        double top = Constant.CE / 2 - y * tileSize;
        double bottom = top - tileSize;

        return new BBox(left, bottom, right, top);
    }

    public static Tile tile(double lng, double lat, double zoom, boolean clip) {
        LngLat lngLat = new LngLat(lng, lat, clip);
        double mercatorX = lngLat.getMercatorX();
        double mercatorY = lngLat.getMercatorY();

        double z = Math.pow(2.0, zoom);

        double xTile = mercatorX <= 0.0 ? 0.0 : mercatorX >= 1.0 ? z - 1.0 : Math.floor((mercatorX + Constant.EPSILON) * z);

        double yTile = mercatorY <= 0.0 ? 0.0 : mercatorY >= 1.0 ? z - 1.0 : Math.floor((mercatorY + Constant.EPSILON) * z);

        int x = (int) xTile;
        int y = (int) yTile;
        int zz = (int) zoom;

        return new Tile(x, y, zz);
    }

    /**
     * 根据范围生成瓦片
     * @param west
     * @param south
     * @param east
     * @param north
     * @param zooms TODO 注意此处有可能只传单个 zoom, 类型为 int，需要重载
     * @param clip
     * @return
     */
    public static ArrayList<Tile> tiles(double west, double south, double east, double north, int[] zooms, boolean clip) {
        LngLat ws = new LngLat(west, south, clip);
        LngLat en = new LngLat(east, north, clip);

        double w = Math.max(-Constant.MAX_MERCATOR_LNG, ws.getLng());
        double s = Math.max(-Constant.MAX_MERCATOR_LAT, ws.getLat());
        double e = Math.min(Constant.MAX_MERCATOR_LNG, en.getLng());
        double n = Math.min(Constant.MAX_MERCATOR_LAT, en.getLat());

        ArrayList<Tile> overlappedTiles = new ArrayList<>();

        for (int z = 0; z < zooms.length; z++) {
            Tile ulTile = tile(w, n, zooms[z], clip);
            Tile lrTile = tile(e - Constant.LL_EPSILON, s + Constant.LL_EPSILON, zooms[z], clip);

            for (int i = ulTile.getX(); i < lrTile.getX() + 1; i++) {
                for (int j = ulTile.getY(); j < lrTile.getY() + 1; j++) {
                    overlappedTiles.add(new Tile(i, j, zooms[z]));
                }
            }
        }

        return overlappedTiles;
    }
}
