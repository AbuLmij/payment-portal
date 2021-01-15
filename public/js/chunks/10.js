(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/OrderDetails.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/OrderDetails.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  computed: {
    activeUserInfo: function activeUserInfo() {
      return this.$store.state.AppActiveUser;
    }
  },
  data: function data() {
    return {
      // GRID
      gridItemSelected: [],
      gridSortCol: 'domain',
      gridSortDir: 'asc',
      gridData: []
    };
  },
  mounted: function mounted() {
    this.getGridData();
  },
  methods: {
    gridSort: function gridSort(col, direction) {
      if (direction) {
        this.gridSortDir = direction;
        this.gridSortCol = col;
        this.getGridData();
      }
    },
    getGridData: function getGridData() {
      var _this = this;

      this.$vs.loading(); // Valid

      this.$http.get("/orders/".concat(this.$route.params.orderRefNum), {
        params: {
          sort_col: this.gridSortCol,
          sort_dir: this.gridSortDir
        }
      }).then(function (response) {
        _this.gridData = response.data.data;
      }, function (error) {
        var ErrorMsg = '';

        if (error.response.data.message !== undefined) {
          ErrorMsg += error.response.data.message + '<br>';
        }

        if (error.response.data.errors !== undefined) {
          for (var key in error.response.data.errors) {
            ErrorMsg += error.response.data.errors[key] + '<br>';
          }
        }

        _this.$vs.notify({
          color: 'danger',
          title: 'Error',
          text: ErrorMsg
        });
      })["finally"](function () {
        _this.$vs.loading.close();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/OrderDetails.vue?vue&type=template&id=7b236f3e&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/OrderDetails.vue?vue&type=template&id=7b236f3e& ***!
  \**************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "my-orders-page" } }, [
    _c("div", { staticClass: "vx-row" }, [
      _c(
        "div",
        { staticClass: "vx-col w-full" },
        [
          _c(
            "vx-card",
            { staticClass: "mt-base", attrs: { id: "grid_section" } },
            [
              _c("h3", [
                _vm._v("Order " + _vm._s(this.$route.params.orderRefNum))
              ]),
              _vm._v(" "),
              _c(
                "vs-table",
                {
                  ref: "listview",
                  attrs: { sst: true, data: _vm.gridData, stripe: "" },
                  on: { sort: _vm.gridSort },
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
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].domain) +
                                      "\n                            "
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
                                        _vm._f("numeralFormat")(
                                          data[indextr].google_index,
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
                                { attrs: { data: data[indextr].price } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm._f("numeralFormat")(
                                          data[indextr].price,
                                          "$ 0,0.00"
                                        )
                                      ) +
                                      "\n                            "
                                  )
                                ]
                              )
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
                    { slot: "thead" },
                    [
                      _c("vs-th", { attrs: { "sort-key": "domains.domain" } }, [
                        _vm._v(
                          "\n                            Domain\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.domain_authority" } },
                        [
                          _vm._v(
                            "\n                            DA\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.referring_domains" } },
                        [
                          _vm._v(
                            "\n                            RD\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.domain_rating" } },
                        [
                          _vm._v(
                            "\n                            DR\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.trust_flow" } },
                        [
                          _vm._v(
                            "\n                            TF\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.citation_flow" } },
                        [
                          _vm._v(
                            "\n                            CF\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.google_index" } },
                        [
                          _vm._v(
                            "\n                            Google Index\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.monthly_uniques" } },
                        [
                          _vm._v(
                            "\n                            Monthly Uniques\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.category1" } },
                        [
                          _vm._v(
                            "\n                            1st Category\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.category2" } },
                        [
                          _vm._v(
                            "\n                            2nd Category\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.category2" } },
                        [
                          _vm._v(
                            "\n                            3rd Category\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "domains.top_level_domain" } },
                        [
                          _vm._v(
                            "\n                            TLD\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "orders_items.price" } },
                        [
                          _vm._v(
                            "\n                            Price ($)\n                        "
                          )
                        ]
                      )
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

/***/ "./resources/js/src/views/OrderDetails.vue":
/*!*************************************************!*\
  !*** ./resources/js/src/views/OrderDetails.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderDetails_vue_vue_type_template_id_7b236f3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderDetails.vue?vue&type=template&id=7b236f3e& */ "./resources/js/src/views/OrderDetails.vue?vue&type=template&id=7b236f3e&");
/* harmony import */ var _OrderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderDetails.vue?vue&type=script&lang=js& */ "./resources/js/src/views/OrderDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderDetails_vue_vue_type_template_id_7b236f3e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderDetails_vue_vue_type_template_id_7b236f3e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/OrderDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/OrderDetails.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/src/views/OrderDetails.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/OrderDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/OrderDetails.vue?vue&type=template&id=7b236f3e&":
/*!********************************************************************************!*\
  !*** ./resources/js/src/views/OrderDetails.vue?vue&type=template&id=7b236f3e& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetails_vue_vue_type_template_id_7b236f3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderDetails.vue?vue&type=template&id=7b236f3e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/OrderDetails.vue?vue&type=template&id=7b236f3e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetails_vue_vue_type_template_id_7b236f3e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderDetails_vue_vue_type_template_id_7b236f3e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);