package com.sakitam.mercantile;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

public class Constant implements Serializable {

    public static final double R2D = 180.0 / Math.PI;

    public static final double D2R = Math.PI / 180.0;

    public static final double RE = 6378137.0;

    public static final double MAX_MERCATOR_LAT = 85.051129D;

    public static final double MAX_MERCATOR_LNG = 180.0D;

    public static final double CE = 2.0 * Math.PI * RE;

    public static final double EPSILON = 1e-14;

    public static final double LL_EPSILON = 1e-11;

    public static boolean closeTo(double a, double b) {
        return Math.abs(a - b) < EPSILON;
    }

    public static double toRadians(double angdeg) {
        return angdeg * D2R;
    }

    public static double toDegrees(double angrad) {
        return angrad * R2D;
    }

    public static double calcDistance(final double lat1, final double lon1, final double lat2, final double lon2) {
        if (lat1 == lat2 && lon1 == lon2) {
            return 0D;
        }

        if ((lat1 == lat2 && Math.abs(lon1 - lon2) == 360D) || (Math.abs(lat1 - lat2) == 360D && lon1 == lon2)) {
            return 0D;
        }

        final double dLat = Math.toRadians(lat1 - lat2);
        final double sLat = Math.toRadians(lat1 + lat2);
        final double dLon = Math.toRadians(lon1 - lon2);

        return RE * ahav(Math.min(Math.max(0D, hav(dLat) + (1D - hav(dLat) - hav(sLat)) * hav(dLon)), 1D));
    }

    public static ArrayList<Integer> range(int start, int end, int step) {
        int length = (int) Math.max(Math.ceil((end - start) / step), 0);
        ArrayList<Integer> range = new ArrayList<>();
        for (int idx = 0; idx < length; idx++, start += step) {
            range.add(start);
        }
        return range;
    }

    public static HashMap<String, Integer> minmax(int zoom) {
        if (zoom < 0) {
            throw new IllegalArgumentException("zoom must be a positive integer");
        }
        HashMap<String, Integer> data = new HashMap<>();
        data.put("min", 0);
        data.put("max", (int) (Math.pow(2, zoom) - 1));
        return data;
    }

    private static double ahav(final double x) {
        return 2D * Math.asin(Math.sqrt(x));
    }

    private static double hav(final double x) {
        return Math.pow(Math.sin(0.5D * x), 2D);
    }
}
