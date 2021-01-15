(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/List.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/users/List.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  computed: {
    activeUserInfo: function activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    cartData: function cartData() {
      return this.$store.state.currentCartData;
    }
  },
  data: function data() {
    return {
      // GRID
      gridSelectAll: false,
      gridItemSelected: [],
      gridPage: 1,
      gridPageLimit: 5,
      gridTotalData: 0,
      gridSearchQuery: "",
      gridSortCol: 'name',
      gridSortDir: 'asc',
      gridPageLimitInfo: ' - - - - - ',
      gridPageLimitArr: [5, 10, 50, 100, 150, 200],
      gridData: []
    };
  },
  watch: {},
  mounted: function mounted() {
    this.getGridData();
  },
  methods: {
    // GRID
    gridSearch: function gridSearch(q) {
      this.gridSearchQuery = q ? q : '';
      this.getGridData();
    },
    gridChangePage: function gridChangePage(page) {
      this.gridPage = page;
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
    getGridData: function getGridData() {
      var _this = this;

      this.$vs.loading();
      var self = this.$data; // Valid

      this.$http.get('/admin/users', {
        params: {
          sort_col: self.gridSortCol,
          sort_dir: self.gridSortDir,
          page: self.gridPage,
          page_limit: self.gridPageLimit,
          q: self.gridSearchQuery
        }
      }).then(function (response) {
        self.gridData = response.data.data;
        var from = parseInt(response.data.from) || 0;
        var to = parseInt(response.data.to) || 0;
        self.gridPageLimitInfo = from + ' - ' + to + ' of ' + response.data.total;
        self.gridTotalData = response.data.total;

        _this.$vs.loading.close();
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
      });
    },
    editUser: function editUser(id) {
      this.$router.push("/admin/users/".concat(id, "/edit"));
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/List.vue?vue&type=template&id=1bff74a2&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/users/List.vue?vue&type=template&id=1bff74a2& ***!
  \******************************************************************************************************************************************************************************************************************/
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
                  attrs: {
                    sst: true,
                    total: _vm.gridTotalData,
                    "max-items": _vm.gridPageLimit,
                    data: _vm.gridData,
                    pagination: "",
                    search: "",
                    stripe: ""
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
                                { attrs: { data: data[indextr].type } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].type.toUpperCase()) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].name } },
                                [
                                  _c(
                                    "vs-button",
                                    {
                                      staticClass: "p-0",
                                      attrs: { type: "flat" },
                                      on: {
                                        click: function($event) {
                                          return _vm.editUser(data[indextr].id)
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(data[indextr].name) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].email } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].email) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].job_title } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].job_title) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].company } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].company) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].website } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].website) +
                                      "\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].vat_number } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(data[indextr].vat_number) +
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
                    { slot: "header" },
                    [
                      _c(
                        "vs-button",
                        {
                          staticClass: "mr-3 float-left",
                          attrs: { to: "/admin/users/create" }
                        },
                        [
                          _vm._v(
                            "\n                            Add\n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
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
                      _c("vs-th", { attrs: { "sort-key": "type" } }, [
                        _vm._v(
                          "\n                            Type\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "name" } }, [
                        _vm._v(
                          "\n                            Name\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "email" } }, [
                        _vm._v(
                          "\n                            E-mail\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "job_title" } }, [
                        _vm._v(
                          "\n                            Job title\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "company" } }, [
                        _vm._v(
                          "\n                            Company\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "website" } }, [
                        _vm._v(
                          "\n                            Website\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "vat_number" } }, [
                        _vm._v(
                          "\n                            Vat Number\n                        "
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

/***/ "./resources/js/src/views/admin/users/List.vue":
/*!*****************************************************!*\
  !*** ./resources/js/src/views/admin/users/List.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _List_vue_vue_type_template_id_1bff74a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.vue?vue&type=template&id=1bff74a2& */ "./resources/js/src/views/admin/users/List.vue?vue&type=template&id=1bff74a2&");
/* harmony import */ var _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/users/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _List_vue_vue_type_template_id_1bff74a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _List_vue_vue_type_template_id_1bff74a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/users/List.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/users/List.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/src/views/admin/users/List.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/users/List.vue?vue&type=template&id=1bff74a2&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/admin/users/List.vue?vue&type=template&id=1bff74a2& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_1bff74a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=template&id=1bff74a2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/List.vue?vue&type=template&id=1bff74a2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_1bff74a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_1bff74a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);