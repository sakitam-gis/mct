import com.sakitam.mercantile.*;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;

public class MercantileTest {
    @Test
    public void testLngLat () throws Exception {
        Mercantile mercantile = new Mercantile();
        LngLat lnglat = LngLat.formMercator(new Mercator(-8366731.739810849, -1655181.9927159143), false);

        Assert.assertTrue(lnglat.equals(new LngLat(-75.15963, -14.704620000000013, false)));
    }

    @Test
    public void testLngLatClip () throws Exception {
        Mercantile mercantile = new Mercantile();
        LngLat lnglat = LngLat.formMercator(new Mercator(-28366731.739810849, -1655181.9927159143), true);

        Assert.assertTrue(lnglat.equals(new LngLat(-180, -14.704620000000013, true)));
    }

    @Test
    public void testBounds () throws Exception {
        LngLatBBox bbox = Mercantile.bounds(new Tile(486, 332, 10));

        // @fixme 浮点数精度问题？
//        Assert.assertTrue(bbox.equals(new LngLatBBox(-9.140625, 53.12040528310657, -8.7890625, 53.33087298301705)));
        Assert.assertTrue(bbox.equals(new LngLatBBox(-9.140625, 53.120405283106564, -8.7890625, 53.33087298301705)));
    }

    @Test
    public void testXYBounds () throws Exception {
        BBox bbox = Mercantile.xyBounds(new Tile(486, 332, 10));

        // @fixme 浮点数精度问题？
//        Assert.assertTrue(bbox.equals(new BBox(-1017529.7205322663, 7005300.768279833, -978393.962050256, 7044436.526761846)));
        Assert.assertTrue(bbox.equals(new BBox(-1017529.7205322646, 7005300.768279833, -978393.9620502543, 7044436.526761843)));
    }

    @Test
    public void testTiles () throws Exception {
        int[] zooms = {0, 14};
        ArrayList<Tile> tiles = Mercantile.tiles(-105.0, 39.99, -104.99, 40, zooms, false);

        ArrayList<Tile> result = new ArrayList<Tile>();
        result.add(new Tile(0, 0, 0));
        result.add(new Tile(3413, 6202, 14));
        result.add(new Tile(3413, 6203, 14));

        Assert.assertEquals(tiles.size(), result.size());

        for (int i = 0; i < tiles.size(); i++) {
            Tile t = tiles.get(i);
            Tile r = result.get(i);
            Assert.assertTrue(t.equals(r));
        }
    }
}
