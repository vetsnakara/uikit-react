function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!function (t) {
  var e = {};
  function i(n) {
    if (e[n]) return e[n].exports;
    var a = e[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return t[n].call(a.exports, a, a.exports, i), a.l = !0, a.exports;
  }
  i.m = t, i.c = e, i.d = function (t, e, n) {
    i.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: n
    });
  }, i.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, i.t = function (t, e) {
    if (1 & e && (t = i(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var a in t) i.d(n, a, function (e) {
      return t[e];
    }.bind(null, a));
    return n;
  }, i.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };
    return i.d(e, "a", e), e;
  }, i.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, i.p = "/assets/main-theme/js/", i(i.s = 0);
}([function (t, e, i) {
  t.exports = i(1);
}, function (t, e) {
  function i(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }
  var n = 20,
    a = function () {
      function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.id = e.id || (1e8 * Math.random()).toString(32).replace(".", "-") + "-" + (1e8 * Math.random()).toString(32).replace(".", "-"), this.structure = e.structure || {}, this.virtualSource = e.virtualSource || "", this.element = document.getElementById("_" + this.id), null === this.element) throw new Error("Не смог найти элемен для отрисовки. Элемент с id - " + this.id + " не существует");
        this.rowTemplate = document.getElementById("pealist_row_" + this.id).cloneNode(!0), this.rowTemplate.removeAttribute("id"), this.modalNode = document.getElementById("pealist_modal_" + this.id), this.paginationNode = document.getElementById("pealist_pagination_" + this.id), this.paginationNumberTemplate = document.getElementById("pealist_number_" + this.id).cloneNode(!0), this.paginationNumberTemplate.removeAttribute("id"), this.paginationPrevTemplate = this.paginationNode.querySelector(".pagination__item_previous").cloneNode(!0), this.paginationNextTemplate = this.paginationNode.querySelector(".pagination__item_next").cloneNode(!0), this.headerNodes = this.element.querySelectorAll("thead th"), this.initialized = !1, this.errorCounter = 0, this.maxErrors = 10, this.rowsOnPage = n, this.sortedCode = null, this.sortedDirection = 1, this.sortedClass = "table__sorting_up", this.currentPage = 0, this.accreditationIndexes = {
          date: null,
          otziv: null,
          prodl: null,
          ostanov: null
        }, this.accreditationDateColumnIndex = null, this.accreditationDateColumnCode = "date", this.revocationDateColumnIndex = null, this.revocationDateColumnCode = "otziv", this.initialization = this.initialization.bind(this), this.virtualSourceCallback = this.virtualSourceCallback.bind(this), this.renderDetails = this.renderDetails.bind(this), this.sortHandler = this.sortHandler.bind(this), this.paginationHandler = this.paginationHandler.bind(this), this.initialization();
      }
      var e, a, r;
      return e = t, (a = [{
        key: "initialization",
        value: function value() {
          if (clearInterval(this.timer), "function" != typeof window[this.virtualSource]) {
            if (this.errorCounter > this.maxErrors) throw new Error("Не могу получить ссылку на источник данных. Функции " + this.virtualSource + " не существует");
            return this.errorCounter++, void (this.timer = setInterval(this.initialization, 100));
          }
          window[this.virtualSource](null, this.virtualSourceCallback);
        }
      }, {
        key: "virtualSourceCallback",
        value: function value(t) {
          var e = this;
          this.data = {
            columns: JSON.parse(JSON.stringify(t.columns)),
            data: t.data.filter(function (t) {
              return null !== t;
            })
          }, this.currentPage = 0, this._filtersValues = t.filters_values;
          var i = function i(t) {
            e.accreditationIndexes[t] = e.data.columns.findIndex(function (e) {
              return t === e.code;
            }, e);
          };
          for (var n in this.accreditationIndexes) i(n);
          !0 !== this.initialized && (this._getData = t.url, this.setHandlers(), this.data.data = this.sortData(this.data.data, "reestr", this.data.columns, 1), this.initialized = !0), this.render();
        }
      }, {
        key: "render",
        value: function value() {
          var t = this,
            e = this.structure.filter(function (t) {
              return t.visible;
            }),
            i = this.element.querySelector('[data-content="container"]'),
            n = this.data.data.length > this.rowsOnPage ? this.currentPage * this.rowsOnPage : 0,
            a = this.data.data.length > this.rowsOnPage ? (this.currentPage + 1) * this.rowsOnPage : this.data.data.length;
          i.innerHTML = "";
          for (var r = function r(n) {
              if (n >= t.data.data.length) return "break";
              var a = t.data.data[n],
                r = t.rowTemplate.cloneNode(!0),
                o = t.isAccredited(a),
                s = r.querySelector('[data-content="vacancies"]'),
                d = ["/vacancy/search?_page=0"],
                l = t.data.columns.findIndex(function (t) {
                  return "inn" === t.code;
                }),
                c = t.data.columns.findIndex(function (t) {
                  return "regnum" === t.code;
                });
              r.setAttribute("data-id", a[0]), d.push("_inn=" + a[l]), d.push("_ogrn=" + a[c]), s.setAttribute("href", d.join("&"));
              var u = void 0;
              o || ((u = document.createElement("div")).classList.add("content_denied", "content_small"), u.textContent = "Аккредитация отозвана"), e.forEach(function (e) {
                var i = t.data.columns.findIndex(function (t) {
                    return t.code === e.code;
                  }),
                  n = r.querySelector('[data-content="cell-' + e.code + '"]');
                n && 0 === n.children.length && (n.textContent = a[i]), n && n.children.length > 0 && (n.children[0].textContent = a[i]), "reestr" === e.code && u && n.appendChild(u);
              }, t), i.appendChild(r);
            }, o = n; o < a && "break" !== r(o); o++);
          this.data.data.length < this.rowsOnPage ? this.paginationNode.classList.add("hidden") : this.renderPagination();
        }
      }, {
        key: "pagination",
        value: function value(t, e) {
          var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2,
            n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
          function a(t, e) {
            for (var i = Array(e - t), n = 0, a = t; n < i.length;) i[n++] = a++;
            return i;
          }
          var r = [],
            o = [],
            s = ["…"];
          if (t - i - n > 2) {
            var d = a(1, n + 1),
              l = a(t - i, t);
            r = r.concat(d, s, l);
          } else r = a(1, t);
          if (e - 2 > t + i + n - 1) {
            var c = a(1 + e - n, 1 + e),
              u = a(1 + t, 1 + t + i);
            o = o.concat(u, s, c);
          } else o = a(1 + t, 1 + e);
          return [].concat(r, t, o);
        }
      }, {
        key: "renderPagination",
        value: function value() {
          var t = Math.ceil(this.data.data.length / this.rowsOnPage),
            e = this.paginationNode.querySelector(".pagination"),
            i = this.pagination(this.currentPage + 1, t),
            n = 0 === this.currentPage,
            a = this.currentPage === t - 1;
          e.innerHTML = "", e.appendChild(this.paginationPrevTemplate), this.paginationPrevTemplate.classList[n ? "add" : "remove"]("pagination__item_disabled");
          var r = !0,
            o = !1,
            s = void 0;
          try {
            for (var d, l = i[Symbol.iterator](); !(r = (d = l.next()).done); r = !0) {
              var c = d.value,
                u = this.paginationNumberTemplate.cloneNode(!0),
                h = parseInt(c, 10);
              u.textContent = c, isNaN(h) ? u.classList.add("pagination__item_disabled") : (u.setAttribute("data-page", h), this.currentPage + 1 === h && u.classList.add("pagination__item_active")), e.appendChild(u);
            }
          } catch (t) {
            o = !0, s = t;
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (o) throw s;
            }
          }
          e.appendChild(this.paginationNextTemplate), this.paginationNextTemplate.classList[a ? "add" : "remove"]("pagination__item_disabled"), this.paginationNode.classList.remove("hidden");
        }
      }, {
        key: "renderDetails",
        value: function value(t) {
          var e = this,
            i = t.relatedTarget.closest("tr").getAttribute("data-id"),
            n = this.data.data.find(function (t) {
              return t[0] === i;
            }),
            a = this.modalNode.querySelector('[data-content="accreditation"]'),
            r = this.isAccredited(n);
          r ? a.setAttribute("hidden", !0) : a.removeAttribute("hidden", !0), this.data.columns.forEach(function (t) {
            var i = e.data.columns.findIndex(function (e) {
                return e.code === t.code;
              }),
              a = e.modalNode.querySelector(".infomodal_dd_" + t.code),
              o = n[i] || "-";
            if ("regnum" === t.code || !1 === t.visible) a.closest(".row").setAttribute("hidden", !0);else if ("inn" === t.code) {
              var s = e.modalNode.querySelector(".infomodal_dl_inn"),
                d = e.data.columns.findIndex(function (t) {
                  return "regnum" === t.code;
                });
              s && (s.innerHTML = "<b>ИНН / ОГРН</b>"), o = "".concat(o, " / ", n[d] || "-");
            } else "otziv" === t.code && r ? a.classList.remove("content_denied") : "otziv" === t.code && a.classList.add("content_denied");
            a && (a.textContent = o);
          }, this);
        }
      }, {
        key: "setHandlers",
        value: function value() {
          var t = this;
          this.headerNodes.forEach(function (e) {
            e.addEventListener("click", t.sortHandler);
          }), $(document.getElementById("pealist_modal_" + this.id)).on("show.bs.modal", this.renderDetails), this.paginationNode.addEventListener("click", this.paginationHandler);
        }
      }, {
        key: "sortHandler",
        value: function value(t) {
          var e = t.currentTarget.querySelector("[data-column-code"),
            i = e.getAttribute("data-column-code");
          if (i === this.sortedCode && (e.classList.remove(this.sortedClass), this.direction = -1 * this.direction, this.sortedClass = 1 === this.direction ? "table__sorting_up" : "table__sorting_down"), i !== this.sortedCode) {
            var n = this.element.querySelector('.table__title [data-column-code="' + this.sortedCode + '"]');
            n && n.classList.remove(this.sortedClass), this.sortedCode = i, this.direction = 1, this.sortedClass = "table__sorting_up";
          }
          e.classList.add(this.sortedClass), this.data.data = this.sortData(this.data.data, i, this.data.columns, this.direction), this.render();
        }
      }, {
        key: "paginationHandler",
        value: function value(t) {
          var e = this;
          t.preventDefault();
          var i = t.target.closest(".pagination__item"),
            n = i.classList.contains("pagination__item_next"),
            a = i.classList.contains("pagination__item_previous");
          null === i || i.classList.contains("pagination__item_disabled") || i.classList.contains("pagination__item_active") || (a && (this.currentPage -= 1), n && (this.currentPage += 1), n || a || (this.currentPage = parseInt(i.getAttribute("data-page") || 1, 10) - 1), setTimeout(function () {
            window.scroll(0, e.element.getBoundingClientRect().top + window.scrollY - 100);
          }, 150), this.render());
        }
      }, {
        key: "isAccredited",
        value: function value(t) {
          var e = t[this.accreditationIndexes.date],
            i = t[this.accreditationIndexes.otziv],
            n = this.convertDate(t[this.accreditationIndexes.prodl]),
            a = this.convertDate(t[this.accreditationIndexes.ostanov]);
          return Boolean(!a && e && (!i || n && n > i));
        }
      }, {
        key: "sortData",
        value: function value() {
          var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
            r = "string",
            o = null === n ? 0 : -1,
            s = e.slice();
          if (null === i) return s;
          if (null !== n) {
            if (-1 === (o = n.findIndex(function (t) {
              return t.code === i;
            }))) return s;
            r = n[o].type.toLowerCase();
          }
          return s.sort(function (e, i) {
            if (!t.isAccredited(e) && t.isAccredited(i)) return 1;
            if (t.isAccredited(e) && !t.isAccredited(i)) return -1;
            switch (r) {
              case "number":
                return (parseFloat(e[o], 10) - parseFloat(i[o], 10)) * a;
              default:
                return e[o] > i[o] ? 1 * a : -1 * a;
            }
          });
        }
      }, {
        key: "convertDate",
        value: function value(t) {
          var e,
            i,
            n,
            a = t.split(".");
          return 3 !== a.length ? null : (e = a[0], i = a[1] - 1, n = a[2], new Date(n, i, e));
        }
      }]) && i(e.prototype, a), r && i(e, r), t;
    }();
  window.PEAList = a;
}]);
