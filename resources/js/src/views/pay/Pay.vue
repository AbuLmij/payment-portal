<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:m-0 m-4">
            <vx-card v-show="showPaymentForm" fixedHeight>
                <div slot="no-body" class="full-page-bg-color">
                    <vs-row class="px-6" vs-w="12">
                        <vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">
                            <vs-input label="Name on Card" name="nameOnCard" v-model="nameOnCard" class="w-full mt-5"
                                      v-validate="'required|alpha_spaces|max:255'" @click.stop=""/>
                            <span class="text-danger w-full text-sm" v-show="errors.has('nameOnCard')">{{ errors.first("nameOnCard") }}</span>
                        </vs-col>

                        <vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">
                            <vs-input
                                    label="Card Number"
                                    name="cardNumber"
                                    v-model="cardNumber"
                                    class="w-full mt-5"
                                    icon="credit_card"
                                    v-validate="'required|digits:16'"
                                    @click.stop=""
                            />
                            <span class="text-danger w-full text-sm" v-show="errors.has('cardNumber')">{{ errors.first("cardNumber") }}</span>
                        </vs-col>

                        <vs-col vs-type="flex-end" vs-justify="centern" vs-align="center" vs-w="6">
                            <vs-input label="MMYYYY" name="cardExpiry" v-model="cardExpiry" class="w-full mt-5"
                                      v-validate="'required|digits:6'" @click.stop=""/>
                            <span class="text-danger w-full text-sm" v-show="errors.has('cardExpiry')">{{ errors.first("cardExpiry") }}</span>
                        </vs-col>
                        <vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="1"></vs-col>
                        <vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="5">
                            <vs-input label="CVC" name="cardCVC" v-model="cardCVC" class="w-full mt-5"
                                      icon="credit_card" v-validate="'required|digits:3'" @click.stop=""/>
                            <span class="text-danger w-full text-sm" v-show="errors.has('cardCVC')">{{ errors.first("cardCVC") }}</span>
                        </vs-col>

                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <vs-button class="w-full my-5" @click.stop="submitCardForm">Pay
                                <!--{{ cartData.order.total |-->
                                <!--numeralFormat("$ 0,0.00") }}-->
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
                nameOnCard: "",
                cardNumber: "",
                cardExpiry: "",
                cardCVC: "",
                publishableKey: "",
                paymentSecret: ""
            };
        },
        methods: {
            validateCredentials() {
                this.publishableKey = this.$route.query.pk;
                this.paymentSecret = this.$route.query.ps;
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
                this.$http.get('payment', {
                    params: {
                        publishable_key: this.publishableKey,
                        payment_secret: this.paymentSecret
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    }.bind(this))
                    .catch(function (error) {
                        this.$vs.notify({
                            color: "danger",
                            text: error.message,
                        });
                    })
                    .finally(() => {
                        this.$vs.loading.close();
                    });
            }
        },
        mounted() {
            this.validateCredentials().then(() => {
                console.log('then');
                this.getPaymentInfo();
            });
            // this.$vs.loading();
            // console.log(this.$route.query.pk, this.$route.query.ps);
        }
    };
</script>