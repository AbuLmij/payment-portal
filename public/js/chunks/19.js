(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/Add.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/users/Add.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    'v-select': vue_select__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      type: "regular",
      name: "",
      email: "",
      job_title: "",
      company: "",
      website: "",
      vat_number: "",
      telephone_number: "",
      address: "",
      country: "",
      password: "",
      confirmPassword: "",
      showFormAlert: false,
      formStatus: false,
      formErrorMsg: ''
    };
  },
  mounted: function mounted() {},
  methods: {
    submitForm: function submitForm() {
      var _this = this;

      var self = this.$data; // RESET FORM ALERT

      self.showFormAlert = false;
      self.formStatus = false;
      self.formErrorMsg = '';
      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this.$vs.loading();

          _this.$http.post('/admin/users', {
            type: self.type,
            name: self.name,
            email: self.email,
            job_title: self.job_title,
            company: self.company,
            website: self.website,
            vat_number: self.vat_number,
            telephone_number: self.telephone_number,
            address: self.address,
            country: self.country,
            password: self.password,
            password_confirmation: self.confirmPassword
          }).then(function (response) {
            _this.$vs.loading.close();

            var success = {
              title: "User Added",
              description: response.data.message,
              color: "success",
              time: 5500
            };

            _this.$store.commit("MESSAGE_NOTIFICATION", success);

            _this.$router.push({
              name: 'Users'
            });
          }, function (error) {
            _this.$vs.loading.close();

            self.showFormAlert = true;
            self.formStatus = false;

            if (error.response.data.message !== undefined) {
              self.formErrorMsg = error.response.data.message + '<br>';
            }

            if (error.response.data.errors !== undefined) {
              for (var key in error.response.data.errors) {
                self.formErrorMsg += error.response.data.errors[key] + '<br>';
              }
            }
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/Add.vue?vue&type=template&id=1b8403c0&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/users/Add.vue?vue&type=template&id=1b8403c0& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
            "vs-align": "center",
            "vs-type": "flex",
            "vs-justify": "space-around",
            "vs-w": "12"
          }
        },
        [
          _c("div", { staticClass: "vx-col sm:w-full md:w-2/3 lg:w-2/4" }, [
            _c(
              "form",
              [
                _c(
                  "vx-card",
                  { staticClass: "mt-base", attrs: { title: "Details" } },
                  [
                    _c("v-select", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required",
                          expression: "'required'"
                        }
                      ],
                      attrs: {
                        label: "Type",
                        name: "type",
                        options: ["regular", "admin"]
                      },
                      model: {
                        value: _vm.type,
                        callback: function($$v) {
                          _vm.type = $$v
                        },
                        expression: "type"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("type"),
                            expression: "errors.has('type')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("type")))]
                    ),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|alpha_spaces|max:255",
                          expression: "'required|alpha_spaces|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: { label: "Full Name", name: "name" },
                      model: {
                        value: _vm.name,
                        callback: function($$v) {
                          _vm.name = $$v
                        },
                        expression: "name"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("name"),
                            expression: "errors.has('name')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("name")))]
                    ),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|email|max:255",
                          expression: "'required|email|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: { label: "Email Address", name: "email" },
                      model: {
                        value: _vm.email,
                        callback: function($$v) {
                          _vm.email = $$v
                        },
                        expression: "email"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("email"),
                            expression: "errors.has('email')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("email")))]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "vx-row" }, [
                      _c(
                        "div",
                        { staticClass: "vx-col xs:w-full md:w-1/2" },
                        [
                          _c("vs-input", {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate",
                                value: "max:255",
                                expression: "'max:255'"
                              }
                            ],
                            staticClass: "w-full mt-5",
                            attrs: { label: "Job Title", name: "job_title" },
                            model: {
                              value: _vm.job_title,
                              callback: function($$v) {
                                _vm.job_title = $$v
                              },
                              expression: "job_title"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.errors.has("job_title"),
                                  expression: "errors.has('job_title')"
                                }
                              ],
                              staticClass: "text-danger text-sm"
                            },
                            [_vm._v(_vm._s(_vm.errors.first("job_title")))]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "vx-col xs:w-full md:w-1/2" },
                        [
                          _c("vs-input", {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate",
                                value: "max:255",
                                expression: "'max:255'"
                              }
                            ],
                            staticClass: "w-full mt-5",
                            attrs: { label: "Company", name: "company" },
                            model: {
                              value: _vm.company,
                              callback: function($$v) {
                                _vm.company = $$v
                              },
                              expression: "company"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.errors.has("company"),
                                  expression: "errors.has('company')"
                                }
                              ],
                              staticClass: "text-danger text-sm"
                            },
                            [_vm._v(_vm._s(_vm.errors.first("company")))]
                          )
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "url:require_protocol|max:255",
                          expression: "'url:require_protocol|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: { label: "Website", name: "website" },
                      model: {
                        value: _vm.website,
                        callback: function($$v) {
                          _vm.website = $$v
                        },
                        expression: "website"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("website"),
                            expression: "errors.has('website')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("website")))]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "vx-row" }, [
                      _c(
                        "div",
                        { staticClass: "vx-col xs:w-full md:w-1/2" },
                        [
                          _c("vs-input", {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate",
                                value: "alpha_dash|max:255",
                                expression: "'alpha_dash|max:255'"
                              }
                            ],
                            staticClass: "w-full mt-5",
                            attrs: { label: "Vat Number", name: "vat_number" },
                            model: {
                              value: _vm.vat_number,
                              callback: function($$v) {
                                _vm.vat_number = $$v
                              },
                              expression: "vat_number"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.errors.has("vat_number"),
                                  expression: "errors.has('vat_number')"
                                }
                              ],
                              staticClass: "text-danger text-sm"
                            },
                            [_vm._v(_vm._s(_vm.errors.first("vat_number")))]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "vx-col xs:w-full md:w-1/2" },
                        [
                          _c("vs-input", {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate",
                                value: "max:255",
                                expression: "'max:255'"
                              }
                            ],
                            staticClass: "w-full mt-5",
                            attrs: {
                              label: "Telephone Number",
                              name: "telephone_number"
                            },
                            model: {
                              value: _vm.telephone_number,
                              callback: function($$v) {
                                _vm.telephone_number = $$v
                              },
                              expression: "telephone_number"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.errors.has("telephone_number"),
                                  expression: "errors.has('telephone_number')"
                                }
                              ],
                              staticClass: "text-danger text-sm"
                            },
                            [
                              _vm._v(
                                _vm._s(_vm.errors.first("telephone_number"))
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "max:255",
                          expression: "'max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: { label: "Address", name: "address" },
                      model: {
                        value: _vm.address,
                        callback: function($$v) {
                          _vm.address = $$v
                        },
                        expression: "address"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("address"),
                            expression: "errors.has('address')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("address")))]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary"
                      },
                      [
                        _c("label", { staticClass: "vs-input--label" }, [
                          _vm._v("Country")
                        ]),
                        _vm._v(" "),
                        _c("country-select", {
                          staticClass:
                            "w-full vs-inputx vs-input--input normal",
                          attrs: {
                            label: "Country",
                            name: "country",
                            countryName: ""
                          },
                          model: {
                            value: _vm.country,
                            callback: function($$v) {
                              _vm.country = $$v
                            },
                            expression: "country"
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.errors.has("country"),
                                expression: "errors.has('country')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [_vm._v(_vm._s(_vm.errors.first("country")))]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|min:8",
                          expression: "'required|min:8'"
                        }
                      ],
                      ref: "password",
                      staticClass: "w-full mt-10",
                      attrs: {
                        label: "Password",
                        type: "password",
                        name: "password"
                      },
                      model: {
                        value: _vm.password,
                        callback: function($$v) {
                          _vm.password = $$v
                        },
                        expression: "password"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("password"),
                            expression: "errors.has('password')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("password")))]
                    ),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|confirmed:password",
                          expression: "'required|confirmed:password'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: {
                        label: "Confirm Password",
                        type: "password",
                        name: "confirmPassword"
                      },
                      model: {
                        value: _vm.confirmPassword,
                        callback: function($$v) {
                          _vm.confirmPassword = $$v
                        },
                        expression: "confirmPassword"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("confirmPassword"),
                            expression: "errors.has('confirmPassword')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("confirmPassword")))]
                    ),
                    _vm._v(" "),
                    _vm.showFormAlert
                      ? _c(
                          "div",
                          {
                            staticClass: "flex flex-wrap justify-between my-5"
                          },
                          [
                            _vm.formStatus
                              ? _c(
                                  "vs-alert",
                                  {
                                    attrs: {
                                      title: "Success",
                                      active: "true",
                                      color: "success"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                              User Added\n                            "
                                    )
                                  ]
                                )
                              : _c(
                                  "vs-alert",
                                  {
                                    attrs: {
                                      title: "Error",
                                      active: "true",
                                      color: "danger"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                              " +
                                        _vm._s(_vm.formErrorMsg) +
                                        "\n                            "
                                    )
                                  ]
                                )
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "vx-row" }, [
                      _c(
                        "div",
                        { staticClass: "vx-col w-full" },
                        [
                          _c(
                            "vs-button",
                            {
                              staticClass: "mt-8 mb-8 float-right",
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.submitForm($event)
                                }
                              }
                            },
                            [_vm._v("Add")]
                          )
                        ],
                        1
                      )
                    ])
                  ],
                  1
                )
              ],
              1
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/admin/users/Add.vue":
/*!****************************************************!*\
  !*** ./resources/js/src/views/admin/users/Add.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Add_vue_vue_type_template_id_1b8403c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Add.vue?vue&type=template&id=1b8403c0& */ "./resources/js/src/views/admin/users/Add.vue?vue&type=template&id=1b8403c0&");
/* harmony import */ var _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Add.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/users/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Add_vue_vue_type_template_id_1b8403c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Add_vue_vue_type_template_id_1b8403c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/users/Add.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/users/Add.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/views/admin/users/Add.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/users/Add.vue?vue&type=template&id=1b8403c0&":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/views/admin/users/Add.vue?vue&type=template&id=1b8403c0& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_1b8403c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=template&id=1b8403c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/users/Add.vue?vue&type=template&id=1b8403c0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_1b8403c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_1b8403c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);