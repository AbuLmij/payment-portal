(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/profile/components/Profile.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/profile/components/Profile.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: {
      required: "This field is required",
      alpha_spaces: "Alphabetic characters and spaces are only allowed",
      max: "Maximum of 255 characters are allowed"
    },
    email: {
      required: "This field is required",
      email: "Invalid E-mail format",
      max: "Maximum of 255 characters are allowed"
    },
    job_title: {
      max: "Maximum of 255 characters are allowed"
    },
    company: {
      max: "Maximum of 255 characters are allowed"
    },
    website: {
      url: "Invalid URL format",
      max: "Maximum of 255 characters are allowed"
    },
    vat_number: {
      max: "Maximum of 255 characters are allowed"
    },
    telephone_number: {
      max: "Maximum of 255 characters are allowed"
    },
    address: {
      max: "Maximum of 255 characters are allowed"
    }
  }
}; // register custom messages

vee_validate__WEBPACK_IMPORTED_MODULE_1__["Validator"].localize("en", custom_err_message);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      name: "",
      email: "",
      job_title: "",
      company: "",
      website: "",
      vat_number: "",
      telephone_number: "",
      address: "",
      country: "",
      showFormProfileAlert: false,
      formProfileStatus: false,
      formProfileErrorMsg: "",
      messageColor: "primary",
      messageTitle: ""
    };
  },
  mounted: function mounted() {
    this.getUserData();
  },
  computed: {
    activeUserInfo: function activeUserInfo() {
      return this.$store.getters["getUserInfo"];
    }
  },
  methods: {
    getUserData: function getUserData() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var $this, user;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.$vs.loading();

                $this = _this.$data;
                _context.next = 4;
                return _this.$store.dispatch("fetchUserInfo");

              case 4:
                user = _context.sent;

                if (user) {
                  $this.name = user.name;
                  $this.email = user.email;
                  $this.job_title = user.job_title;
                  $this.company = user.company;
                  $this.website = user.website;
                  $this.vat_number = user.vat_number;
                  $this.telephone_number = user.telephone_number;
                  $this.address = user.address;
                  $this.country = user.country;
                }

                _this.$vs.loading.close();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updateProfile: function updateProfile() {
      var _this2 = this;

      var self = this.$data; // RESET FORM ALERT

      self.showFormProfileAlert = false;
      self.formProfileStatus = false;
      self.formProfileErrorMsg = "";
      this.$validator.validateAll().then( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(result) {
          var params;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!result) {
                    _context2.next = 5;
                    break;
                  }

                  params = {
                    name: self.name,
                    email: self.email,
                    job_title: self.job_title,
                    company: self.company,
                    website: self.website,
                    vat_number: self.vat_number,
                    telephone_number: self.telephone_number,
                    address: self.address,
                    country: self.country
                  };

                  _this2.$vs.loading();

                  _context2.next = 5;
                  return _this2.$store.dispatch("updateUserProfile", params).then(function (res) {
                    _this2.$vs.loading.close();
                  });

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/profile/components/Profile.vue?vue&type=template&id=f09bf580&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/profile/components/Profile.vue?vue&type=template&id=f09bf580& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    "form",
    [
      _c(
        "vx-card",
        { staticClass: "mt-base", attrs: { title: "Personal Details" } },
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
                  [_vm._v(_vm._s(_vm.errors.first("telephone_number")))]
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
              _c(
                "label",
                { staticClass: "vs-input--label", attrs: { for: "country" } },
                [_vm._v("Country")]
              ),
              _vm._v(" "),
              _c("country-select", {
                staticClass: "w-full vs-inputx vs-input--input normal",
                attrs: {
                  label: "Country",
                  name: "country",
                  country: _vm.country,
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
                        return _vm.updateProfile($event)
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/profile/components/Profile.vue":
/*!***************************************************************!*\
  !*** ./resources/js/src/views/profile/components/Profile.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Profile_vue_vue_type_template_id_f09bf580___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=f09bf580& */ "./resources/js/src/views/profile/components/Profile.vue?vue&type=template&id=f09bf580&");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js& */ "./resources/js/src/views/profile/components/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Profile_vue_vue_type_template_id_f09bf580___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Profile_vue_vue_type_template_id_f09bf580___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/profile/components/Profile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/profile/components/Profile.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/profile/components/Profile.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/profile/components/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/profile/components/Profile.vue?vue&type=template&id=f09bf580&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/src/views/profile/components/Profile.vue?vue&type=template&id=f09bf580& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_f09bf580___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=template&id=f09bf580& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/profile/components/Profile.vue?vue&type=template&id=f09bf580&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_f09bf580___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_f09bf580___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);