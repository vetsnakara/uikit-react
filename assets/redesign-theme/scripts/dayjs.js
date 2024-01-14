/* Version: 1.8.27
   Downloaded here: https://unpkg.com/dayjs@1.8.27/dayjs.min.js
   Code examples: https://github.com/you-dont-need/You-Dont-Need-Momentjs */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define(e)
        : (t.dayjs = e());
})(this, function () {
    "use strict";
    var t = "millisecond",
        e = "second",
        n = "minute",
        r = "hour",
        i = "day",
        s = "week",
        u = "month",
        o = "quarter",
        a = "year",
        h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
        f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        c = function (t, e, n) {
            var r = String(t);
            return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
        },
        d = {
            s: c,
            z: function (t) {
                var e = -t.utcOffset(),
                    n = Math.abs(e),
                    r = Math.floor(n / 60),
                    i = n % 60;
                return (e <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");
            },
            m: function (t, e) {
                var n = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                    r = t.clone().add(n, u),
                    i = e - r < 0,
                    s = t.clone().add(n + (i ? -1 : 1), u);
                return Number(-(n + (e - r) / (i ? r - s : s - r)) || 0);
            },
            a: function (t) {
                return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
            },
            p: function (h) {
                return (
                    { M: u, y: a, w: s, d: i, D: "date", h: r, m: n, s: e, ms: t, Q: o }[h] ||
                    String(h || "")
                        .toLowerCase()
                        .replace(/s$/, "")
                );
            },
            u: function (t) {
                return void 0 === t;
            },
        },
        $ = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        },
        l = "en",
        m = {};
    m[l] = $;
    var y = function (t) {
            return t instanceof v;
        },
        M = function (t, e, n) {
            var r;
            if (!t) return l;
            if ("string" == typeof t) m[t] && (r = t), e && ((m[t] = e), (r = t));
            else {
                var i = t.name;
                (m[i] = t), (r = i);
            }
            return !n && r && (l = r), r || (!n && l);
        },
        g = function (t, e) {
            if (y(t)) return t.clone();
            var n = "object" == typeof e ? e : {};
            return (n.date = t), (n.args = arguments), new v(n);
        },
        D = d;
    (D.l = M),
        (D.i = y),
        (D.w = function (t, e) {
            return g(t, { locale: e.$L, utc: e.$u, $offset: e.$offset });
        });
    var v = (function () {
        function c(t) {
            (this.$L = this.$L || M(t.locale, null, !0)), this.parse(t);
        }
        var d = c.prototype;
        return (
            (d.parse = function (t) {
                (this.$d = (function (t) {
                    var e = t.date,
                        n = t.utc;
                    if (null === e) return new Date(NaN);
                    if (D.u(e)) return new Date();
                    if (e instanceof Date) return new Date(e);
                    if ("string" == typeof e && !/Z$/i.test(e)) {
                        var r = e.match(h);
                        if (r)
                            return n
                                ? new Date(
                                      Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)
                                  )
                                : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);
                    }
                    return new Date(e);
                })(t)),
                    this.init();
            }),
            (d.init = function () {
                var t = this.$d;
                (this.$y = t.getFullYear()),
                    (this.$M = t.getMonth()),
                    (this.$D = t.getDate()),
                    (this.$W = t.getDay()),
                    (this.$H = t.getHours()),
                    (this.$m = t.getMinutes()),
                    (this.$s = t.getSeconds()),
                    (this.$ms = t.getMilliseconds());
            }),
            (d.$utils = function () {
                return D;
            }),
            (d.isValid = function () {
                return !("Invalid Date" === this.$d.toString());
            }),
            (d.isSame = function (t, e) {
                var n = g(t);
                return this.startOf(e) <= n && n <= this.endOf(e);
            }),
            (d.isAfter = function (t, e) {
                return g(t) < this.startOf(e);
            }),
            (d.isBefore = function (t, e) {
                return this.endOf(e) < g(t);
            }),
            (d.$g = function (t, e, n) {
                return D.u(t) ? this[e] : this.set(n, t);
            }),
            (d.year = function (t) {
                return this.$g(t, "$y", a);
            }),
            (d.month = function (t) {
                return this.$g(t, "$M", u);
            }),
            (d.day = function (t) {
                return this.$g(t, "$W", i);
            }),
            (d.date = function (t) {
                return this.$g(t, "$D", "date");
            }),
            (d.hour = function (t) {
                return this.$g(t, "$H", r);
            }),
            (d.minute = function (t) {
                return this.$g(t, "$m", n);
            }),
            (d.second = function (t) {
                return this.$g(t, "$s", e);
            }),
            (d.millisecond = function (e) {
                return this.$g(e, "$ms", t);
            }),
            (d.unix = function () {
                return Math.floor(this.valueOf() / 1e3);
            }),
            (d.valueOf = function () {
                return this.$d.getTime();
            }),
            (d.startOf = function (t, o) {
                var h = this,
                    f = !!D.u(o) || o,
                    c = D.p(t),
                    d = function (t, e) {
                        var n = D.w(h.$u ? Date.UTC(h.$y, e, t) : new Date(h.$y, e, t), h);
                        return f ? n : n.endOf(i);
                    },
                    $ = function (t, e) {
                        return D.w(
                            h.toDate()[t].apply(h.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)),
                            h
                        );
                    },
                    l = this.$W,
                    m = this.$M,
                    y = this.$D,
                    M = "set" + (this.$u ? "UTC" : "");
                switch (c) {
                    case a:
                        return f ? d(1, 0) : d(31, 11);
                    case u:
                        return f ? d(1, m) : d(0, m + 1);
                    case s:
                        var g = this.$locale().weekStart || 0,
                            v = (l < g ? l + 7 : l) - g;
                        return d(f ? y - v : y + (6 - v), m);
                    case i:
                    case "date":
                        return $(M + "Hours", 0);
                    case r:
                        return $(M + "Minutes", 1);
                    case n:
                        return $(M + "Seconds", 2);
                    case e:
                        return $(M + "Milliseconds", 3);
                    default:
                        return this.clone();
                }
            }),
            (d.endOf = function (t) {
                return this.startOf(t, !1);
            }),
            (d.$set = function (s, o) {
                var h,
                    f = D.p(s),
                    c = "set" + (this.$u ? "UTC" : ""),
                    d = ((h = {}),
                    (h[i] = c + "Date"),
                    (h.date = c + "Date"),
                    (h[u] = c + "Month"),
                    (h[a] = c + "FullYear"),
                    (h[r] = c + "Hours"),
                    (h[n] = c + "Minutes"),
                    (h[e] = c + "Seconds"),
                    (h[t] = c + "Milliseconds"),
                    h)[f],
                    $ = f === i ? this.$D + (o - this.$W) : o;
                if (f === u || f === a) {
                    var l = this.clone().set("date", 1);
                    l.$d[d]($), l.init(), (this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate());
                } else d && this.$d[d]($);
                return this.init(), this;
            }),
            (d.set = function (t, e) {
                return this.clone().$set(t, e);
            }),
            (d.get = function (t) {
                return this[D.p(t)]();
            }),
            (d.add = function (t, o) {
                var h,
                    f = this;
                t = Number(t);
                var c = D.p(o),
                    d = function (e) {
                        var n = g(f);
                        return D.w(n.date(n.date() + Math.round(e * t)), f);
                    };
                if (c === u) return this.set(u, this.$M + t);
                if (c === a) return this.set(a, this.$y + t);
                if (c === i) return d(1);
                if (c === s) return d(7);
                var $ = ((h = {}), (h[n] = 6e4), (h[r] = 36e5), (h[e] = 1e3), h)[c] || 1,
                    l = this.$d.getTime() + t * $;
                return D.w(l, this);
            }),
            (d.subtract = function (t, e) {
                return this.add(-1 * t, e);
            }),
            (d.format = function (t) {
                var e = this;
                if (!this.isValid()) return "Invalid Date";
                var n = t || "YYYY-MM-DDTHH:mm:ssZ",
                    r = D.z(this),
                    i = this.$locale(),
                    s = this.$H,
                    u = this.$m,
                    o = this.$M,
                    a = i.weekdays,
                    h = i.months,
                    c = function (t, r, i, s) {
                        return (t && (t[r] || t(e, n))) || i[r].substr(0, s);
                    },
                    d = function (t) {
                        return D.s(s % 12 || 12, t, "0");
                    },
                    $ =
                        i.meridiem ||
                        function (t, e, n) {
                            var r = t < 12 ? "AM" : "PM";
                            return n ? r.toLowerCase() : r;
                        },
                    l = {
                        YY: String(this.$y).slice(-2),
                        YYYY: this.$y,
                        M: o + 1,
                        MM: D.s(o + 1, 2, "0"),
                        MMM: c(i.monthsShort, o, h, 3),
                        MMMM: c(h, o),
                        D: this.$D,
                        DD: D.s(this.$D, 2, "0"),
                        d: String(this.$W),
                        dd: c(i.weekdaysMin, this.$W, a, 2),
                        ddd: c(i.weekdaysShort, this.$W, a, 3),
                        dddd: a[this.$W],
                        H: String(s),
                        HH: D.s(s, 2, "0"),
                        h: d(1),
                        hh: d(2),
                        a: $(s, u, !0),
                        A: $(s, u, !1),
                        m: String(u),
                        mm: D.s(u, 2, "0"),
                        s: String(this.$s),
                        ss: D.s(this.$s, 2, "0"),
                        SSS: D.s(this.$ms, 3, "0"),
                        Z: r,
                    };
                return n.replace(f, function (t, e) {
                    return e || l[t] || r.replace(":", "");
                });
            }),
            (d.utcOffset = function () {
                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }),
            (d.diff = function (t, h, f) {
                var c,
                    d = D.p(h),
                    $ = g(t),
                    l = 6e4 * ($.utcOffset() - this.utcOffset()),
                    m = this - $,
                    y = D.m(this, $);
                return (
                    (y =
                        ((c = {}),
                        (c[a] = y / 12),
                        (c[u] = y),
                        (c[o] = y / 3),
                        (c[s] = (m - l) / 6048e5),
                        (c[i] = (m - l) / 864e5),
                        (c[r] = m / 36e5),
                        (c[n] = m / 6e4),
                        (c[e] = m / 1e3),
                        c)[d] || m),
                    f ? y : D.a(y)
                );
            }),
            (d.daysInMonth = function () {
                return this.endOf(u).$D;
            }),
            (d.$locale = function () {
                return m[this.$L];
            }),
            (d.locale = function (t, e) {
                if (!t) return this.$L;
                var n = this.clone(),
                    r = M(t, e, !0);
                return r && (n.$L = r), n;
            }),
            (d.clone = function () {
                return D.w(this.$d, this);
            }),
            (d.toDate = function () {
                return new Date(this.valueOf());
            }),
            (d.toJSON = function () {
                return this.isValid() ? this.toISOString() : null;
            }),
            (d.toISOString = function () {
                return this.$d.toISOString();
            }),
            (d.toString = function () {
                return this.$d.toUTCString();
            }),
            c
        );
    })();
    return (
        (g.prototype = v.prototype),
        (g.extend = function (t, e) {
            return t(e, v, g), g;
        }),
        (g.locale = M),
        (g.isDayjs = y),
        (g.unix = function (t) {
            return g(1e3 * t);
        }),
        (g.en = m[l]),
        (g.Ls = m),
        g
    );
});
// Addons

// symlink dayjs to moment
window.moment = dayjs;
// Russian local [ru]
var q = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
    w = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
    y = q.map(function (t) {
        return t.substr(0, 3);
    }),
    r = w.map(function (t) {
        return t.substr(0, 3);
    }),
    u = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
function i(t, r) {
    return t[4 < r % 100 && r % 100 < 21 ? 0 : "0122200000"[r % 10]];
}
function o(t, r, e) {
    return "m" === e
        ? r
            ? "минута"
            : "минуту"
        : t +
              " " +
              i(
                  {
                      mm: r ? "минут_минута_минуты" : "минут_минуту_минуты",
                      hh: "часов_час_часа",
                      dd: "дней_день_дня",
                      MM: "месяцев_месяц_месяца",
                      yy: "лет_год_года",
                  }[e],
                  +t
              );
}
function _slicedToArray(t, r) {
    return _arrayWithHoles(t) || _iterableToArrayLimit(t, r) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _iterableToArrayLimit(t, r) {
    if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) {
        var e = [],
            n = !0,
            o = !1,
            a = void 0;
        try {
            for (
                var s, i = t[Symbol.iterator]();
                !(n = (s = i.next()).done) && (e.push(s.value), !r || e.length !== r);
                n = !0
            );
        } catch (t) {
            (o = !0), (a = t);
        } finally {
            try {
                n || null == i.return || i.return();
            } finally {
                if (o) throw a;
            }
        }
        return e;
    }
}
function _arrayWithHoles(t) {
    if (Array.isArray(t)) return t;
}
dayjs.locale(
    dayjs.locale(
        {
            name: "ru",
            weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
            weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            months: function (t, r) {
                return u.test(r) ? q[t.month()] : w[t.month()];
            },
            monthsShort: function (t, e) {
                return u.test(e) ? y[t.month()] : r[t.month()];
            },
            weekStart: 1,
            formats: {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY г.",
                LLL: "D MMMM YYYY г., H:mm",
                LLLL: "dddd, D MMMM YYYY г., H:mm",
            },
            relativeTime: {
                future: "через %s",
                past: "%s назад",
                s: "несколько секунд",
                m: o,
                mm: o,
                h: "час",
                hh: o,
                d: "день",
                dd: o,
                M: "месяц",
                MM: o,
                y: "год",
                yy: o,
            },
            ordinal: function (t) {
                return t;
            },
        },
        null,
        !0
    )
);
// isBetween plugin
dayjs.extend(function (t, r, e) {
    r.prototype.isBetween = function (t, r, n, o) {
        o = o || "()";
        var a = e(t),
            s = e(r),
            i = "(" === o[0],
            h = ")" === o[1];
        return (
            ((i ? this.isAfter(a, n) : !this.isBefore(a, n)) && (h ? this.isBefore(s, n) : !this.isAfter(s, n))) ||
            ((i ? this.isBefore(a, n) : !this.isAfter(a, n)) && (h ? this.isAfter(s, n) : !this.isBefore(s, n)))
        );
    };
});
var locale,
    formattingTokens = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,
    match1 = /\d/,
    match2 = /\d\d/,
    match3 = /\d{3}/,
    match4 = /\d{4}/,
    match1to2 = /\d\d?/,
    matchUpperCaseAMPM = /[AP]M/,
    matchLowerCaseAMPM = /[ap]m/,
    matchSigned = /[+-]?\d+/,
    matchOffset = /[+-]\d\d:?\d\d/,
    matchWord = /\d*[^\s\d-:/.()]+/;
function offsetFromString(t) {
    var r = t.match(/([+-]|\d\d)/g),
        e = 60 * r[1] + +r[2];
    return 0 === e ? 0 : "+" === r[0] ? -e : e;
}
var addInput = function (t) {
        return function (r) {
            this[t] = +r;
        };
    },
    zoneExpressions = [
        matchOffset,
        function (t) {
            (this.zone || (this.zone = {})).offset = offsetFromString(t);
        },
    ],
    expressions = {
        A: [
            matchUpperCaseAMPM,
            function (t) {
                this.afternoon = "PM" === t;
            },
        ],
        a: [
            matchLowerCaseAMPM,
            function (t) {
                this.afternoon = "pm" === t;
            },
        ],
        S: [
            match1,
            function (t) {
                this.milliseconds = 100 * +t;
            },
        ],
        SS: [
            match2,
            function (t) {
                this.milliseconds = 10 * +t;
            },
        ],
        SSS: [
            match3,
            function (t) {
                this.milliseconds = +t;
            },
        ],
        s: [match1to2, addInput("seconds")],
        ss: [match1to2, addInput("seconds")],
        m: [match1to2, addInput("minutes")],
        mm: [match1to2, addInput("minutes")],
        H: [match1to2, addInput("hours")],
        h: [match1to2, addInput("hours")],
        HH: [match1to2, addInput("hours")],
        hh: [match1to2, addInput("hours")],
        D: [match1to2, addInput("day")],
        DD: [match2, addInput("day")],
        Do: [
            matchWord,
            function (t) {
                var r = locale.ordinal,
                    e = _slicedToArray(t.match(/\d+/), 1);
                if (((this.day = e[0]), r))
                    for (var n = 1; n <= 31; n += 1) r(n).replace(/\[|\]/g, "") === t && (this.day = n);
            },
        ],
        M: [match1to2, addInput("month")],
        MM: [match2, addInput("month")],
        MMM: [
            matchWord,
            function (t) {
                var r = locale,
                    e = r.months,
                    n = r.monthsShort,
                    o = n
                        ? n.findIndex(function (r) {
                              return r === t;
                          })
                        : e.findIndex(function (r) {
                              return r.substr(0, 3) === t;
                          });
                if (o < 0) throw new Error();
                this.month = o + 1;
            },
        ],
        MMMM: [
            matchWord,
            function (t) {
                var r = locale.months.indexOf(t);
                if (r < 0) throw new Error();
                this.month = r + 1;
            },
        ],
        Y: [matchSigned, addInput("year")],
        YY: [
            match2,
            function (t) {
                (t = +t), (this.year = t + (t > 68 ? 1900 : 2e3));
            },
        ],
        YYYY: [match4, addInput("year")],
        Z: zoneExpressions,
        ZZ: zoneExpressions,
    };
function correctHours(t) {
    var r = t.afternoon;
    if (void 0 !== r) {
        var e = t.hours;
        r ? e < 12 && (t.hours += 12) : 12 === e && (t.hours = 0), delete t.afternoon;
    }
}
function makeParser(t) {
    for (var r = t.match(formattingTokens), e = r.length, n = 0; n < e; n += 1) {
        var o = r[n],
            a = expressions[o],
            s = a && a[0],
            i = a && a[1];
        r[n] = i ? { regex: s, parser: i } : o.replace(/^\[|\]$/g, "");
    }
    return function (t) {
        for (var n = {}, o = 0, a = 0; o < e; o += 1) {
            var s = r[o];
            if ("string" == typeof s) a += s.length;
            else {
                var i = s.regex,
                    h = s.parser,
                    c = t.substr(a),
                    u = i.exec(c)[0];
                h.call(n, u), (t = t.replace(u, ""));
            }
        }
        return correctHours(n), n;
    };
}
var parseFormattedInput = function (t, r, e) {
    try {
        var n = makeParser(r)(t),
            o = n.year,
            a = n.month,
            s = n.day,
            i = n.hours,
            h = n.minutes,
            c = n.seconds,
            u = n.milliseconds,
            d = n.zone;
        if (d) return new Date(Date.UTC(o, a - 1, s, i || 0, h || 0, c || 0, u || 0) + 60 * d.offset * 1e3);
        var m = new Date(),
            f = s || (o || a ? 1 : m.getDate()),
            l = o || m.getFullYear(),
            _ = a > 0 ? a - 1 : m.getMonth(),
            p = i || 0,
            M = h || 0,
            y = c || 0,
            Y = u || 0;
        return e ? new Date(Date.UTC(l, _, f, p, M, y, Y)) : new Date(l, _, f, p, M, y, Y);
    } catch (t) {
        return new Date("");
    }
};
// CustomParseFormat plugin
dayjs.extend(
    (function () {
        "use strict";
        var t,
            e = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,
            n = /\d\d/,
            r = /\d\d?/,
            o = /\d*[^\s\d-:/()]+/;
        var i = function (t) {
                return function (e) {
                    this[t] = +e;
                };
            },
            s = [
                /[+-]\d\d:?\d\d/,
                function (t) {
                    var e, n;
                    (this.zone || (this.zone = {})).offset =
                        ((e = t.match(/([+-]|\d\d)/g)), 0 === (n = 60 * e[1] + +e[2]) ? 0 : "+" === e[0] ? -n : n);
                },
            ],
            a = function (e) {
                var n = t[e];
                return n && (n.indexOf ? n : n.s.concat(n.f));
            },
            h = {
                A: [
                    /[AP]M/,
                    function (t) {
                        this.afternoon = "PM" === t;
                    },
                ],
                a: [
                    /[ap]m/,
                    function (t) {
                        this.afternoon = "pm" === t;
                    },
                ],
                S: [
                    /\d/,
                    function (t) {
                        this.milliseconds = 100 * +t;
                    },
                ],
                SS: [
                    n,
                    function (t) {
                        this.milliseconds = 10 * +t;
                    },
                ],
                SSS: [
                    /\d{3}/,
                    function (t) {
                        this.milliseconds = +t;
                    },
                ],
                s: [r, i("seconds")],
                ss: [r, i("seconds")],
                m: [r, i("minutes")],
                mm: [r, i("minutes")],
                H: [r, i("hours")],
                h: [r, i("hours")],
                HH: [r, i("hours")],
                hh: [r, i("hours")],
                D: [r, i("day")],
                DD: [n, i("day")],
                Do: [
                    o,
                    function (e) {
                        var n = t.ordinal,
                            r = e.match(/\d+/);
                        if (((this.day = r[0]), n))
                            for (var o = 1; o <= 31; o += 1) n(o).replace(/\[|\]/g, "") === e && (this.day = o);
                    },
                ],
                M: [r, i("month")],
                MM: [n, i("month")],
                MMM: [
                    o,
                    function (t) {
                        var e = a("months"),
                            n =
                                (
                                    a("monthsShort") ||
                                    e.map(function (t) {
                                        return t.substr(0, 3);
                                    })
                                ).indexOf(t) + 1;
                        if (n < 1) throw new Error();
                        this.month = n % 12 || n;
                    },
                ],
                MMMM: [
                    o,
                    function (t) {
                        var e = a("months").indexOf(t) + 1;
                        if (e < 1) throw new Error();
                        this.month = e % 12 || e;
                    },
                ],
                Y: [/[+-]?\d+/, i("year")],
                YY: [
                    n,
                    function (t) {
                        (t = +t), (this.year = t + (t > 68 ? 1900 : 2e3));
                    },
                ],
                YYYY: [/\d{4}/, i("year")],
                Z: s,
                ZZ: s,
            };
        var f = function (t, n, r) {
            try {
                var o = (function (t) {
                        for (var n = t.match(e), r = n.length, o = 0; o < r; o += 1) {
                            var i = n[o],
                                s = h[i],
                                a = s && s[0],
                                f = s && s[1];
                            n[o] = f ? { regex: a, parser: f } : i.replace(/^\[|\]$/g, "");
                        }
                        return function (t) {
                            for (var e = {}, o = 0, i = 0; o < r; o += 1) {
                                var s = n[o];
                                if ("string" == typeof s) i += s.length;
                                else {
                                    var a = s.regex,
                                        h = s.parser,
                                        f = t.substr(i),
                                        u = a.exec(f)[0];
                                    h.call(e, u), (t = t.replace(u, ""));
                                }
                            }
                            return (
                                (function (t) {
                                    var e = t.afternoon;
                                    if (void 0 !== e) {
                                        var n = t.hours;
                                        e ? n < 12 && (t.hours += 12) : 12 === n && (t.hours = 0), delete t.afternoon;
                                    }
                                })(e),
                                e
                            );
                        };
                    })(n)(t),
                    i = o.year,
                    s = o.month,
                    a = o.day,
                    f = o.hours,
                    u = o.minutes,
                    d = o.seconds,
                    c = o.milliseconds,
                    l = o.zone,
                    m = new Date(),
                    v = a || (i || s ? 1 : m.getDate()),
                    p = i || m.getFullYear(),
                    y = 0;
                (i && !s) || (y = s > 0 ? s - 1 : m.getMonth());
                var D = f || 0,
                    M = u || 0,
                    g = d || 0,
                    Y = c || 0;
                return l
                    ? new Date(Date.UTC(p, y, v, D, M, g, Y + 60 * l.offset * 1e3))
                    : r
                    ? new Date(Date.UTC(p, y, v, D, M, g, Y))
                    : new Date(p, y, v, D, M, g, Y);
            } catch (t) {
                return new Date("");
            }
        };
        return function (e, n, r) {
            var o = n.prototype,
                i = o.parse;
            o.parse = function (e) {
                var n = e.date,
                    o = e.utc,
                    s = e.args;
                this.$u = o;
                var a = s[1];
                if ("string" == typeof a) {
                    var h = !0 === s[2],
                        u = !0 === s[3],
                        d = h || u,
                        c = s[2];
                    u && (c = s[2]),
                        h || (t = c ? r.Ls[c] : this.$locale()),
                        (this.$d = f(n, a, o)),
                        this.init(),
                        c && !0 !== c && (this.$L = this.locale(c).$L),
                        d && n !== this.format(a) && (this.$d = new Date(""));
                } else if (a instanceof Array)
                    for (var l = a.length, m = 1; m <= l; m += 1) {
                        s[1] = a[m - 1];
                        var v = r.apply(this, s);
                        if (v.isValid()) {
                            (this.$d = v.$d), (this.$L = v.$L), this.init();
                            break;
                        }
                        m === l && (this.$d = new Date(""));
                    }
                else i.call(this, e);
            };
        };
    })()
);

/**
 * dayjs_plugin_utc
 * Version: 1.8.36
 */
!(function (t, i) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = i())
        : "function" == typeof define && define.amd
        ? define(i)
        : (t.dayjs_plugin_utc = i());
})(this, function () {
    "use strict";
    return function (t, i, u) {
        var o = new Date().getTimezoneOffset(),
            e = i.prototype;
        (u.utc = function (t) {
            return new i({ date: t, utc: !0, args: arguments });
        }),
            (e.utc = function () {
                return u(this.toDate(), { locale: this.$L, utc: !0 });
            }),
            (e.local = function () {
                return u(this.toDate(), { locale: this.$L, utc: !1 });
            });
        var s = e.parse;
        e.parse = function (t) {
            t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), s.call(this, t);
        };
        var n = e.init;
        e.init = function () {
            var t;
            this.$u
                ? ((t = this.$d),
                  (this.$y = t.getUTCFullYear()),
                  (this.$M = t.getUTCMonth()),
                  (this.$D = t.getUTCDate()),
                  (this.$W = t.getUTCDay()),
                  (this.$H = t.getUTCHours()),
                  (this.$m = t.getUTCMinutes()),
                  (this.$s = t.getUTCSeconds()),
                  (this.$ms = t.getUTCMilliseconds()))
                : n.call(this);
        };
        var f = e.utcOffset;
        e.utcOffset = function (t, i) {
            var e = this.$utils().u;
            if (e(t)) return this.$u ? 0 : e(this.$offset) ? f.call(this) : this.$offset;
            var s = Math.abs(t) <= 16 ? 60 * t : t,
                n = this;
            return (
                i
                    ? ((n.$offset = s), (n.$u = 0 === t))
                    : 0 !== t
                    ? ((n = this.local().add(s + o, "minute")).$offset = s)
                    : (n = this.utc()),
                n
            );
        };
        var r = e.format;
        (e.format = function (t) {
            var i = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
            return r.call(this, i);
        }),
            (e.valueOf = function () {
                var t = this.$utils().u(this.$offset) ? 0 : this.$offset + o;
                return this.$d.valueOf() - 6e4 * t;
            }),
            (e.isUTC = function () {
                return !!this.$u;
            }),
            (e.toISOString = function () {
                return this.toDate().toISOString();
            }),
            (e.toString = function () {
                return this.toDate().toUTCString();
            });
        var a = e.toDate;
        e.toDate = function (t) {
            return "s" === t && this.$offset ? u(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : a.call(this);
        };
        var c = e.diff;
        e.diff = function (t, i, e) {
            var s = this.local(),
                n = u(t).local();
            return c.call(s, n, i, e);
        };
    };
});

/**
 * dayjs_plugin_timezone
 * Version: 1.8.36
 */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define(e)
        : (t.dayjs_plugin_timezone = e());
})(this, function () {
    "use strict";
    var l = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 };
    return function (t, e, h) {
        function a(t, e) {
            for (
                var n = new Date(t),
                    i = new Intl.DateTimeFormat("en-US", {
                        hour12: !1,
                        timeZone: e,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }).formatToParts(n),
                    o = [],
                    r = 0;
                r < i.length;
                r += 1
            ) {
                var u = i[r],
                    a = u.type,
                    f = u.value,
                    s = l[a];
                0 <= s && (o[s] = parseInt(f, 10));
            }
            var d = o[3],
                c = 24 === d ? 0 : d,
                m = o[0] + "-" + o[1] + "-" + o[2] + " " + c + ":" + o[4] + ":" + o[5] + ":000",
                v = +n;
            return (h.utc(m).valueOf() - (v -= v % 1e3)) / 6e4;
        }
        var f,
            i = h().utcOffset();
        (e.prototype.tz = function (t) {
            void 0 === t && (t = f);
            var e = this.toDate().toLocaleString("en-US", { timeZone: t }),
                n = Math.round((this.toDate() - new Date(e)) / 1e3 / 60);
            return h(e)
                .utcOffset(i - n, !0)
                .$set("ms", this.$ms);
        }),
            (h.tz = function (t, e) {
                void 0 === e && (e = f);
                var n,
                    i = a(+h(), e);
                "string" != typeof t && (n = h(t) + 60 * i * 1e3);
                var o = (function (t, e, n) {
                        var i = t - 60 * e * 1e3,
                            o = a(i, n);
                        if (e === o) return [i, e];
                        var r = a((i -= 60 * (o - e) * 1e3), n);
                        return o === r ? [i, o] : [t - 60 * Math.min(o, r) * 1e3, Math.max(o, r)];
                    })((n = n || h.utc(t).valueOf()), i, e),
                    r = o[0],
                    u = o[1];
                return h(r).utcOffset(u);
            }),
            (h.tz.guess = function () {
                return Intl.DateTimeFormat().resolvedOptions().timeZone;
            }),
            (h.tz.setDefault = function (t) {
                f = t;
            });
    };
});

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
