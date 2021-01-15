(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Settings.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Settings.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var custom_err_message = {
  custom: {
    pp_mode: {
      required: 'This field is required'
    },
    pp_sandbox_token: {
      required: 'This field is required',
      max: "Maximum of 255 characters are allowed"
    },
    pp_production_token: {
      required: 'This field is required',
      max: "Maximum of 255 characters are allowed"
    },
    cc_api_secret_key: {
      required: 'This field is required'
    },
    cc_api_key: {
      required: 'This field is required'
    },
    cc_api_url: {
      required: 'This field is required'
    },
    domain_attr_update_freq: {
      required: 'This field is required'
    }
  }
}; // register custom messages

vee_validate__WEBPACK_IMPORTED_MODULE_1__["Validator"].localize('en', custom_err_message);
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    'v-select': vue_select__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      pp_mode: "",
      pp_sandbox_token: "",
      pp_production_token: "",
      cc_api_secret_key: "",
      cc_api_key: "",
      cc_api_url: "",
      domain_attr_update_freq: "weekly",
      showFormAlert: false,
      formStatus: false,
      formErrorMsg: '',
      metrics_checking_frequency: '',
      allow_check_metrics: 'no'
    };
  },
  mounted: function mounted() {
    this.getData();
    this.getMetricsData();
  },
  computed: {
    activeUserInfo: function activeUserInfo() {
      return this.$store.state.AppActiveUser;
    }
  },
  watch: {
    allow_check_metrics: function allow_check_metrics(val) {
      if (val == 'no') {
        this.metrics_checking_frequency = '';
      }
    }
  },
  methods: {
    getData: function getData() {
      var _this = this;

      this.$vs.loading();
      var self = this.$data; // Valid

      this.$http.get('/admin/settings/').then(function (response) {
        //console.log(response.data);
        self.pp_mode = response.data.pp_mode;
        self.pp_sandbox_token = response.data.pp_sandbox_token;
        self.pp_production_token = response.data.pp_production_token;
        self.cc_api_secret_key = response.data.cc_api_secret_key;
        self.cc_api_key = response.data.cc_api_key;
        self.cc_api_url = response.data.cc_api_url;
        self.domain_attr_update_freq = response.data.domain_attr_update_freq;

        _this.$vs.loading.close(); //console.log(self)

      }, function (error) {
        //console.log(error);
        self.showFormAlert = true;
        self.formStatus = false;

        if (error.response.data.message !== undefined) {
          self.formErrorMsg = error.response.data.message;
        }

        if (error.response.data.errors !== undefined) {
          for (var key in error.response.data.errors) {
            self.formErrorMsg += error.response.data.errors[key];
          }
        }
      });
    },
    getMetricsData: function getMetricsData() {
      var _this2 = this;

      this.$vs.loading();
      var self = this.$data; // Valid

      this.$http.post('/admin/settings/get_metrics', {
        user_id: this.activeUserInfo.id
      }).then(function (response) {
        var metrics = response.data;

        _this2.$vs.loading.close();

        self.allow_check_metrics = metrics.allow_check_metrics;
        self.metrics_checking_frequency = metrics.metrics_checking_frequency; //console.log(self)
      }, function (error) {
        self.showFormAlert = true;
        self.formStatus = false;

        if (error.response.data.message !== undefined) {
          self.formErrorMsg = error.response.data.message;
        }

        if (error.response.data.errors !== undefined) {
          for (var key in error.response.data.errors) {
            self.formErrorMsg += error.response.data.errors[key];
          }
        }
      });
    },
    submitForm: function submitForm() {
      var _this3 = this;

      var self = this.$data; // RESET FORM ALERT

      self.showFormAlert = false;
      self.formStatus = false;
      self.formErrorMsg = '';
      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this3.$http.put('/admin/settings/', {
            pp_mode: self.pp_mode,
            pp_sandbox_token: self.pp_sandbox_token,
            pp_production_token: self.pp_production_token,
            cc_api_secret_key: self.cc_api_secret_key,
            cc_api_key: self.cc_api_key,
            cc_api_url: self.cc_api_url,
            domain_attr_update_freq: self.domain_attr_update_freq
          }).then(function (response) {
            _this3.$vs.loading.close(); //console.log(response);


            self.showFormAlert = true;
            self.formStatus = true;
            var PpConfig = {
              pp_mode: self.pp_mode,
              pp_sandbox_token: self.pp_sandbox_token,
              pp_production_token: self.pp_production_token
            };

            _this3.$store.dispatch('updatePpConfig', PpConfig);
          }, function (error) {
            _this3.$vs.loading.close(); //console.log(error);


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
    },
    updateMetricsSetting: function updateMetricsSetting() {
      var _this4 = this;

      var self = this.$data;
      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this4.$http.put('/admin/settings/metrics', {
            allow_check_metrics: self.allow_check_metrics,
            metrics_checking_frequency: self.metrics_checking_frequency,
            user_id: _this4.activeUserInfo.id
          }).then(function (response) {
            _this4.$vs.loading.close();

            self.showFormAlert = true;
            self.formStatus = true;
            self.metrics_checking_frequency = response.data.data.metrics_checking_frequency;
            self.allow_check_metrics = response.data.data.allow_check_metrics;
            var success = {
              title: "Success",
              description: "Metric setting has been successfully updated.",
              color: "success"
            };

            _this4.$store.commit("MESSAGE_NOTIFICATION", success);
          }, function (error) {
            _this4.$vs.loading.close();

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

            _this4.$store.commit("MESSAGE_NOTIFICATION", fail);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Settings.vue?vue&type=template&id=43ab7f0d&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Settings.vue?vue&type=template&id=43ab7f0d& ***!
  \****************************************************************************************************************************************************************************************************************/
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
                  { staticClass: "mt-base", attrs: { title: "" } },
                  [
                    _c("h4", { staticClass: "mb-4" }, [
                      _vm._v("Metrics Checking Setting")
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary"
                      },
                      [
                        _c(
                          "label",
                          {
                            staticClass: "vs-input--label",
                            attrs: { for: "domain_attr_update_freq" }
                          },
                          [_vm._v("Allow Metric Checking?")]
                        ),
                        _vm._v(" "),
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
                            label: "API Updated Frequency",
                            name: "allow_check_metrics",
                            options: ["yes", "no"]
                          },
                          model: {
                            value: _vm.allow_check_metrics,
                            callback: function($$v) {
                              _vm.allow_check_metrics = $$v
                            },
                            expression: "allow_check_metrics"
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
                                value: _vm.errors.has("allow_check_metrics"),
                                expression: "errors.has('allow_check_metrics')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.errors.first("allow_check_metrics"))
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary"
                      },
                      [
                        _c(
                          "label",
                          {
                            staticClass: "vs-input--label",
                            attrs: { for: "metrics_checking_frequency" }
                          },
                          [_vm._v("Frequency Of Checking")]
                        ),
                        _vm._v(" "),
                        _c("v-select", {
                          attrs: {
                            label: "API Updated Frequency",
                            name: "metrics_checking_frequency",
                            options: ["weekly", "bi-monthly", "monthly"],
                            disabled: _vm.allow_check_metrics == "no"
                          },
                          model: {
                            value: _vm.metrics_checking_frequency,
                            callback: function($$v) {
                              _vm.metrics_checking_frequency = $$v
                            },
                            expression: "metrics_checking_frequency"
                          }
                        })
                      ],
                      1
                    ),
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
                                  return _vm.updateMetricsSetting($event)
                                }
                              }
                            },
                            [_vm._v("Update")]
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
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-col sm:w-full md:w-2/3 lg:w-2/4" }, [
            _c(
              "form",
              [
                _c(
                  "vx-card",
                  { staticClass: "mt-base", attrs: { title: "" } },
                  [
                    _c("h4", { staticClass: "mb-4" }, [_vm._v("PayPal")]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary"
                      },
                      [
                        _c(
                          "label",
                          {
                            staticClass: "vs-input--label",
                            attrs: { for: "pp_mode" }
                          },
                          [_vm._v("Mode")]
                        ),
                        _vm._v(" "),
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
                            label: "Paypal Mode",
                            name: "pp_mode",
                            options: ["sandbox", "production"]
                          },
                          model: {
                            value: _vm.pp_mode,
                            callback: function($$v) {
                              _vm.pp_mode = $$v
                            },
                            expression: "pp_mode"
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
                                value: _vm.errors.has("pp_mode"),
                                expression: "errors.has('pp_mode')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [_vm._v(_vm._s(_vm.errors.first("pp_mode")))]
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
                          value: "required|max:255",
                          expression: "'required|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: {
                        label: "Sandbox API Token",
                        name: "pp_sandbox_token"
                      },
                      model: {
                        value: _vm.pp_sandbox_token,
                        callback: function($$v) {
                          _vm.pp_sandbox_token = $$v
                        },
                        expression: "pp_sandbox_token"
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
                            value: _vm.errors.has("pp_sandbox_token"),
                            expression: "errors.has('pp_sandbox_token')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("pp_sandbox_token")))]
                    ),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|max:255",
                          expression: "'required|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: {
                        label: "Production API Token",
                        name: "pp_production_token"
                      },
                      model: {
                        value: _vm.pp_production_token,
                        callback: function($$v) {
                          _vm.pp_production_token = $$v
                        },
                        expression: "pp_production_token"
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
                            value: _vm.errors.has("pp_production_token"),
                            expression: "errors.has('pp_production_token')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("pp_production_token")))]
                    ),
                    _vm._v(" "),
                    _c("h4", { staticClass: "mt-10 mb-4" }, [
                      _vm._v("Credit Card")
                    ]),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|max:255",
                          expression: "'required|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: {
                        label: "API Secret Key",
                        name: "cc_api_secret_key"
                      },
                      model: {
                        value: _vm.cc_api_secret_key,
                        callback: function($$v) {
                          _vm.cc_api_secret_key = $$v
                        },
                        expression: "cc_api_secret_key"
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
                            value: _vm.errors.has("cc_api_secret_key"),
                            expression: "errors.has('cc_api_secret_key')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("cc_api_secret_key")))]
                    ),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|max:255",
                          expression: "'required|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: { label: "API Key", name: "cc_api_key" },
                      model: {
                        value: _vm.cc_api_key,
                        callback: function($$v) {
                          _vm.cc_api_key = $$v
                        },
                        expression: "cc_api_key"
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
                            value: _vm.errors.has("cc_api_key"),
                            expression: "errors.has('cc_api_key')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("cc_api_key")))]
                    ),
                    _vm._v(" "),
                    _c("vs-input", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required|max:255",
                          expression: "'required|max:255'"
                        }
                      ],
                      staticClass: "w-full mt-5",
                      attrs: { label: "API URL", name: "cc_api_url" },
                      model: {
                        value: _vm.cc_api_url,
                        callback: function($$v) {
                          _vm.cc_api_url = $$v
                        },
                        expression: "cc_api_url"
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
                            value: _vm.errors.has("cc_api_url"),
                            expression: "errors.has('cc_api_url')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("cc_api_url")))]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary"
                      },
                      [
                        _c(
                          "label",
                          {
                            staticClass: "vs-input--label",
                            attrs: { for: "domain_attr_update_freq" }
                          },
                          [_vm._v("API Updated Frequency")]
                        ),
                        _vm._v(" "),
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
                            label: "API Updated Frequency",
                            name: "domain_attr_update_freq",
                            options: ["weekly", "bi-monthly", "monthly"]
                          },
                          model: {
                            value: _vm.domain_attr_update_freq,
                            callback: function($$v) {
                              _vm.domain_attr_update_freq = $$v
                            },
                            expression: "domain_attr_update_freq"
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
                                value: _vm.errors.has(
                                  "domain_attr_update_freq"
                                ),
                                expression:
                                  "errors.has('domain_attr_update_freq')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.errors.first("domain_attr_update_freq")
                              )
                            )
                          ]
                        )
                      ],
                      1
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
                                      "\n                              Settings Updated\n                            "
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
                            [_vm._v("Update")]
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

/***/ "./resources/js/src/views/admin/Settings.vue":
/*!***************************************************!*\
  !*** ./resources/js/src/views/admin/Settings.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Settings_vue_vue_type_template_id_43ab7f0d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=43ab7f0d& */ "./resources/js/src/views/admin/Settings.vue?vue&type=template&id=43ab7f0d&");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/Settings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settings_vue_vue_type_template_id_43ab7f0d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Settings_vue_vue_type_template_id_43ab7f0d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/Settings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/Settings.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/admin/Settings.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Settings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/Settings.vue?vue&type=template&id=43ab7f0d&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/admin/Settings.vue?vue&type=template&id=43ab7f0d& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_43ab7f0d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=template&id=43ab7f0d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Settings.vue?vue&type=template&id=43ab7f0d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_43ab7f0d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_43ab7f0d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);