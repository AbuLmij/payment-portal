(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Verify.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/login/Verify.vue?vue&type=script&lang=js& ***!
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
window.$cookies.remove("_DMt");
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    verifyAccount: function verifyAccount() {
      var _this = this;

      var userId = this.$route.params.id;
      var query = this.$route.query;
      this.$vs.loading();
      this.$http.get("/email/verify/".concat(userId), {
        params: query
      }).then(function () {
        var success = {
          title: "Your account is verified successfully",
          color: "success",
          time: 5500
        };

        _this.$store.commit("MESSAGE_NOTIFICATION", success);
      })["catch"](function (error) {
        var mssgDescription = "An error occurred"; // self.formError = true;

        if (error.response.data.message !== undefined) {
          mssgDescription = error.response.data.message;
        }

        if (error.response.data.errors !== undefined) {
          mssgDescription += ":";

          for (var key in error.response.data.errors) {
            mssgDescription += "\n" + error.response.data.errors[key];
          }
        }

        var fail = {
          title: "Oops",
          description: mssgDescription,
          color: "danger",
          time: 5000
        };

        _this.$store.commit("MESSAGE_NOTIFICATION", fail);
      })["finally"](function () {
        _this.$vs.loading.close();

        _this.$router.push({
          name: "Login"
        });
      });
    }
  },
  mounted: function mounted() {
    this.verifyAccount();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Verify.vue?vue&type=template&id=3e2246ee&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/login/Verify.vue?vue&type=template&id=3e2246ee& ***!
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
                                _vm._v("Verify Email")
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "mb-4" }, [
                                _vm._v("Verifying your email, please wait...")
                              ])
                            ])
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

/***/ "./resources/js/src/views/login/Verify.vue":
/*!*************************************************!*\
  !*** ./resources/js/src/views/login/Verify.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Verify_vue_vue_type_template_id_3e2246ee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Verify.vue?vue&type=template&id=3e2246ee& */ "./resources/js/src/views/login/Verify.vue?vue&type=template&id=3e2246ee&");
/* harmony import */ var _Verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Verify.vue?vue&type=script&lang=js& */ "./resources/js/src/views/login/Verify.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Verify_vue_vue_type_template_id_3e2246ee___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Verify_vue_vue_type_template_id_3e2246ee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/login/Verify.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/login/Verify.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/src/views/login/Verify.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Verify.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Verify.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Verify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/login/Verify.vue?vue&type=template&id=3e2246ee&":
/*!********************************************************************************!*\
  !*** ./resources/js/src/views/login/Verify.vue?vue&type=template&id=3e2246ee& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Verify_vue_vue_type_template_id_3e2246ee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Verify.vue?vue&type=template&id=3e2246ee& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/login/Verify.vue?vue&type=template&id=3e2246ee&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Verify_vue_vue_type_template_id_3e2246ee___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Verify_vue_vue_type_template_id_3e2246ee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);