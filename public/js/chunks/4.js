(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Login.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/login/Login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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
      email: "Please provide valid email",
      max: "Maximum of 255 characters are allowed"
    },
    password: {
      required: "Password is required",
      min: "Password should atleast 6 characters",
      max: "Maximum of 30 characters are allowed"
    }
  }
}; // register custom messages

vee_validate__WEBPACK_IMPORTED_MODULE_0__["Validator"].localize("en", custom_err_message);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
      formError: false,
      formErrorMsg: ""
    };
  },
  computed: {
    resetLinkStatus: function resetLinkStatus() {
      return this.$store.getters["getResendLinkStatus"];
    },
    userName: function userName() {
      return this.$store.getters["getUserName"];
    }
  },
  methods: {
    resendVerificationLink: function resendVerificationLink() {
      var _this = this;

      this.$vs.loading();

      if (this.resetLinkStatus.userEmail != null) {
        this.$store.dispatch("resendVerificationEmailLink", this.resetLinkStatus.userEmail).then(function (res) {
          // hide loading gif
          _this.$vs.loading.close(); // update reset link state


          var resetLink = {
            verifyStatus: false,
            userEmail: null
          };

          _this.$store.commit("UPDATE_RESEND_LINK_STATUS", resetLink);
        });
      } else {
        var fail = {
          title: "Oops",
          description: "Something went wrong.",
          color: "danger",
          time: 4500
        };
        this.$store.commit("MESSAGE_NOTIFICATION", fail);
      }
    },
    submitForm: function submitForm() {
      var _this2 = this;

      var self = this.$data; // RESET FORM ALERT

      self.formError = false;
      self.formErrorMsg = "";
      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this2.$vs.loading(); // Valid


          _this2.$http.post("/auth/login", {
            email: self.email,
            password: self.password,
            remember_me: self.checkbox_remember_me
          }).then(function (response) {
            var token_expire_datetime = new Date(response.expires_at).toUTCString();
            window.$cookies.set("_DMt", response.data.access_token, token_expire_datetime, null, null, null, "Lax");

            _this2.$store.dispatch("updateUserInfo", response.data.user);

            _this2.$router.push("/");

            _this2.$vs.loading.close();

            var success = {
              title: "Welcome ".concat(_this2.userName),
              description: "You are now login.",
              color: "primary",
              time: 3500
            };

            _this2.$store.commit("MESSAGE_NOTIFICATION", success);
          }, function (error) {
            _this2.$vs.loading.close();

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
              color: "danger",
              time: 8500
            };

            _this2.$store.commit("MESSAGE_NOTIFICATION", fail); // check if users is register but email not verified, display a resend link button


            if (error.response.data.unVerified) {
              var resendUserData = {
                verifyStatus: error.response.data.unVerified,
                userEmail: self.email
              };

              _this2.$store.commit("UPDATE_RESEND_LINK_STATUS", resendUserData);
            }
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Login.vue?vue&type=template&id=6804beee&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/login/Login.vue?vue&type=template&id=6804beee& ***!
  \*************************************************************************************************************************************************************************************************************/
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
                                _vm._v("Welcome!")
                              ]),
                              _vm._v(" "),
                              _c("p", [
                                _vm._v("Go ahead and log in to your account.")
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
                                _c("vs-input", {
                                  directives: [
                                    {
                                      name: "validate",
                                      rawName: "v-validate",
                                      value: "required|min:6|max:30",
                                      expression: "'required|min:6|max:30'"
                                    }
                                  ],
                                  staticClass: "w-full mt-6",
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
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "flex flex-wrap justify-between my-5 mb-12"
                                  },
                                  [
                                    _c(
                                      "vs-checkbox",
                                      {
                                        staticClass: "mb-3",
                                        model: {
                                          value: _vm.checkbox_remember_me,
                                          callback: function($$v) {
                                            _vm.checkbox_remember_me = $$v
                                          },
                                          expression: "checkbox_remember_me"
                                        }
                                      },
                                      [_vm._v("Remember Me")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "router-link",
                                      {
                                        staticClass: "login-register-link",
                                        attrs: { to: "/forgotpassword" }
                                      },
                                      [_vm._v("Forgot Password?")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "vs-button",
                                  {
                                    staticClass: "w-full",
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.submitForm($event)
                                      }
                                    }
                                  },
                                  [_vm._v("Login")]
                                ),
                                _vm._v(" "),
                                _vm.resetLinkStatus.status
                                  ? _c(
                                      "div",
                                      { staticClass: "mt-10 my-5 text-center" },
                                      [
                                        _c(
                                          "vs-button",
                                          {
                                            staticClass: "w-full",
                                            attrs: { color: "success" },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                return _vm.resendVerificationLink()
                                              }
                                            }
                                          },
                                          [_vm._v("Resend Verification")]
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "login-register-footer-block mt-12"
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\tDon't have an account? "
                                    ),
                                    _c(
                                      "router-link",
                                      {
                                        staticClass: "login-register-link",
                                        attrs: { to: "/register" }
                                      },
                                      [_vm._v("Sign Up")]
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

/***/ "./resources/js/src/views/login/Login.vue":
/*!************************************************!*\
  !*** ./resources/js/src/views/login/Login.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_6804beee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=6804beee& */ "./resources/js/src/views/login/Login.vue?vue&type=template&id=6804beee&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/src/views/login/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_6804beee___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_6804beee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/login/Login.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/src/views/login/Login.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/login/Login.vue?vue&type=template&id=6804beee&":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/login/Login.vue?vue&type=template&id=6804beee& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_6804beee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=6804beee& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Login.vue?vue&type=template&id=6804beee&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_6804beee___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_6804beee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);