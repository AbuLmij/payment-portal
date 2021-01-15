(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Domains.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/Domains.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  computed: {
    activeUserInfo: function activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    userType: function userType() {
      return this.$store.getters["getUserType"];
    },
    cartData: function cartData() {
      return this.$store.state.currentCartData;
    },
    gridDataFilterPriceLabel: function gridDataFilterPriceLabel() {
      var label = this.gridDataFilter.price[0] > 0 ? this.gridDataFilter.price[0] + ",000" : "0";
      label += "-";
      label += this.gridDataFilter.price[1] > 0 ? this.gridDataFilter.price[1] + ",000" : "0";
      return label;
    },
    gridDataFilterDALabel: function gridDataFilterDALabel() {
      return this.gridDataFilter.domain_authority[0] + "-" + this.gridDataFilter.domain_authority[1];
    },
    gridDataFilterRDLabel: function gridDataFilterRDLabel() {
      var label = this.gridDataFilter.referring_domains[0] > 0 ? this.gridDataFilter.referring_domains[0] + ",000" : "0";
      label += "-";
      label += this.gridDataFilter.referring_domains[1] > 0 ? this.gridDataFilter.referring_domains[1] + ",000" : "0";
      return label;
    },
    gridDataFilterDRLabel: function gridDataFilterDRLabel() {
      return this.gridDataFilter.domain_rating[0] + "-" + this.gridDataFilter.domain_rating[1];
    },
    gridDataFilterTFLabel: function gridDataFilterTFLabel() {
      return this.gridDataFilter.trust_flow[0] + "-" + this.gridDataFilter.trust_flow[1];
    },
    gridDataFilterCFLabel: function gridDataFilterCFLabel() {
      return this.gridDataFilter.citation_flow[0] + "-" + this.gridDataFilter.citation_flow[1];
    },
    gridDataFilterMonthlyUniqueLabel: function gridDataFilterMonthlyUniqueLabel() {
      var label = this.gridDataFilter.monthly_uniques[0] > 0 ? this.gridDataFilter.monthly_uniques[0] + "0,000" : "0";
      label += "-";
      label += this.gridDataFilter.monthly_uniques[1] > 0 ? this.gridDataFilter.monthly_uniques[1] + "0,000" : "0";
      return label;
    }
  },
  data: function data() {
    return {
      // FILTERS
      gridDataFilter: {
        price: [0, 4],
        domain_authority: [0, 100],
        referring_domains: [0, 10],
        domain_rating: [0, 100],
        trust_flow: [0, 100],
        citation_flow: [0, 100],
        monthly_uniques: [0, 10],
        top_level_domain: "",
        lang: "",
        added_days: "",
        search_keyword: "",
        searchCategory1: true,
        searchCategory2: true,
        searchCategory3: true,
        google_index: true
      },
      defaultGridDataFilter: {
        price: [0, 4],
        domain_authority: [0, 100],
        referring_domains: [0, 10],
        domain_rating: [0, 100],
        trust_flow: [0, 100],
        citation_flow: [0, 100],
        monthly_uniques: [0, 10],
        top_level_domain: "",
        lang: "",
        added_days: "",
        search_keyword: "",
        searchCategory1: true,
        searchCategory2: true,
        searchCategory3: true,
        google_index: true
      },
      // GRID
      gridItemSelected: [],
      gridPage: 1,
      gridPageLimit: 50,
      gridTotalData: 0,
      gridSearchQuery: "",
      gridSortCol: "domain",
      gridSortDir: "asc",
      gridPageLimitInfo: " - - - - - ",
      gridPageLimitArr: [50, 100, 150, 200],
      gridData: []
    };
  },
  watch: {
    gridDataFilterPriceLabel: _.debounce(function () {
      this.getGridData();
    }, 2000, {
      maxWait: 3000
    }),
    gridDataFilterDALabel: _.debounce(function () {
      this.getGridData();
    }, 2000, {
      maxWait: 3000
    }),
    gridDataFilterRDLabel: _.debounce(function () {
      this.getGridData();
    }, 2000, {
      maxWait: 3000
    }),
    gridDataFilterDRLabel: _.debounce(function () {
      this.getGridData();
    }, 2000, {
      maxWait: 3000
    }),
    gridDataFilterTFLabel: _.debounce(function () {
      this.getGridData();
    }, 2000, {
      maxWait: 3000
    }),
    gridDataFilterCFLabel: _.debounce(function () {
      this.getGridData();
    }, 2000, {
      maxWait: 3000
    }),
    gridDataFilterMonthlyUniqueLabel: _.debounce(function () {
      this.getGridData();
    }, 2000, {
      maxWait: 3000
    }),
    gridPageLimit: _.debounce(function (val) {
      this.gridChangePageLimit(val);
    }, 2000, {
      maxWait: 3000
    })
  },
  mounted: function mounted() {
    this.getGridData(); // 	this.$store.dispatch('updateCartData',JSON.parse('{ "order":[], "order_item":[] }'))
  },
  methods: {
    // GRID
    gridSearch: function gridSearch(q) {
      this.gridSearchQuery = q ? q : '';
      this.getGridData();
    },
    gridChangePage: function gridChangePage(page) {
      this.$data.gridPage = page;
      this.getGridData();
    },
    gridSort: function gridSort(col, direction) {
      if (direction) {
        this.gridSortDir = direction;
        this.gridSortCol = col;
        this.getGridData();
      }
    },
    gridChangePageLimit: function gridChangePageLimit(limit) {
      this.$data.gridPageLimit = limit;
      this.getGridData();
    },
    gridClearFilters: function gridClearFilters() {
      var self = this.$data;
      self.gridDataFilter = self.defaultGridDataFilter;
      this.getGridData();
    },
    getGridData: function getGridData() {
      var _this = this;

      var self = this.$data;
      this.$vs.loading(); // Valid

      this.$http.get("/domains", {
        params: {
          sort_col: self.gridSortCol,
          sort_dir: self.gridSortDir,
          page: self.gridPage,
          page_limit: self.gridPageLimit,
          q: self.gridSearchQuery,
          gridDataFilter: self.gridDataFilter
        }
      }).then(function (response) {
        response.data = response.data.data;
        var dataLength = parseInt(response.data.length) || 0;
        var currGridPage = parseInt(_this.$data.gridPage);
        var currGridPageLimit = parseInt(_this.$data.gridPageLimit);
        var from = 1;

        if (currGridPage > 1) {
          from = currGridPageLimit;

          if (currGridPage > 2) {
            from = (currGridPage - 1) * currGridPageLimit;
          }

          from++;
        }

        var to = currGridPage > 1 ? currGridPage * currGridPageLimit : currGridPageLimit;
        to = to > dataLength ? dataLength : to;
        self.gridPageLimitInfo = from + " - " + to + " of " + dataLength;

        if (dataLength > 0) {
          self.gridData = response.data;
        } else {
          self.gridData = [];
        }

        _this.$store.commit("UPDATE_DOMAINS_DATA", self.gridData);

        self.gridTotalData = dataLength;

        _this.$vs.loading.close();
      }, function (error) {
        //console.log(error);
        var ErrorMsg = "";

        if (error.response.data.message !== undefined) {
          ErrorMsg += error.response.data.message + "<br>";
        }

        if (error.response.data.errors !== undefined) {
          for (var key in error.response.data.errors) {
            ErrorMsg += error.response.data.errors[key] + "<br>";
          }
        }

        _this.$vs.notify({
          color: "danger",
          title: "Error",
          text: ErrorMsg
        });

        _this.$vs.loading.close();
      });
    },
    toggleCartStatus: function toggleCartStatus(domain_id) {
      if (this.gridData.find(function (d) {
        return d.id === domain_id;
      }).is_in_cart) {
        this.removeFromCart(domain_id);
      } else {
        this.addToCart([domain_id]);
      }
    },
    removeFromCart: function removeFromCart(domain_id) {
      var _this2 = this;

      this.$vs.loading();
      this.$store.dispatch('removeItemFromCart', {
        domain_id: domain_id
      })["catch"](function (ErrorMsg) {
        _this2.$vs.notify({
          color: "danger",
          title: "Error",
          text: ErrorMsg
        });
      })["finally"](function () {
        _this2.$vs.loading.close();
      });
    },
    addToCart: function addToCart(ids) {
      var _this3 = this;

      this.$vs.loading();
      this.$http.post("/orders/addToCart", {
        ids: ids
      }).then(function (response) {
        _this3.$vs.loading.close();

        _this3.$store.dispatch("updateCartData", response.data.data);

        _this3.$store.commit('UPDATE_DOMAIN_CART_STATUS', {
          id: ids,
          status: 1
        });

        _this3.$vs.notify({
          color: "success",
          title: "Cart Updated",
          text: "Added Item in Cart"
        });
      }, function (error) {
        _this3.$vs.loading.close();

        var ErrorMsg = "";

        if (error.response.data.message !== undefined) {
          ErrorMsg += error.response.data.message + "<br>";
        }

        if (error.response.data.errors !== undefined) {
          for (var key in error.response.data.errors) {
            ErrorMsg += error.response.data.errors[key] + "<br>";
          }
        }

        _this3.$vs.notify({
          color: "danger",
          title: "Error",
          text: ErrorMsg
        });
      });
    },
    gridAddCartAll: function gridAddCartAll() {
      var self = this.$data;
      var domainIds = self.gridData.map(function (domain) {
        return domain.id;
      });

      if (domainIds.length > 0) {
        this.addToCart(domainIds);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Domains.vue?vue&type=template&id=6b053c75&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/Domains.vue?vue&type=template&id=6b053c75& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "domains-page" } }, [
    _c("div", { staticClass: "vx-row" }, [
      _c(
        "div",
        { staticClass: "vx-col sm:w-full md:w-1/4 lg:w-1/6" },
        [
          _c(
            "vx-card",
            {
              staticClass: "mt-base",
              attrs: { id: "filter_section", title: "Filters" }
            },
            [
              _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _vm._v(
                    "\n                    Price Range ($)\n                    "
                  ),
                  _c("vs-slider", {
                    attrs: {
                      color: "primary",
                      ticks: "",
                      step: "1",
                      "text-fixed": "K",
                      max: "4"
                    },
                    model: {
                      value: _vm.gridDataFilter.price,
                      callback: function($$v) {
                        _vm.$set(_vm.gridDataFilter, "price", $$v)
                      },
                      expression: "gridDataFilter.price"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full text-center" }, [
                    _c("small", [_vm._v(_vm._s(_vm.gridDataFilterPriceLabel))])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _vm._v("\n                    DA\n                    "),
                  _c("vs-slider", {
                    attrs: {
                      color: "primary",
                      ticks: "",
                      step: "1",
                      max: "100"
                    },
                    model: {
                      value: _vm.gridDataFilter.domain_authority,
                      callback: function($$v) {
                        _vm.$set(_vm.gridDataFilter, "domain_authority", $$v)
                      },
                      expression: "gridDataFilter.domain_authority"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full text-center" }, [
                    _c("small", [_vm._v(_vm._s(_vm.gridDataFilterDALabel))])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _vm._v("\n                    RD\n                    "),
                  _c("vs-slider", {
                    attrs: {
                      color: "primary",
                      ticks: "",
                      step: "1",
                      "text-fixed": "0K",
                      max: "10"
                    },
                    model: {
                      value: _vm.gridDataFilter.referring_domains,
                      callback: function($$v) {
                        _vm.$set(_vm.gridDataFilter, "referring_domains", $$v)
                      },
                      expression: "gridDataFilter.referring_domains"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full text-center" }, [
                    _c("small", [_vm._v(_vm._s(_vm.gridDataFilterRDLabel))])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _vm._v("\n                    DR\n                    "),
                  _c("vs-slider", {
                    attrs: {
                      color: "primary",
                      ticks: "",
                      step: "1",
                      max: "100"
                    },
                    model: {
                      value: _vm.gridDataFilter.domain_rating,
                      callback: function($$v) {
                        _vm.$set(_vm.gridDataFilter, "domain_rating", $$v)
                      },
                      expression: "gridDataFilter.domain_rating"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full text-center" }, [
                    _c("small", [_vm._v(_vm._s(_vm.gridDataFilterDRLabel))])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _vm._v("\n                    TF\n                    "),
                  _c("vs-slider", {
                    attrs: {
                      color: "primary",
                      ticks: "",
                      step: "1",
                      max: "100"
                    },
                    model: {
                      value: _vm.gridDataFilter.trust_flow,
                      callback: function($$v) {
                        _vm.$set(_vm.gridDataFilter, "trust_flow", $$v)
                      },
                      expression: "gridDataFilter.trust_flow"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full text-center" }, [
                    _c("small", [_vm._v(_vm._s(_vm.gridDataFilterTFLabel))])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _vm._v("\n                    CF\n                    "),
                  _c("vs-slider", {
                    attrs: {
                      color: "primary",
                      ticks: "",
                      step: "1",
                      max: "100"
                    },
                    model: {
                      value: _vm.gridDataFilter.citation_flow,
                      callback: function($$v) {
                        _vm.$set(_vm.gridDataFilter, "citation_flow", $$v)
                      },
                      expression: "gridDataFilter.citation_flow"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full text-center" }, [
                    _c("small", [_vm._v(_vm._s(_vm.gridDataFilterCFLabel))])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _vm._v(
                    "\n                    Monthly Uniques\n                    "
                  ),
                  _c("vs-slider", {
                    attrs: {
                      color: "primary",
                      ticks: "",
                      step: "1",
                      "text-fixed": "0K",
                      max: "10"
                    },
                    model: {
                      value: _vm.gridDataFilter.monthly_uniques,
                      callback: function($$v) {
                        _vm.$set(_vm.gridDataFilter, "monthly_uniques", $$v)
                      },
                      expression: "gridDataFilter.monthly_uniques"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full text-center" }, [
                    _c("small", [
                      _vm._v(_vm._s(_vm.gridDataFilterMonthlyUniqueLabel))
                    ])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row mb-3" }, [
                _c("div", { staticClass: "vx-col w-full" }, [
                  _c("span", [_vm._v("TLD")])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      on: { change: _vm.getGridData },
                      model: {
                        value: _vm.gridDataFilter.top_level_domain,
                        callback: function($$v) {
                          _vm.$set(_vm.gridDataFilter, "top_level_domain", $$v)
                        },
                        expression: "gridDataFilter.top_level_domain"
                      }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row mb-3" }, [
                _c("div", { staticClass: "vx-col w-full" }, [
                  _c("span", [_vm._v("Language")])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      on: { change: _vm.getGridData },
                      model: {
                        value: _vm.gridDataFilter.lang,
                        callback: function($$v) {
                          _vm.$set(_vm.gridDataFilter, "lang", $$v)
                        },
                        expression: "gridDataFilter.lang"
                      }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row mb-3" }, [
                _c("div", { staticClass: "vx-col w-full" }, [
                  _c("span", [_vm._v("Added in the last days")])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      on: { change: _vm.getGridData },
                      model: {
                        value: _vm.gridDataFilter.added_days,
                        callback: function($$v) {
                          _vm.$set(_vm.gridDataFilter, "added_days", $$v)
                        },
                        expression: "gridDataFilter.added_days"
                      }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row mb-3" }, [
                _c("div", { staticClass: "vx-col w-full" }, [
                  _c("span", [_vm._v("Search by keyword")])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c("vs-input", {
                      staticClass: "w-full",
                      on: { change: _vm.getGridData },
                      model: {
                        value: _vm.gridDataFilter.search_keyword,
                        callback: function($$v) {
                          _vm.$set(_vm.gridDataFilter, "search_keyword", $$v)
                        },
                        expression: "gridDataFilter.search_keyword"
                      }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row mb-3" }, [
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c("span", [_vm._v("Search in")]),
                    _vm._v(" "),
                    _c(
                      "vs-checkbox",
                      {
                        staticClass: "mt-2 mb-3 ml-0",
                        on: { change: _vm.getGridData },
                        model: {
                          value: _vm.gridDataFilter.searchCategory1,
                          callback: function($$v) {
                            _vm.$set(_vm.gridDataFilter, "searchCategory1", $$v)
                          },
                          expression: "gridDataFilter.searchCategory1"
                        }
                      },
                      [_vm._v("1st Category\n                        ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-checkbox",
                      {
                        staticClass: "mb-3 ml-0",
                        on: { change: _vm.getGridData },
                        model: {
                          value: _vm.gridDataFilter.searchCategory2,
                          callback: function($$v) {
                            _vm.$set(_vm.gridDataFilter, "searchCategory2", $$v)
                          },
                          expression: "gridDataFilter.searchCategory2"
                        }
                      },
                      [_vm._v("2nd Category\n                        ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "vs-checkbox",
                      {
                        staticClass: "mb-3 ml-0",
                        on: { change: _vm.getGridData },
                        model: {
                          value: _vm.gridDataFilter.searchCategory3,
                          callback: function($$v) {
                            _vm.$set(_vm.gridDataFilter, "searchCategory3", $$v)
                          },
                          expression: "gridDataFilter.searchCategory3"
                        }
                      },
                      [_vm._v("3rd Category\n                        ")]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row mb-3" }, [
                _c("div", { staticClass: "vx-col" }, [
                  _vm._v("Domains per Page")
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-col" },
                  [
                    _c(
                      "center",
                      [
                        _c("vs-input-number", {
                          staticStyle: { width: "95px" },
                          attrs: { step: 50, min: 50, max: 200 },
                          model: {
                            value: _vm.gridPageLimit,
                            callback: function($$v) {
                              _vm.gridPageLimit = $$v
                            },
                            expression: "gridPageLimit"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row mt-3 mb-3" }, [
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c(
                      "vs-checkbox",
                      {
                        staticClass: "mb-3 ml-0",
                        on: { change: _vm.getGridData },
                        model: {
                          value: _vm.gridDataFilter.google_index,
                          callback: function($$v) {
                            _vm.$set(_vm.gridDataFilter, "google_index", $$v)
                          },
                          expression: "gridDataFilter.google_index"
                        }
                      },
                      [
                        _vm._v(
                          "\n                            Google Index\n                        "
                        )
                      ]
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "vs-button",
                {
                  staticClass: "w-full",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.gridClearFilters($event)
                    }
                  }
                },
                [_vm._v("Clear Filters")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "vx-col sm:w-full md:w-3/4 lg:w-5/6" },
        [
          _c(
            "vx-card",
            { staticClass: "mt-base", attrs: { id: "grid_section" } },
            [
              _c(
                "vs-table",
                {
                  attrs: {
                    sst: true,
                    stripe: "",
                    total: _vm.gridTotalData,
                    pagination: "",
                    maxItems: _vm.gridPageLimit,
                    search: "",
                    data: _vm.gridData
                  },
                  on: {
                    search: _vm.gridSearch,
                    "change-page": _vm.gridChangePage,
                    sort: _vm.gridSort
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(ref) {
                        var data = ref.data
                        return _vm._l(data, function(tr, indextr) {
                          return _c(
                            "vs-tr",
                            { key: indextr, attrs: { data: tr } },
                            [
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].domain } },
                                [
                                  _c(
                                    "strong",
                                    { staticClass: "text-primary" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(data[indextr].domain) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  attrs: {
                                    data: data[indextr].domain_authority
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].domain_authority) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  attrs: {
                                    data: data[indextr].referring_domains
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].referring_domains) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  attrs: { data: data[indextr].domain_rating }
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].domain_rating) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].trust_flow } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].trust_flow) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  attrs: { data: data[indextr].citation_flow }
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].citation_flow) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].google_index } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        data[indextr].google_index > 0
                                          ? "Yes"
                                          : "No"
                                      ) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  attrs: { data: data[indextr].monthly_uniques }
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm._f("numeralFormat")(
                                          data[indextr].monthly_uniques,
                                          "0,0"
                                        )
                                      ) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].category1 } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].category1) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].category2 } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].category2) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].category3 } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].category3) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  attrs: {
                                    data: data[indextr].top_level_domain
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].top_level_domain) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].lang } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].lang) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].added_days } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].added_days) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].guest_post } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        data[indextr].guest_post > 0
                                          ? "Yes"
                                          : "No"
                                      ) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                {
                                  staticClass: "pl-1 pr-1 pt-5 pb-5",
                                  attrs: { data: data[indextr].price }
                                },
                                [
                                  _c(
                                    "strong",
                                    { staticClass: "text-primary" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(
                                            _vm._f("numeralFormat")(
                                              data[indextr].price,
                                              "$ 0,0.00"
                                            )
                                          ) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _vm.userType !== "admin"
                                ? _c(
                                    "vs-td",
                                    { attrs: { data: tr.id } },
                                    [
                                      _c("vs-button", {
                                        staticClass: "btn-add-to-cart",
                                        class: {
                                          "text-primary": tr.is_in_cart,
                                          "text-secondary": !tr.is_in_cart
                                        },
                                        attrs: {
                                          color: "#eee",
                                          "text-color": "#adadad",
                                          type: "filled",
                                          icon: "shopping_cart"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.toggleCartStatus(tr.id)
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  )
                                : _vm._e()
                            ],
                            1
                          )
                        })
                      }
                    }
                  ]),
                  model: {
                    value: _vm.gridItemSelected,
                    callback: function($$v) {
                      _vm.gridItemSelected = $$v
                    },
                    expression: "gridItemSelected"
                  }
                },
                [
                  _c(
                    "template",
                    { slot: "header" },
                    [
                      _c(
                        "vs-dropdown",
                        { staticClass: "grid-limiter-info float-left" },
                        [
                          _c(
                            "a",
                            { staticClass: "a-icon", attrs: { href: "#" } },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.gridPageLimitInfo) +
                                  "\n                                "
                              ),
                              _c("vs-icon", {
                                staticClass:
                                  "notranslate icon-scale icon-select vs-select--icon",
                                attrs: { icon: "expand_more" }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-dropdown-menu",
                            _vm._l(_vm.gridPageLimitArr, function(item, index) {
                              return _c(
                                "vs-dropdown-item",
                                {
                                  key: index,
                                  staticStyle: { color: "inherit" },
                                  on: {
                                    click: function($event) {
                                      return _vm.gridChangePageLimit(item)
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(item) +
                                      "\n                                "
                                  )
                                ]
                              )
                            }),
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "template",
                    { slot: "thead" },
                    [
                      _c("vs-th", { attrs: { "sort-key": "domain" } }, [
                        _vm._v(" Domain")
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domain_authority" } },
                        [_vm._v(" DA")]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "referring_domains" } },
                        [_vm._v(" RD")]
                      ),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "domain_rating" } }, [
                        _vm._v(" DR")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "trust_flow" } }, [
                        _vm._v(" TF")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "citation_flow" } }, [
                        _vm._v(" CF")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "google_index" } }, [
                        _vm._v(" Google Index")
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "monthly_uniques" } },
                        [_vm._v(" Monthly Uniques")]
                      ),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "category1" } }, [
                        _vm._v(" 1st Category")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "category2" } }, [
                        _vm._v(" 2nd Category")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "category2" } }, [
                        _vm._v(" 3rd Category")
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "top_level_domain" } },
                        [_vm._v(" TLD")]
                      ),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "lang" } }, [
                        _vm._v(" Language")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "added_days" } }, [
                        _vm._v("\n                            Added "),
                        _c("br"),
                        _vm._v(
                          "\n                            (Days)\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "guest_post" } }, [
                        _vm._v(" Guest Post")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "price" } }, [
                        _vm._v(" Price ($)")
                      ]),
                      _vm._v(" "),
                      _vm.userType !== "admin"
                        ? _c(
                            "vs-td",
                            { staticClass: "text-center" },
                            [
                              _c("vs-button", {
                                attrs: {
                                  color: "primary",
                                  type: "filled",
                                  icon: "check"
                                },
                                on: { click: _vm.gridAddCartAll }
                              })
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                2
              )
            ],
            1
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/Domains.vue":
/*!********************************************!*\
  !*** ./resources/js/src/views/Domains.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Domains_vue_vue_type_template_id_6b053c75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Domains.vue?vue&type=template&id=6b053c75& */ "./resources/js/src/views/Domains.vue?vue&type=template&id=6b053c75&");
/* harmony import */ var _Domains_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Domains.vue?vue&type=script&lang=js& */ "./resources/js/src/views/Domains.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Domains_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Domains_vue_vue_type_template_id_6b053c75___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Domains_vue_vue_type_template_id_6b053c75___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/Domains.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/Domains.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/Domains.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Domains_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Domains.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Domains.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Domains_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/Domains.vue?vue&type=template&id=6b053c75&":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/Domains.vue?vue&type=template&id=6b053c75& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Domains_vue_vue_type_template_id_6b053c75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Domains.vue?vue&type=template&id=6b053c75& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Domains.vue?vue&type=template&id=6b053c75&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Domains_vue_vue_type_template_id_6b053c75___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Domains_vue_vue_type_template_id_6b053c75___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);