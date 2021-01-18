(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pay/Pay.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pay/Pay.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showPaymentForm: false,
      nameOnCard: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      publishableKey: "",
      paymentSecret: ""
    };
  },
  methods: {
    validateCredentials: function validateCredentials() {
      var _this = this;

      this.publishableKey = this.$route.query.pk;
      this.paymentSecret = this.$route.query.ps;
      return new Promise(function (resolve, reject) {
        var message;

        if (typeof _this.publishableKey !== 'string') {
          message = 'Please provide a publishable key';

          _this.$vs.notify({
            color: "danger",
            text: message
          });

          reject({
            message: message
          });
        }

        var keyLength = _this.publishableKey.length;

        if (_this.publishableKey.includes('_test_')) {
          keyLength -= 5;
        }

        if (keyLength !== 38 || _this.publishableKey.slice(0, 3) !== 'pk_') {
          message = 'Please provide a valid publishable key';

          _this.$vs.notify({
            color: "danger",
            text: message
          });

          reject({
            message: message
          });
        }

        if (typeof _this.paymentSecret !== 'string') {
          message = 'Please provide a payment secret';

          _this.$vs.notify({
            color: "danger",
            text: message
          });

          reject({
            message: message
          });
        }

        if (_this.paymentSecret.length !== 255 || _this.paymentSecret.slice(0, 3) !== 'ps_') {
          message = 'Please provide a valid payment secret';

          _this.$vs.notify({
            color: "danger",
            text: message
          });

          reject({
            message: message
          });
        }

        resolve();
      });
    },
    getPaymentInfo: function getPaymentInfo() {
      var _this2 = this;

      this.$http.get('payment', {
        params: {
          publishable_key: this.publishableKey,
          payment_secret: this.paymentSecret
        }
      }).then(function (response) {
        console.log(response);
      }.bind(this))["catch"](function (error) {
        this.$vs.notify({
          color: "danger",
          text: error.message
        });
      })["finally"](function () {
        _this2.$vs.loading.close();
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.validateCredentials().then(function () {
      console.log('then');

      _this3.getPaymentInfo();
    }); // this.$vs.loading();
    // console.log(this.$route.query.pk, this.$route.query.ps);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pay/Pay.vue?vue&type=template&id=0f33fa07&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pay/Pay.vue?vue&type=template&id=0f33fa07& ***!
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
  return _c(
    "div",
    {
      staticClass:
        "h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    },
    [
      _c(
        "div",
        {
          staticClass: "vx-col sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:m-0 m-4"
        },
        [
          _c(
            "vx-card",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showPaymentForm,
                  expression: "showPaymentForm"
                }
              ],
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
                    { staticClass: "px-6", attrs: { "vs-w": "12" } },
                    [
                      _c(
                        "vs-col",
                        {
                          attrs: {
                            "vs-type": "flex-end",
                            "vs-justify": "flex-end",
                            "vs-align": "flex-end",
                            "vs-w": "12"
                          }
                        },
                        [
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
                            attrs: {
                              label: "Name on Card",
                              name: "nameOnCard"
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                              }
                            },
                            model: {
                              value: _vm.nameOnCard,
                              callback: function($$v) {
                                _vm.nameOnCard = $$v
                              },
                              expression: "nameOnCard"
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
                                  value: _vm.errors.has("nameOnCard"),
                                  expression: "errors.has('nameOnCard')"
                                }
                              ],
                              staticClass: "text-danger w-full text-sm"
                            },
                            [_vm._v(_vm._s(_vm.errors.first("nameOnCard")))]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-col",
                        {
                          attrs: {
                            "vs-type": "flex-end",
                            "vs-justify": "flex-end",
                            "vs-align": "flex-end",
                            "vs-w": "12"
                          }
                        },
                        [
                          _c("vs-input", {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate",
                                value: "required|digits:16",
                                expression: "'required|digits:16'"
                              }
                            ],
                            staticClass: "w-full mt-5",
                            attrs: {
                              label: "Card Number",
                              name: "cardNumber",
                              icon: "credit_card"
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                              }
                            },
                            model: {
                              value: _vm.cardNumber,
                              callback: function($$v) {
                                _vm.cardNumber = $$v
                              },
                              expression: "cardNumber"
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
                                  value: _vm.errors.has("cardNumber"),
                                  expression: "errors.has('cardNumber')"
                                }
                              ],
                              staticClass: "text-danger w-full text-sm"
                            },
                            [_vm._v(_vm._s(_vm.errors.first("cardNumber")))]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-col",
                        {
                          attrs: {
                            "vs-type": "flex-end",
                            "vs-justify": "centern",
                            "vs-align": "center",
                            "vs-w": "6"
                          }
                        },
                        [
                          _c("vs-input", {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate",
                                value: "required|digits:6",
                                expression: "'required|digits:6'"
                              }
                            ],
                            staticClass: "w-full mt-5",
                            attrs: { label: "MMYYYY", name: "cardExpiry" },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                              }
                            },
                            model: {
                              value: _vm.cardExpiry,
                              callback: function($$v) {
                                _vm.cardExpiry = $$v
                              },
                              expression: "cardExpiry"
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
                                  value: _vm.errors.has("cardExpiry"),
                                  expression: "errors.has('cardExpiry')"
                                }
                              ],
                              staticClass: "text-danger w-full text-sm"
                            },
                            [_vm._v(_vm._s(_vm.errors.first("cardExpiry")))]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("vs-col", {
                        attrs: {
                          "vs-type": "flex-end",
                          "vs-justify": "center",
                          "vs-align": "center",
                          "vs-w": "1"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "vs-col",
                        {
                          attrs: {
                            "vs-type": "flex-end",
                            "vs-justify": "center",
                            "vs-align": "center",
                            "vs-w": "5"
                          }
                        },
                        [
                          _c("vs-input", {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate",
                                value: "required|digits:3",
                                expression: "'required|digits:3'"
                              }
                            ],
                            staticClass: "w-full mt-5",
                            attrs: {
                              label: "CVC",
                              name: "cardCVC",
                              icon: "credit_card"
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                              }
                            },
                            model: {
                              value: _vm.cardCVC,
                              callback: function($$v) {
                                _vm.cardCVC = $$v
                              },
                              expression: "cardCVC"
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
                                  value: _vm.errors.has("cardCVC"),
                                  expression: "errors.has('cardCVC')"
                                }
                              ],
                              staticClass: "text-danger w-full text-sm"
                            },
                            [_vm._v(_vm._s(_vm.errors.first("cardCVC")))]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-col",
                        {
                          attrs: {
                            "vs-type": "flex",
                            "vs-justify": "center",
                            "vs-align": "center",
                            "vs-w": "12"
                          }
                        },
                        [
                          _c(
                            "vs-button",
                            {
                              staticClass: "w-full my-5",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.submitCardForm($event)
                                }
                              }
                            },
                            [_vm._v("Pay\n                            ")]
                          )
                        ],
                        1
                      )
                    ],
                    1
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

/***/ "./resources/js/src/views/pay/Pay.vue":
/*!********************************************!*\
  !*** ./resources/js/src/views/pay/Pay.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pay_vue_vue_type_template_id_0f33fa07___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pay.vue?vue&type=template&id=0f33fa07& */ "./resources/js/src/views/pay/Pay.vue?vue&type=template&id=0f33fa07&");
/* harmony import */ var _Pay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pay.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pay/Pay.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Pay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pay_vue_vue_type_template_id_0f33fa07___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Pay_vue_vue_type_template_id_0f33fa07___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pay/Pay.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pay/Pay.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/pay/Pay.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Pay.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pay/Pay.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pay_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pay/Pay.vue?vue&type=template&id=0f33fa07&":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/pay/Pay.vue?vue&type=template&id=0f33fa07& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pay_vue_vue_type_template_id_0f33fa07___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Pay.vue?vue&type=template&id=0f33fa07& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pay/Pay.vue?vue&type=template&id=0f33fa07&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pay_vue_vue_type_template_id_0f33fa07___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pay_vue_vue_type_template_id_0f33fa07___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);