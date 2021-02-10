<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:m-0 m-4">
            <vx-card v-show="showForm" fixedHeight>
                <div slot="no-body" class="full-page-bg-color">
                    <vs-row>
                        <vs-col class="text-center my-8">
                            <h2 class="font-bold text-primary">
                                {{paymentCurrency}} {{paymentAmount | numeralFormat("0,0.00")}}
                            </h2>
                        </vs-col>
                    </vs-row>

                    <vs-row class="mt-4 justify-center" vs-w="12">
                        <vs-tabs alignment="center">
                            <vs-tab label="Stripe" @click="configureStripeForm">
                                <div>
                                    <vs-row class="my-6 px-6 justify-between" vs-w="12">
                                        <vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">
                                            <div id="stripe-card-element"></div>

                                            <div id="stripe-card-errors" role="alert"></div>
                                        </vs-col>
                                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                                            <vs-button class="w-full my-5" @click.stop="submitStripeForm">Pay
                                                {{paymentCurrency}} {{paymentAmount | numeralFormat("0,0.00")}}
                                            </vs-button>
                                        </vs-col>
                                    </vs-row>
                                </div>
                            </vs-tab>
                            <vs-tab label="MerchantE">
                                <div>

                                </div>
                            </vs-tab>
                        </vs-tabs>
                    </vs-row>

                    <!--<vs-row class="px-6 justify-between" vs-w="12">-->
                    <!--<vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">-->
                    <!--<vs-input label="Name on Card" name="nameOnCard" v-model="paymentCard.nameOnCard"-->
                    <!--class="w-full mt-5"-->
                    <!--v-validate="'required|alpha_spaces|max:255'" @click.stop=""/>-->
                    <!--<span class="text-danger w-full text-sm" v-show="errors.has('nameOnCard')">{{ errors.first("nameOnCard") }}</span>-->
                    <!--</vs-col>-->

                    <!--<vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">-->
                    <!--<vs-input-->
                    <!--label="Card Number"-->
                    <!--name="cardNumber"-->
                    <!--v-model="paymentCard.number"-->
                    <!--class="w-full mt-5"-->
                    <!--icon="credit_card"-->
                    <!--v-validate="'required|digits:16'"-->
                    <!--@click.stop=""-->
                    <!--/>-->
                    <!--<span class="text-danger w-full text-sm" v-show="errors.has('cardNumber')">{{ errors.first("cardNumber") }}</span>-->
                    <!--</vs-col>-->

                    <!--<vs-col vs-type="flex-end" vs-justify="centern" vs-align="center" vs-w="2">-->
                    <!--<vs-input label="MM" name="cardExpiryMonth" v-model="paymentCard.expiryMonth"-->
                    <!--class="w-full mt-5"-->
                    <!--v-validate="'required|digits:2'"/>-->
                    <!--<span class="text-danger w-full text-sm"-->
                    <!--v-show="errors.has('cardExpiryMonth')">{{ errors.first("cardExpiryMonth") }}</span>-->
                    <!--</vs-col>-->

                    <!--<vs-col vs-type="flex-end" vs-justify="centern" vs-align="center" vs-w="2">-->
                    <!--<vs-input label="YY" name="cardExpiryYear" v-model="paymentCard.expiryYear"-->
                    <!--class="w-full mt-5"-->
                    <!--v-validate="'required|digits:2'"/>-->
                    <!--<span class="text-danger w-full text-sm"-->
                    <!--v-show="errors.has('cardExpiryYear')">{{ errors.first("cardExpiryYear") }}</span>-->
                    <!--</vs-col>-->

                    <!--<vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="2"></vs-col>-->
                    <!--<vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="4">-->
                    <!--<vs-input label="CVC" name="cardCVC" v-model="paymentCard.cvv" class="w-full mt-5"-->
                    <!--icon="credit_card" v-validate="'required|digits:3'"/>-->
                    <!--<span class="text-danger w-full text-sm" v-show="errors.has('cardCVC')">{{ errors.first("cardCVC") }}</span>-->
                    <!--</vs-col>-->

                    <!--<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">-->
                    <!--<vs-button class="w-full my-5" @click.stop="submitCardForm">Pay-->
                    <!--{{paymentCurrency}} {{paymentAmount | numeralFormat("0,0.00")}}-->
                    <!--</vs-button>-->
                    <!--</vs-col>-->
                    <!--</vs-row>-->
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                showForm: false,
                paymentCard: {
                    nameOnCard: "",
                    number: "",
                    expiryMonth: "",
                    expiryYear: "",
                    cvv: "",
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
            validateCredentials() {
                return new Promise((resolve, reject) => {
                    let message;
                    if (typeof this.publishableKey !== 'string') {
                        message = 'Please provide a publishable key';
                        this.$vs.notify({
                            color: "danger",
                            text: message,
                        });
                        reject({message});
                    }
                    let keyLength = this.publishableKey.length;
                    if (this.publishableKey.includes('_test_')) {
                        keyLength -= 5;
                    }
                    if (keyLength !== 38 || this.publishableKey.slice(0, 3) !== 'pk_') {
                        message = 'Please provide a valid publishable key';
                        this.$vs.notify({
                            color: "danger",
                            text: message,
                        });
                        reject({message});
                    }
                    if (typeof this.paymentSecret !== 'string') {
                        message = 'Please provide a payment secret';
                        this.$vs.notify({
                            color: "danger",
                            text: message,
                        });
                        reject({message});
                    }
                    if (this.paymentSecret.length !== 255 || this.paymentSecret.slice(0, 3) !== 'ps_') {
                        message = 'Please provide a valid payment secret';
                        this.$vs.notify({
                            color: "danger",
                            text: message,
                        });
                        reject({message});
                    }
                    resolve();
                });
            },

            getPaymentInfo() {
                this.$vs.loading();
                this.$http.get('payment', {
                    params: {
                        publishable_key: this.publishableKey,
                        payment_secret: this.paymentSecret
                    }
                })
                    .then((response) => {
                        this.paymentAmount = response.data.data.amount;
                        this.paymentCurrency = response.data.data.currency;
                        this.showPaymentForm();
                    })
                    .catch((error) => {
                        this.$vs.notify({
                            color: "danger",
                            text: error.message,
                        });
                    })
                    .finally(() => {
                        this.$vs.loading.close();
                    });
            },
            showPaymentForm() {
                this.configureStripeForm();

                this.showForm = true;
            },
            configureStripeForm() {
                let elements = this.stripe.obj.elements();
                let style = {
                    base: {
                        color: "#32325d",
                    }
                };

                this.stripe.card = elements.create("card", style);
                setTimeout(function () {
                    document.getElementById('stripe-card-element').innerHTML = '';
                    this.stripe.card.mount("#stripe-card-element");
                    this.stripe.card.on('change', function (event) {
                        let displayError = document.getElementById('stripe-card-errors');
                        if (event.error) {
                            displayError.textContent = event.error.message;
                        } else {
                            displayError.textContent = '';
                        }
                    });
                }.bind(this), 300);
            },
            submitStripeForm() {
                this.$vs.loading();
                this.stripe.obj.createToken(this.stripe.card).then((result) => {
                    if (result.error) {
                        this.$vs.loading.close();
                        // Inform the customer that there was an error.
                        let errorElement = document.getElementById('stripe-card-errors');
                        errorElement.textContent = result.error.message;
                    } else {
                        // Send the token to your server.
                        this.confirmPayment({
                            token: result.token.id
                        });
                    }
                });
            },
            confirmPayment(params) {
                Object.assign(params, {
                    publishable_key: this.publishableKey,
                    payment_secret: this.paymentSecret,
                    payment_gateway: this.paymentGateway
                });
                this.$http.post('/confirm_payment', params).then((result) => {
                    if (result.status === 202) {
                        window.location.href = result.data.url;
                        return false;
                    }
                    try {
                        if (window.opener && !window.opener.closed) {
                            result.data.code = 200;
                            window.opener.postMessage(result.data, '*');
                        }
                    } catch (err) {
                    }
                    window.close();
                    return false;
                })
                    .catch((error) => {
                        try {
                            if (window.opener && !window.opener.closed) {
                                window.opener.postMessage({
                                    message: error.message,
                                    code: 400
                                }, '*');
                            }
                        } catch (err) {
                        }
                        window.close();
                        return false;
                    });
            }
        },
        mounted() {
            this.publishableKey = this.$route.query.pk;
            this.paymentSecret = this.$route.query.ps;
            this.mode = this.publishableKey.includes('_test_') ? 'test' : 'live';
            let stripeKey;
            // todo should fix the dotenv library issue to load keys using dotenv.
            if (this.mode === 'live') {
                stripeKey = 'pk_test_ZGlwYNawjOpsQxLbkgKqmWwu00Evfb4UmF'; // should load the live key
            } else {
                stripeKey = 'pk_test_ZGlwYNawjOpsQxLbkgKqmWwu00Evfb4UmF';
            }
            this.stripe.obj = Stripe(stripeKey);
            this.validateCredentials().then(() => {
                this.getPaymentInfo();
            });
        }
    };
</script>