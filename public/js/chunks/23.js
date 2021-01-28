(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      showForm: false,
      paymentCard: {
        nameOnCard: "",
        number: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: ""
      },
      paymentGateway: "stripe",
      publishableKey: "",
      paymentSecret: "",
      paymentCurrency: "",
      paymentAmount: 0,
      mode: '',
      stripe: {
        obj: null,
        card: null
      }
    };
  },
  methods: {
    validateCredentials: function validateCredentials() {
      var _this = this;

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

      this.$vs.loading();
      this.$http.get('payment', {
        params: {
          publishable_key: this.publishableKey,
          payment_secret: this.paymentSecret
        }
      }).then(function (response) {
        this.paymentAmount = response.data.data.amount;
        this.paymentCurrency = response.data.data.currency;
        this.showPaymentForm();
      }.bind(this))["catch"](function (error) {
        this.$vs.notify({
          color: "danger",
          text: error.message
        });
      }.bind(this))["finally"](function () {
        _this2.$vs.loading.close();
      });
    },
    showPaymentForm: function showPaymentForm() {
      this.configureStripeForm();
      this.showForm = true;
    },
    configureStripeForm: function configureStripeForm() {
      var elements = this.stripe.obj.elements();
      var style = {
        base: {
          color: "#32325d"
        }
      };
      this.stripe.card = elements.create("card", style);
      setTimeout(function () {
        document.getElementById('stripe-card-element').innerHTML = '';
        this.stripe.card.mount("#stripe-card-element");
        this.stripe.card.on('change', function (event) {
          var displayError = document.getElementById('stripe-card-errors');

          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = '';
          }
        });
      }.bind(this), 300);
    },
    submitStripeForm: function submitStripeForm() {
      this.$vs.loading();
      this.stripe.obj.createToken(this.stripe.card).then(function (result) {
        if (result.error) {
          this.$vs.loading.close(); // Inform the customer that there was an error.

          var errorElement = document.getElementById('stripe-card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          this.confirmPayment({
            token: result.token.id
          });
        }
      }.bind(this));
    },
    confirmPayment: function confirmPayment(params) {
      Object.assign(params, {
        publishable_key: this.publishableKey,
        payment_secret: this.paymentSecret,
        payment_gateway: this.paymentGateway
      });
      this.$http.post('/confirm_payment', params).then(function (result) {
        if (result.status === 202) {
          window.location.href = result.data.url;
          return false;
        }

        try {
          if (window.opener && !window.opener.closed) {
            result.data.code = 200;
            window.opener.postMessage(result.data, '*');
          }
        } catch (err) {}

        return false;
      }.bind(this))["catch"](function (error) {
        try {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
              message: error.message,
              code: 400
            }, '*');
          }
        } catch (err) {}

        return false;
      }.bind(this))["finally"](function () {
        window.close();
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.publishableKey = this.$route.query.pk;
    this.paymentSecret = this.$route.query.ps;
    this.mode = this.publishableKey.includes('_test_') ? 'test' : 'live';
    var stripeKey; // todo should fix the dotenv library issue to load keys using dotenv.

    if (this.mode === 'live') {
      stripeKey = 'pk_test_ZGlwYNawjOpsQxLbkgKqmWwu00Evfb4UmF'; // should load the live key
    } else {
      stripeKey = 'pk_test_ZGlwYNawjOpsQxLbkgKqmWwu00Evfb4UmF';
    }

    this.stripe.obj = Stripe(stripeKey);
    this.validateCredentials().then(function () {
      _this3.getPaymentInfo();
    });
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
          staticClass:
            "vx-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:m-0 m-4"
        },
        [
          _c(
            "vx-card",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showForm,
                  expression: "showForm"
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
                    [
                      _c("vs-col", { staticClass: "text-center my-8" }, [
                        _c("h2", { staticClass: "font-bold text-primary" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(_vm.paymentCurrency) +
                              " " +
                              _vm._s(
                                _vm._f("numeralFormat")(
                                  _vm.paymentAmount,
                                  "0,0.00"
                                )
                              ) +
                              "\n                        "
                          )
                        ])
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "vs-row",
                    {
                      staticClass: "mt-4 justify-center",
                      attrs: { "vs-w": "12" }
                    },
                    [
                      _c(
                        "vs-tabs",
                        { attrs: { alignment: "center" } },
                        [
                          _c(
                            "vs-tab",
                            {
                              attrs: { label: "Stripe" },
                              on: { click: _vm.configureStripeForm }
                            },
                            [
                              _c(
                                "div",
                                [
                                  _c(
                                    "vs-row",
                                    {
                                      staticClass: "my-6 px-6 justify-between",
                                      attrs: { "vs-w": "12" }
                                    },
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
                                          _c("div", {
                                            attrs: { id: "stripe-card-element" }
                                          }),
                                          _vm._v(" "),
                                          _c("div", {
                                            attrs: {
                                              id: "stripe-card-errors",
                                              role: "alert"
                                            }
                                          })
                                        ]
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
                                                  return _vm.submitStripeForm(
                                                    $event
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "Pay\n                                            " +
                                                  _vm._s(_vm.paymentCurrency) +
                                                  " " +
                                                  _vm._s(
                                                    _vm._f("numeralFormat")(
                                                      _vm.paymentAmount,
                                                      "0,0.00"
                                                    )
                                                  ) +
                                                  "\n                                        "
                                              )
                                            ]
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
                          ),
                          _vm._v(" "),
                          _c("vs-tab", { attrs: { label: "MerchantE" } }, [
                            _c("div")
                          ])
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