package com.sakitam.mercantile;

public class Constant {

    public static final double R2D = 180.0 / Math.PI;

    public static final double RE = 6378137.0;

    public static final double HALF_PI = 1.570796326794897D;

    public static final double MAX_MERCATOR_LAT = 85.051129D;

    public static final double MAX_MERCATOR_LNG = 180.0D;

    public static final double CE = 2 * Math.PI * RE;

    public static final double EPSILON = 1e-14;

    public static final double LL_EPSILON = 1e-11;

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

    private static double ahav(final double x) {
        return 2D * Math.asin(Math.sqrt(x));
    }

    private static double hav(final double x) {
        return Math.pow(Math.sin(0.5D * x), 2D);
    }
}
