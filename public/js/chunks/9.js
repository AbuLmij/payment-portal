(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/MyOrders.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/MyOrders.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
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
      gridSortCol: 'created_at',
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

      this.$http.get('/orders/myorders', {
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
    },
    viewOrderData: function viewOrderData(order_ref_num) {
      this.$router.push('/orders/' + order_ref_num);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/MyOrders.vue?vue&type=template&id=62390e5b&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/MyOrders.vue?vue&type=template&id=62390e5b& ***!
  \**********************************************************************************************************************************************************************************************************/
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
                                { attrs: { data: data[indextr].order_id } },
                                [
                                  _c(
                                    "a",
                                    {
                                      attrs: { href: "#", color: "primary" },
                                      on: {
                                        click: function($event) {
                                          return _vm.viewOrderData(
                                            data[indextr].order_ref_num
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _c("b", [
                                        _vm._v(
                                          _vm._s(data[indextr].order_ref_num)
                                        )
                                      ])
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].created_at } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm._f("moment")(
                                          data[indextr].created_at,
                                          "MMM DD, YYYY hh:mm A"
                                        )
                                      ) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].domains } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].domains) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].domain_count } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].domain_count) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].total } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm._f("numeralFormat")(
                                          data[indextr].total,
                                          "$ 0,0.00"
                                        )
                                      ) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].status } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].status) +
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
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "orders.order_ref_num" } },
                        [
                          _vm._v(
                            "\n                            Order ID\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "orders.created_at" } },
                        [
                          _vm._v(
                            "\n                            Creation Date\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "domains" } }, [
                        _vm._v(
                          "\n                            Domains\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "domain_count" } }, [
                        _vm._v(
                          "\n                            Domain Count\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "orders.total" } }, [
                        _vm._v(
                          "\n                            Total ($)\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "orders.status" } }, [
                        _vm._v(
                          "\n                            Status\n                        "
                        )
                      ])
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

/***/ "./resources/js/src/views/MyOrders.vue":
/*!*********************************************!*\
  !*** ./resources/js/src/views/MyOrders.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyOrders_vue_vue_type_template_id_62390e5b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyOrders.vue?vue&type=template&id=62390e5b& */ "./resources/js/src/views/MyOrders.vue?vue&type=template&id=62390e5b&");
/* harmony import */ var _MyOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyOrders.vue?vue&type=script&lang=js& */ "./resources/js/src/views/MyOrders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MyOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MyOrders_vue_vue_type_template_id_62390e5b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MyOrders_vue_vue_type_template_id_62390e5b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/MyOrders.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/MyOrders.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/src/views/MyOrders.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MyOrders.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/MyOrders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/MyOrders.vue?vue&type=template&id=62390e5b&":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/MyOrders.vue?vue&type=template&id=62390e5b& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyOrders_vue_vue_type_template_id_62390e5b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MyOrders.vue?vue&type=template&id=62390e5b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/MyOrders.vue?vue&type=template&id=62390e5b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyOrders_vue_vue_type_template_id_62390e5b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyOrders_vue_vue_type_template_id_62390e5b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);