(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Import.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/domains/Import.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      uploadActionURL: process.env.MIX_DATA_API_URL + "admin/domains/import",
      headersUpload: {
        Authorization: "Bearer " + window.$cookies.get("_DMt")
      },
      file: null,
      showFormAlert: false,
      formStatus: false,
      formErrorMsg: "",
      importedData: [],
      showMappingOfData: false,
      fieldMapping: []
    };
  },
  mounted: function mounted() {
    var self = this; // $(document.body).on('click', '.btn-x-file', function () {
    //     self.showMappingOfData = false;
    //     self.importedData = [];
    //     self.fieldMapping = [];
    //
    // });
  },
  computed: {
    activeUserInfo: function activeUserInfo() {
      return this.$store.state.AppActiveUser;
    }
  },
  methods: {
    successUpload: function successUpload(response) {
      this.resetAlerts();
      var res = JSON.parse(response.currentTarget.response);
      this.$vs.loading.close();
      var notice = {
        title: 'Success',
        description: res.message,
        color: 'success',
        time: 4500
      };
      this.$store.commit("MESSAGE_NOTIFICATION", notice);
      this.$router.push({
        name: 'Domains List'
      }); // const formattedData = JSON.parse(data1);
      // self.importedData = formattedData.data;
      // self.fieldMapping = formattedData.fields;
      // self.showMappingOfData = true;
      // if (reply.length > 0) {
      // 	if (reply.length > 3) {
      // 		titleMessage = "Uploaded Anyway";
      // 		self.formErrorMsg = "Records are successfully added. But, there were domain names already exist in the table. Or the file column for domain names are empty.";
      // 		color = "warning";
      // 		time = 9500;
      // 	}
      // 	if (reply.length === 1) {
      // 		titleMessage = "Uploaded Anyway";
      // 		self.formErrorMsg = "But there were " + reply[0].errorInfo[2];
      // 		color = "warning";
      // 		time = 6000;
      // 	}
      // 	// console.log(reply, "replies");
      // }
    },
    errorUpload: function errorUpload(err) {
      var self = this.$data;
      this.resetAlerts();
      self.formErrorMsg = "";
      var titleMessage = "Oops!";
      var color = "danger";
      var time = 4500;
      var currentTarget = err.currentTarget; // Internal server error, then stop here to avoid errors on console

      if (currentTarget.status === 500) {
        var _fail = {
          title: titleMessage,
          description: "Something went wrong on your file. Make sure your file contains valid column records.",
          color: "danger",
          time: 5500
        };
        this.$store.commit("MESSAGE_NOTIFICATION", _fail);
        return;
      }

      var reply = JSON.parse(err.currentTarget.response);

      if (reply.message) {
        self.formErrorMsg = reply.message;
        time = 6500;
      }

      this.$vs.loading.close();
      var fail = {
        title: titleMessage,
        description: self.formErrorMsg,
        color: "danger",
        time: time
      };
      this.$store.commit("MESSAGE_NOTIFICATION", fail);
    },
    resetAlerts: function resetAlerts() {
      var self = this.$data;
      self.showFormAlert = false;
      self.formStatus = false;
      self.formErrorMsg = "";
    },
    submitFieldMapping: function submitFieldMapping() {
      var _this = this;

      this.$vs.loading();
      this.$http.post("admin/domains/save_mapping", {
        field_mapping: this.fieldMapping,
        data: this.importedData,
        user_id: this.activeUserInfo.id
      }).then(function (response) {
        _this.$vs.loading.close();

        var success = {
          title: "Success",
          description: "Data has been succesfully imported.",
          color: "success"
        };

        _this.$store.commit("MESSAGE_NOTIFICATION", success);

        _this.backToDomain();
      }, function (error) {
        _this.$vs.loading.close();

        var mssgDescription = "";

        if (error.response.data.message !== undefined) {
          mssgDescription = error.response.data.message;
        }

        if (error.response.data.errors !== undefined) {
          for (var key in error.response.data.errors) {
            mssgDescription += error.response.data.errors[key];
          }
        }

        var fail = {
          title: "Oops",
          description: mssgDescription,
          color: "danger"
        };

        _this.$store.commit("MESSAGE_NOTIFICATION", fail);
      });
    },
    backToDomain: function backToDomain() {
      this.$router.push({
        name: "Domains List"
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Import.vue?vue&type=template&id=0c1389ef&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/domains/Import.vue?vue&type=template&id=0c1389ef& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { attrs: { id: "domain-add" } },
    [
      _c(
        "vs-row",
        {
          attrs: {
            "vs-align": "flex-start",
            "vs-type": "flex",
            "vs-justify": "space-around",
            "vs-w": "12"
          }
        },
        [
          _c("div", { staticClass: "vx-col sm:w-full md:w-3/12 lg:w-3/12" }, [
            _c(
              "form",
              [
                _c(
                  "vx-card",
                  {
                    staticClass: "mt-base px-5 pt-3",
                    attrs: { title: "Import", id: "domain_import_form" }
                  },
                  [
                    _c("vs-upload", {
                      staticClass: "text-center",
                      attrs: {
                        automatic: "",
                        accept: ".csv,.xls,.xlsx",
                        action: _vm.uploadActionURL,
                        headers: _vm.headersUpload,
                        fileName: "importFile",
                        id: "file-input",
                        text: "Import Data",
                        limit: "1"
                      },
                      on: {
                        "on-success": _vm.successUpload,
                        "on-error": _vm.errorUpload
                      }
                    }),
                    _vm._v(" "),
                    _c("h6", { staticClass: "mt-4 mb-2" }, [
                      _vm._v("Import Guide:")
                    ]),
                    _vm._v(" "),
                    _c("small", [
                      _c("span", { staticClass: "text-warning text-bold" }, [
                        _vm._v(
                          "Your data should be in the correct format. The first line of your file should be the column headers."
                        )
                      ])
                    ])
                  ],
                  1
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _vm.showMappingOfData
            ? _c(
                "div",
                { staticClass: "vx-col sm:w-full md:w-7/12 lg:w-7/12" },
                [
                  _c(
                    "vx-card",
                    {
                      staticClass: "mt-base px-5 pt-3",
                      attrs: { title: "Field Mapping" }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "flex justify-center items-center my-2"
                        },
                        [
                          _c(
                            "vs-button",
                            {
                              staticClass: "text-center",
                              attrs: {
                                color: "primary",
                                type: "filled",
                                icon: "publish"
                              },
                              on: { click: _vm.submitFieldMapping }
                            },
                            [_vm._v("Upload Data\n                    ")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "table",
                        {
                          staticClass:
                            "flex justify-center align-center flex-col md:px-10 lg:px-10"
                        },
                        _vm._l(_vm.fieldMapping, function(item, index) {
                          return _c(
                            "tr",
                            {
                              key: index,
                              staticClass: "flex justify-center align-center"
                            },
                            [
                              _c("td", { staticClass: "py-1 px-3 w-1/3" }, [
                                _c("span", { staticClass: "text-bold" }, [
                                  _vm._v(_vm._s(item.field))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "py-1 px-3 w-3/4" }, [
                                _c(
                                  "select",
                                  {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: item.index_of_csv_field,
                                        expression: "item.index_of_csv_field"
                                      }
                                    ],
                                    staticClass:
                                      "w-full text-md py-2 px-3 border-1 border-grey rounded-lg",
                                    on: {
                                      change: function($event) {
                                        var $$selectedVal = Array.prototype.filter
                                          .call($event.target.options, function(
                                            o
                                          ) {
                                            return o.selected
                                          })
                                          .map(function(o) {
                                            var val =
                                              "_value" in o ? o._value : o.value
                                            return val
                                          })
                                        _vm.$set(
                                          item,
                                          "index_of_csv_field",
                                          $event.target.multiple
                                            ? $$selectedVal
                                            : $$selectedVal[0]
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c("option", {
                                      staticClass: "block font-semibold",
                                      attrs: { value: "", selected: "" }
                                    }),
                                    _vm._v(" "),
                                    _vm._l(_vm.importedData[0], function(
                                      data,
                                      i
                                    ) {
                                      return _c(
                                        "option",
                                        {
                                          key: i,
                                          staticClass: "block font-semibold",
                                          domProps: { value: i }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(data) +
                                              "\n                                "
                                          )
                                        ]
                                      )
                                    })
                                  ],
                                  2
                                )
                              ])
                            ]
                          )
                        }),
                        0
                      )
                    ]
                  )
                ],
                1
              )
            : _vm._e()
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/admin/domains/Import.vue":
/*!*********************************************************!*\
  !*** ./resources/js/src/views/admin/domains/Import.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Import_vue_vue_type_template_id_0c1389ef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Import.vue?vue&type=template&id=0c1389ef& */ "./resources/js/src/views/admin/domains/Import.vue?vue&type=template&id=0c1389ef&");
/* harmony import */ var _Import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Import.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/domains/Import.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Import_vue_vue_type_template_id_0c1389ef___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Import_vue_vue_type_template_id_0c1389ef___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/domains/Import.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/domains/Import.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/admin/domains/Import.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Import.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Import.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/domains/Import.vue?vue&type=template&id=0c1389ef&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/admin/domains/Import.vue?vue&type=template&id=0c1389ef& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Import_vue_vue_type_template_id_0c1389ef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Import.vue?vue&type=template&id=0c1389ef& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Import.vue?vue&type=template&id=0c1389ef&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Import_vue_vue_type_template_id_0c1389ef___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Import_vue_vue_type_template_id_0c1389ef___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);