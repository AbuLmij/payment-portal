<template>
    <!-- CART DROPDOWN -->
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <vs-prompt :active.sync="initCheckout" color="dark" title="Checkout" :buttons-hidden="true">
            <vs-row vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                    <vs-avatar color="#e3eaff" icon="attach_money" size="68px" id="checkoutPromptAvatar"/>
                </vs-col>
                <vs-col class="mt-2" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                    <h2>Total: {{ totalPayment | numeralFormat("$ 0,0.00") }}</h2>
                </vs-col>
            </vs-row>
            <div class="mt-10">
                <div id="card-element"></div>

                <div id="card-errors" role="alert"></div>

                <vs-button class="w-full my-10" @click.stop="submitCardForm">Pay {{ totalPayment |
                    numeralFormat("$ 0,0.00") }}
                </vs-button>
            </div>
            <!--<vs-row class="mt-4" vs-w="12" id="checkoutPaymentMethodSelection">-->
                <!--<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">-->
                    <!--<button type="button" @click.stop="paymentMethod('Card')"-->
                            <!--class="vs-component vs-button vs-button-primary w-11/12">Card-->
                    <!--</button>-->
                <!--</vs-col>-->
                <!--<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">-->
                    <!--<button type="button" @click.stop="paymentMethod('PayPal')"-->
                            <!--class="vs-component vs-button vs-button-primary w-11/12 py-2">-->
                        <!--<img src="@assets/images/pages/paypal-icon.png" style="max-height: 1.5rem"/>-->
                    <!--</button>-->
                <!--</vs-col>-->
            <!--</vs-row>-->

            <!--<vs-row v-else class="mt-4" vs-w="12">-->
                <!--<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">-->
                    <!--<div class="w-full">-->
                        <!--<PayPal-->
                                <!--:env="paypalEnv"-->
                                <!--:amount="cartData.order.total"-->
                                <!--:client="paypalConfig"-->
                                <!--:invoice-number="cartData.order.order_ref_num"-->
                                <!--:button-style="paypalBtnStyle"-->
                                <!--:notify-url="paypalIPNURL"-->
                                <!--currency="USD"-->
                                <!--v-on:payment-authorized="paypalPaymentAuthorized"-->
                                <!--v-on:payment-completed="paypalPaymentCompleted"-->
                                <!--v-on:payment-cancelled="paypalPaymentCancelled">-->
                        <!--</PayPal>-->
                        <!--&lt;!&ndash;-->
                        <!--<vs-button class="w-full my-2" id="paypal-button-container">PayPal Checkout</vs-button>-->
                        <!--&ndash;&gt;-->
                    <!--</div>-->
                <!--</vs-col>-->
            <!--</vs-row>-->
        </vs-prompt>

        <!--
      <feather-icon color="primary" icon="ShoppingCartIcon" class="cursor-pointer ml-4 mr-6 mt-1" :badge="cartData.order_item.length" />
      -->
        <vs-button class="cursor-pointer px-3 mx-2 text-primary" color="rgb(227, 234, 255)" icon="shopping_cart"
                   type="filled" :badge="cartData.order_item.length">
            <b>Cart</b>
        </vs-button>

        <vs-dropdown-menu v-show="!initCheckout" class="cart-dropdown vx-navbar-dropdown"
                          :class="{ 'dropdown-custom': cartData.order_item.length }">
            <!-- IF CART HAVE ITEMS: HEADER -->
            <template v-if="cartData.order_item.length > 0">
                <div class="notification-header text-center p-5 bg-primary text-white">
                    <h3 class="text-white">{{ cartData.order_item.length }} Item<span
                            v-show="cartData.order_item.length > 1">s</span></h3>
                    <p class="opacity-75">In Your Cart</p>
                </div>

                <!-- CART ITEMS -->
                <component :is="scrollbarTag" ref="mainSidebarPs" class="scroll-area--cart-items-dropdowm p-0 mb-10"
                           :settings="settings" :key="$vs.rtl">
                    <ul class="bordered-items">
                        <li v-for="item in cartData.order_item" :key="item.objectID"
                            class="vx-row no-gutter cart-item cursor-pointer">
                            <div class="vx-col pl-3 py-4 sm:w-7/12">
                                <span class="font-medium block cart-item-title truncate">{{ item.domain }}</span>
                            </div>
                            <div class="vx-col py-4 sm:w-4/12 text-right">
								<span class="text-sm font-medium">
									{{ item.sub_total | numeralFormat("$ 0,0.00") }}
								</span>
                            </div>
                            <div class="vx-col pr-3 py-4 sm:w-1/12 text-right">
                                <feather-icon
                                        icon="TrashIcon"
                                        svgClasses="h-4 w-4 cursor-pointer text-danger"
                                        class="hover:text-danger"
                                        @click.stop="removeCartItem(item.domain_id)"
                                />
                            </div>
                        </li>
                        <li class="vx-row no-gutter cart-item cursor-pointer mt-8" id="cart_promo_block">
                            <div v-if="cartPromoCode" class="vx-col pl-3 py-4 sm:w-1/2">
                                <b>{{ cartPromoCode }}</b>
                            </div>
                            <div v-if="cartPromoCode" class="vx-col pr-3 py-4 sm:w-1/2 text-right text-danger">
                                <b>{{ cartDiscount | numeralFormat("0,0.00") }}%</b>
                            </div>

                            <div v-if="!cartPromoCode" class="vx-col pl-3 py-4 sm:w-1/2">
                                <vs-input placeholder="Enter Promo Code" size="small" name="cartPromoCode"
                                          v-model="promoCode" class="w-full promo-code-input"/>
                            </div>
                            <div v-if="!cartPromoCode" class="vx-col pr-3 py-4 sm:w-1/2 text-right">
                                <a href="#" color="primary" @click.stop="applyPromoCode">APPLY</a>
                            </div>
                        </li>
                        <li class="vx-row no-gutter cursor-pointer border-0" id="cart_total_block">
                            <div class="vx-col pl-3 py-4 sm:w-1/3">
                                <b class="font-medium block cart-item-title truncate">TOTAL</b>
                            </div>
                            <div class="vx-col pr-3 py-4 sm:w-2/3 text-right">
                                <b class="font-medium block cart-item-title truncate">{{ cartData.order.total |
                                    numeralFormat("$ 0,0.00") }}</b>
                            </div>
                        </li>
                    </ul>
                </component>
                <div
                        id="btn_checkout"
                        class="checkout-footer fixed bottom-0 rounded-b-lg text-primary font-semibold w-full p-2 text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
                        @click.stop="initCheckoutSession"
                >
					<span class="flex items-center justify-center">
						<feather-icon icon="ShoppingCartIcon" svgClasses="h-4 w-4"/>
						<span class="ml-2">Checkout</span>
					</span>

                </div>
            </template>

            <!-- IF CART IS EMPTY -->
            <template v-else>
                <div class="text-center p-5">
                    <h4>Your cart is empty</h4>
                    <p class="pt-3 px-8 pb-3">Go ahead! select a domain you like and add it to your cart.</p>
                </div>
            </template>
        </vs-dropdown-menu>
    </vs-dropdown>
</template>
<script>
    import {Validator} from "vee-validate";
    import VuePerfectScrollbar from "vue-perfect-scrollbar";

    const custom_err_message = {
        custom: {
            nameOnCard: {
                required: "Name required",
                alpha_spaces: "Alphabetic characters and spaces are only allowed",
                max: "Maximum of 255 characters are allowed",
            },
            cardNumber: {
                required: "Card Number required",
                digits: "Invalid Card Number",
            },
            cardExpiry: {
                required: "Expiry required",
                digits: "Invalid Expiry",
            },
            cardCVC: {
                required: "CVC required",
                digits: "Invalid CVC",
            },
        },
    };

    // register custom messages
    Validator.localize("en", custom_err_message);

    // import PayPal from "vue-paypal-checkout";

    export default {
        components: {
            VuePerfectScrollbar,
            // PayPal,
        },
        data() {
            return {
                promoCode: "",
                initCheckout: false,
                selectedPaymentMethod: "Card",
                stripeObj: null,
                totalPayment: 0,
                paymentIntentSecret: "",
                paymentCard: null,

                // CARD
                nameOnCard: "",
                cardNumber: "",
                cardExpiry: "",
                cardCVC: "",

                // PAYPAL
                paypalEnv: this.$store.state.ppConfigData.pp_mode,
                paypalConfig: {
                    sandbox: this.$store.state.ppConfigData.pp_sandbox_token,
                    production: this.$store.state.ppConfigData.pp_production_token,
                },
                paypalBtnStyle: {
                    label: "checkout",
                    size: "responsive",
                    shape: "rect",
                    color: "gold",
                },
                paypalIPNURL: process.env.MIX_PAYPAL_IPN_URL,

                settings: {
                    // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: 0.6,
                },
            };
        },
        mounted() {
            this.$store.dispatch('getCartData');
            this.stripeObj = Stripe("pk_test_ZGlwYNawjOpsQxLbkgKqmWwu00Evfb4UmF");
        },
        computed: {
            // CART DROPDOWN
            cartData() {
                return this.$store.state.currentCartData;
            },
            cartPromoCode() {
                return this.cartData.order.promo_code;
            },
            cartDiscount() {
                return parseFloat(this.cartData.order.discount);
            },
            scrollbarTag() {
                return this.$store.getters.scrollbarTag;
            },
        },
        methods: {
            removeCartItem(domain_id) {
                this.$vs.loading();
                this.$store.dispatch('removeItemFromCart', {domain_id}).catch((ErrorMsg) => {
                    this.$vs.notify({
                        color: "danger",
                        title: "Error",
                        text: ErrorMsg,
                    });
                }).finally(() => {
                    this.$vs.loading.close();
                });
            },
            applyPromoCode() {
                this.$vs.loading();

                var self = this.$data;

                this.$http
                    .put("/orders/applyPromoCode", {
                        promo_code: self.promoCode,
                    })
                    .then(
                        (response) => {
                            this.$vs.loading.close();
                            this.$store.dispatch("updateCartData", response.data.data);

                            this.$vs.notify({
                                color: "success",
                                title: "Promo code applied",
                                text: response.data.message,
                            });
                        },
                        (error) => {
                            this.$vs.loading.close();

                            let ErrorMsg = "";

                            if (error.response.data.message !== undefined) {
                                ErrorMsg += error.response.data.message + "<br>";
                            }

                            if (error.response.data.errors !== undefined) {
                                for (var key in error.response.data.errors) {
                                    ErrorMsg += error.response.data.errors[key] + "<br>";
                                }
                            }

                            this.$vs.notify({
                                color: "danger",
                                title: "Error",
                                text: ErrorMsg,
                            });
                        }
                    );
            },
            initCheckoutSession() {
                this.$vs.loading();
                this.$http.get('orders/checkout')
                    .then(function (response) {
                        this.paymentIntentSecret = response.data.client_secret;
                        this.totalPayment = response.data.total;
                        this.showPaymentForm();
                        this.$store.dispatch('getCartData');
                    }.bind(this))
                    .catch(function (error) {
                        console.error("Error:", error);
                    })
                    .finally(() => {
                        this.$vs.loading.close();
                    });
            },
            showPaymentForm() {
                let elements = this.stripeObj.elements();
                var style = {
                    base: {
                        color: "#32325d",
                    }
                };

                this.paymentCard = elements.create("card", style);
                this.initCheckout = true;
                this.cart = true;
                setTimeout(function () {
                    this.paymentCard.mount("#card-element");
                    this.paymentCard.on('change', function (event) {
                        var displayError = document.getElementById('card-errors');
                        if (event.error) {
                            displayError.textContent = event.error.message;
                        } else {
                            displayError.textContent = '';
                        }
                    });
                }.bind(this), 300)
            },
            paymentMethod(method) {
                var self = this.$data;
                self.selectedPaymentMethod = method;
            },
            submitCardForm() {
                this.$vs.loading();
                this.stripeObj.confirmCardPayment(this.paymentIntentSecret, {
                    payment_method: {
                        card: this.paymentCard
                    }
                }).then(function (result) {
                    this.$vs.loading.close();
                    if (result.error) {
                        this.$store.commit("MESSAGE_NOTIFICATION", {
                            title: 'Error',
                            description: result.error.message,
                            color: 'danger'
                        });
                    } else {
                        // The payment has been processed!
                        if (result.paymentIntent.status === 'succeeded') {
                            this.initCheckout = false;
                            this.$store.commit("MESSAGE_NOTIFICATION", {
                                title: 'Success',
                                description: 'Payment was successful',
                                color: 'success'
                            });
                            this.$router.push({name: 'My Orders'});
                        }
                    }
                }.bind(this));
            },

            // PAYPAL EVENTS
            paypalPaymentAuthorized: function (data) {
                console.log("Payment Authorized");
                //console.log(data);
            },
            paypalPaymentCompleted: function (data) {
                console.log("Payment Completed");
                //console.log(data);
                this.$vs.loading();

                var self = this.$data;
                var order_id = parseInt(this.cartData.order.id) || 0;

                this.$http.put("/orders/paypalUpdatePaymentStatus/" + order_id, data).then(
                    (response) => {
                        this.$vs.loading.close();
                        this.$store.dispatch("updateCartData", response.data.data);

                        this.$vs.notify({
                            color: "success",
                            title: "Transaction Succesfull",
                            text: "Payment was verified",
                        });
                    },
                    (error) => {
                        this.$vs.loading.close();
                        // console.log(error);

                        let ErrorMsg = "";

                        if (error.response.data.message !== undefined) {
                            ErrorMsg += error.response.data.message + "<br>";
                        }

                        if (error.response.data.errors !== undefined) {
                            for (var key in error.response.data.errors) {
                                ErrorMsg += error.response.data.errors[key] + "<br>";
                            }
                        }

                        this.$vs.notify({
                            color: "danger",
                            title: "Error",
                            text: ErrorMsg,
                        });
                    }
                );
            },
            paypalPaymentCancelled: function (data) {
                //console.log("Payment Cancelled");
                //console.log(data);

                this.$vs.notify({
                    color: "warning",
                    title: "Cancelled",
                    text: "Payment was Cancelled",
                });
            },
        },
    };
</script>

<style scoped>
    #card-errors {
        color: red;
    }
</style>