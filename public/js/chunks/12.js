(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Add.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/domains/Add.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form */ "./resources/js/src/views/admin/domains/Form.vue");
/* harmony import */ var _MaskedInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MaskedInput */ "./resources/js/src/views/admin/domains/MaskedInput.vue");
//
//
//
//
//
//
//
//
//
//
//
//
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
      domain: "",
      available: 1,
      price: "",
      guest_post: false,
      guest_post_price: "",
      domain_authority: "",
      page_authority: "",
      citation_flow: "",
      referring_domains: "",
      domain_rating: "",
      trust_flow: "",
      alexis_rank: "",
      google_index: "",
      monthly_uniques: "",
      category1: "",
      category2: "",
      category3: "",
      top_level_domain: "",
      lang: "",
      masked: "",
      booleanOptions: [{
        text: 'No',
        value: 0
      }, {
        text: 'Yes',
        value: 1
      }],
      showFormAlert: false,
      formStatus: false,
      formErrorMsg: ""
    };
  },
  components: {
    DomainForm: _Form__WEBPACK_IMPORTED_MODULE_0__["default"],
    MaskedInput: _MaskedInput__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  mounted: function mounted() {},
  methods: {
    backToDomain: function backToDomain() {
      this.$router.push({
        name: "Domains List"
      });
    },
    submitForm: function submitForm() {
      var _this = this;

      this.$refs['domain_form'].$validator.validateAll().then(function (result) {
        if (result) {
          _this.$vs.loading();

          _this.$http.post("admin/domains", {
            domain: _this.domain,
            available: _this.available,
            price: _this.price,
            guest_post: _this.guest_post,
            guest_post_price: _this.guest_post_price,
            // domain_authority: this.domain_authority,
            // page_authority: this.page_authority,
            // referring_domains: this.referring_domains,
            // domain_rating: this.domain_rating,
            // trust_flow: this.trust_flow,
            // alexis_rank: this.alexis_rank,
            // citation_flow: this.citation_flow,
            // google_index: this.google_index,
            // monthly_uniques: this.monthly_uniques,
            // category1: this.category1,
            // category2: this.category2,
            // category3: this.category3,
            // top_level_domain: this.top_level_domain,
            lang: _this.lang,
            masked: _this.masked
          }).then(function (response) {
            _this.$vs.loading.close();

            var success = {
              title: "Success",
              description: response.data.message,
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
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Add.vue?vue&type=template&id=a5299c72&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/domains/Add.vue?vue&type=template&id=a5299c72& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
          _c("div", { staticClass: "vx-col sm:w-full md:w-1/3 lg:w-1/4" }, [
            _c(
              "form",
              [
                _c(
                  "vx-card",
                  { staticClass: "mt-base", attrs: { title: "Details" } },
                  [
                    _c(
                      "domain-form",
                      { ref: "domain_form", attrs: { data: this.$data } },
                      [_c("masked-input", { attrs: { data: this.$data } })],
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

/***/ "./resources/js/src/views/admin/domains/Add.vue":
/*!******************************************************!*\
  !*** ./resources/js/src/views/admin/domains/Add.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Add_vue_vue_type_template_id_a5299c72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Add.vue?vue&type=template&id=a5299c72& */ "./resources/js/src/views/admin/domains/Add.vue?vue&type=template&id=a5299c72&");
/* harmony import */ var _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Add.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/domains/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Add_vue_vue_type_template_id_a5299c72___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Add_vue_vue_type_template_id_a5299c72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/domains/Add.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/domains/Add.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/admin/domains/Add.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/domains/Add.vue?vue&type=template&id=a5299c72&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/admin/domains/Add.vue?vue&type=template&id=a5299c72& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_a5299c72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=template&id=a5299c72& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/domains/Add.vue?vue&type=template&id=a5299c72&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_a5299c72___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_a5299c72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);