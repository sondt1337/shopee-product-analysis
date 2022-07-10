javascript: var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
    return a.raw = a
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, d) {
    a.raw = d;
    return a
};
$jscomp.arrayIteratorImpl = function(a) {
    var d = 0;
    return function() {
        return d < a.length ? {
            done: !1,
            value: a[d++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.makeIterator = function(a) {
    var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return d ? d.call(a) : $jscomp.arrayIterator(a)
};
(function() {
    function a(b) {
        b.forEach(function(c) {
            c.product_items && c.product_items.forEach(function(e) {
                f[e.model_name] ? f[e.model_name]++ : f[e.model_name] = 1
            })
        })
    }

    function d() {
        var b = Object.fromEntries(Object.entries(f).sort(function(c, e) {
            var g = $jscomp.makeIterator(c);
            g.next();
            g = g.next().value;
            var m = $jscomp.makeIterator(e);
            m.next();
            return m.next().value - g
        }));
        console.info("\u0110\u00e3 ho\u00e0n t\u1ea5t. K\u1ebft qu\u1ea3:");
        console.table(b)
    }

    function n() {
        var b = "https://shopee.vn/api/v2/item/get_ratings?filter=0&flag=1&itemid=" +
            k + "&limit=50&offset=" + p + "&shopid=" + l + "&type=0";
        console.log("\u0110ang qu\u00e9t trang " + h + "...");
        fetch(b, {
            headers: {
                "x-api-source": "pc",
                "x-requested-with": "XMLHttpRequest",
                "x-shopee-language": "vi"
            },
            method: "GET",
            mode: "cors",
            credentials: "include"
        }).then(function(c) {
            return c.json()
        }).then(function(c) {
            c.error || !c.data || 0 === c.data.ratings.length ? 1 < h && d() : (a(c.data.ratings), 50 > h ? (p += 50, h++, n()) : d())
        })
    }
    var f = {},
        p = 0,
        h = 1,
        l = null,
        k = null;
    (function() {
        var b = new URL(window.top.location.href);
        if (!b.hostname.includes("shopee.vn")) throw Error("\u0110o\u1ea1n m\u00e3 n\u00e0y ch\u1ec9 c\u00f3 th\u1ec3 s\u1eed d\u1ee5ng tr\u00ean web Shopee.vn");
        if (b = /.+-i\.([0-9]+).([0-9]+)/.exec(b.pathname)) l = b[1], k = b[2];
        else throw Error("Trang b\u1ea1n \u0111ang xem kh\u00f4ng ph\u1ea3i l\u00e0 m\u1ed9t trang s\u1ea3n ph\u1ea9m c\u1ee7a Shopee.");
    })();
    console.info("B\u1eaft \u0111\u1ea7u ph\u00e2n t\u00edch v\u1edbi Shop ID " + l + " v\u00e0 m\u00e3 s\u1ea3n ph\u1ea9m " +
        k + "...");
    n()
})();
