<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:m-0 m-4">
            <vx-card v-show="showPaymentForm" fixedHeight>
                <div slot="no-body" class="full-page-bg-color">
                    <vs-row>
                        <vs-col class="text-center my-8">
                            <h2 class="font-bold text-primary">
                                {{paymentCurrency}} {{paymentAmount | numeralFormat("0,0.00")}}
                            </h2>
                        </vs-col>
                    </vs-row>
                    <vs-row class="px-6 justify-between" vs-w="12">
                        <!--<vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">-->
                            <!--<vs-input label="Name on Card" name="nameOnCard" v-model="paymentCard.nameOnCard"-->
                                      <!--class="w-full mt-5"-->
                                      <!--v-validate="'required|alpha_spaces|max:255'" @click.stop=""/>-->
                            <!--<span class="text-danger w-full text-sm" v-show="errors.has('nameOnCard')">{{ errors.first("nameOnCard") }}</span>-->
                        <!--</vs-col>-->

                        <vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">
                            <vs-input
                                    label="Card Number"
                                    name="cardNumber"
                                    v-model="paymentCard.number"
                                    class="w-full mt-5"
                                    icon="credit_card"
                                    v-validate="'required|digits:16'"
                                    @click.stop=""
                            />
                            <span class="text-danger w-full text-sm" v-show="errors.has('cardNumber')">{{ errors.first("cardNumber") }}</span>
                        </vs-col>

                        <vs-col vs-type="flex-end" vs-justify="centern" vs-align="center" vs-w="2">
                            <vs-input label="MM" name="cardExpiryMonth" v-model="paymentCard.expiryMonth"
                                      class="w-full mt-5"
                                      v-validate="'required|digits:2'"/>
                            <span class="text-danger w-full text-sm"
                                  v-show="errors.has('cardExpiryMonth')">{{ errors.first("cardExpiryMonth") }}</span>
                        </vs-col>

                        <vs-col vs-type="flex-end" vs-justify="centern" vs-align="center" vs-w="2">
                            <vs-input label="YY" name="cardExpiryYear" v-model="paymentCard.expiryYear"
                                      class="w-full mt-5"
                                      v-validate="'required|digits:2'"/>
                            <span class="text-danger w-full text-sm"
                                  v-show="errors.has('cardExpiryYear')">{{ errors.first("cardExpiryYear") }}</span>
                        </vs-col>

                        <vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
                        <vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="4">
                            <vs-input label="CVC" name="cardCVC" v-model="paymentCard.cvv" class="w-full mt-5"
                                      icon="credit_card" v-validate="'required|digits:3'"/>
                            <span class="text-danger w-full text-sm" v-show="errors.has('cardCVC')">{{ errors.first("cardCVC") }}</span>
                        </vs-col>

                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <vs-button class="w-full my-5" @click.stop="submitCardForm">Pay
                                {{paymentCurrency}} {{paymentAmount | numeralFormat("0,0.00")}}
                            </vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                showPaymentForm: false,
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
                    .then(function (response) {
                        this.paymentAmount = response.data.data.amount;
                        this.paymentCurrency = response.data.data.currency;
                        this.showPaymentForm = true;
                    }.bind(this))
                    .catch(function (error) {
                        this.$vs.notify({
                            color: "danger",
                            text: error.message,
                        });
                    }.bind(this))
                    .finally(() => {
                        this.$vs.loading.close();
                    });
            },
            submitCardForm() {
                // this.$vs.loading();
                this.$http.post('/confirm_payment', {
                    card: this.paymentCard,
                    publishable_key: this.publishableKey,
                    payment_secret: this.paymentSecret,
                    payment_gateway: this.paymentGateway
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
            }
        },
        mounted() {
            this.publishableKey = this.$route.query.pk;
            this.paymentSecret = this.$route.query.ps;
            this.validateCredentials().then(() => {
                this.getPaymentInfo();
            });
        }
    };
</script>