(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/ForgotPassword.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/login/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
window.$cookies.remove("_DMt");

var custom_err_message = {
  custom: {
    email: {
      required: "Email Address is required",
      email: "Please provide valid Email Address",
      max: "Maximum of 255 characters are allowed"
    }
  }
}; // register custom messages

vee_validate__WEBPACK_IMPORTED_MODULE_0__["Validator"].localize("en", custom_err_message);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      email: "",
      formError: false,
      formErrorMsg: "",
      registrationSuccess: false,
      registrationSuccessMsg: ""
    };
  },
  methods: {
    submitForm: function submitForm() {
      var _this = this;

      var self = this.$data; // RESET FORM ALERT

      self.formError = false;
      self.formErrorMsg = "";
      self.registrationSuccess = false;
      self.registrationSuccessMsg = "";
      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this.$vs.loading(); // Valid


          _this.$http.post("/auth/resetpassword", {
            email: self.email
          }).then(function (response) {
            _this.$vs.loading.close(); // self.registrationSuccess = true;
            // self.registrationSuccessMsg = response.data.message;


            var success = {
              title: "Reset password link sent",
              description: "Please check your email to reset your password.",
              color: "success"
            };

            _this.$store.commit("MESSAGE_NOTIFICATION", success);
          }, function (error) {
            _this.$vs.loading.close();

            var mssgDescription = "";
            self.formError = true;

            if (error.response.data.message !== undefined) {
              mssgDescription = error.response.data.message + "<br>";
            }

            if (error.response.data.errors !== undefined) {
              for (var key in error.response.data.errors) {
                mssgDescription += error.response.data.errors[key] + "<br>";
              }
            }

            var fail = {
              title: "Oops",
              description: mssgDescription,
              color: "danger"
            };

            _this.$store.commit("MESSAGE_NOTIFICATION", fail);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/ForgotPassword.vue?vue&type=template&id=9ec55f24&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/login/ForgotPassword.vue?vue&type=template&id=9ec55f24& ***!
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
    {
      staticClass:
        "h-screen flex w-full bg-img vx-row no-gutter items-center justify-center",
      attrs: { id: "page-login" }
    },
    [
      _c(
        "div",
        {
          staticClass: "vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"
        },
        [
          _c(
            "vx-card",
            {
              staticClass: "login-register-form-wrapper",
              attrs: { fixedHeight: "" }
            },
            [
              _c(
                "div",
                {
                  staticClass: "full-page-bg-color",
                  attrs: { slot: "no-body" },
                  slot: "no-body"
                },
                [
                  _c(
                    "vs-row",
                    {
                      staticClass: "bg-white",
                      attrs: {
                        "vs-align": "flex-start",
                        "vs-type": "flex",
                        "vs-justify": "center",
                        "vs-w": "12"
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "vx-col hidden lg:block lg:w-1/2" },
                        [
                          _c("img", {
                            staticClass: "w-full",
                            attrs: {
                              src: __webpack_require__(/*! @assets/images/pages/login.png */ "./resources/assets/images/pages/login.png"),
                              alt: "login"
                            }
                          })
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg"
                        },
                        [
                          _c("div", { staticClass: "p-8 h-full" }, [
                            _c("div", { staticClass: "vx-card__title mb-4" }, [
                              _c("h4", { staticClass: "mb-4" }, [
                                _vm._v("Forgot Password")
                              ]),
                              _vm._v(" "),
                              _c("p", [
                                _vm._v(
                                  "Please enter your email address, instructions for resetting password will be sent here."
                                )
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              [
                                _c("vs-input", {
                                  directives: [
                                    {
                                      name: "validate",
                                      rawName: "v-validate",
                                      value: "required|email|max:255",
                                      expression: "'required|email|max:255'"
                                    }
                                  ],
                                  staticClass: "w-full mt-10",
                                  attrs: {
                                    label: "Email Address",
                                    name: "email"
                                  },
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
                                _c(
                                  "vs-button",
                                  {
                                    staticClass: "w-full mt-8 mb-8",
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.submitForm($event)
                                      }
                                    }
                                  },
                                  [_vm._v("Reset Password")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "login-register-footer-block mt-12"
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\tKnow your password? "
                                    ),
                                    _c(
                                      "router-link",
                                      {
                                        staticClass: "login-register-link",
                                        attrs: { to: "/login" }
                                      },
                                      [_vm._v("Login")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ])
                        ]
                      )
                    ]
                  )
                ],
                1
              )
            ]
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/assets/images/pages/login.png":
/*!*************************************************!*\
  !*** ./resources/assets/images/pages/login.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/login.png?d814adb752d2d047b8292d6de603025f";

/***/ }),

/***/ "./resources/js/src/views/login/ForgotPassword.vue":
/*!*********************************************************!*\
  !*** ./resources/js/src/views/login/ForgotPassword.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForgotPassword_vue_vue_type_template_id_9ec55f24___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=template&id=9ec55f24& */ "./resources/js/src/views/login/ForgotPassword.vue?vue&type=template&id=9ec55f24&");
/* harmony import */ var _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=script&lang=js& */ "./resources/js/src/views/login/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForgotPassword_vue_vue_type_template_id_9ec55f24___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ForgotPassword_vue_vue_type_template_id_9ec55f24___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/login/ForgotPassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/login/ForgotPassword.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/login/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/login/ForgotPassword.vue?vue&type=template&id=9ec55f24&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/login/ForgotPassword.vue?vue&type=template&id=9ec55f24& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_9ec55f24___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=template&id=9ec55f24& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/ForgotPassword.vue?vue&type=template&id=9ec55f24&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_9ec55f24___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_9ec55f24___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);