<template>
    <div id="domain-add">
        <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
            <div class="vx-col sm:w-full md:w-1/3 lg:w-1/4">
                <form>
                    <vx-card title="Details" class="mt-base">
                        <vs-input
                                label="Code"
                                name="code"
                                v-model="code"
                                class="w-full mt-5 promo-code-input"
                                v-validate="'required|alpha_num|length:6'"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('code')">{{ errors.first('code') }}</span>

                        <vs-input
                                label="Usage Limit (0 = unlimited)"
                                name="usage_limit"
                                v-model="usage_limit"
                                class="w-full mt-5"
                                v-validate="'required|integer|between:0,9999'"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('usage_limit')">{{ errors.first('usage_limit') }}</span>

                        <vs-input
                                label="Discount (%)"
                                name="discount"
                                v-model="discount"
                                class="w-full mt-5"
                                v-validate="'required|decimal:2|between:0.01,100'"
                        />
                        <span class="text-danger text-sm"
                              v-show="errors.has('discount')">{{ errors.first('discount') }}</span>

                        <div v-if="showFormAlert" class="flex flex-wrap justify-between my-5">
                            <vs-alert v-if="formStatus" title="Success" active="true" color="success">
                                Promo Updated
                            </vs-alert>

                            <vs-alert v-else title="Error" active="true" color="danger">
                                {{ formErrorMsg }}
                            </vs-alert>
                        </div>

                        <div class="vx-row">
                            <div class="vx-col w-full">
                                <vs-button class="mt-8 mb-8 float-right" @click.prevent="submitForm">Update</vs-button>
                            </div>
                        </div>
                    </vx-card>
                </form>
            </div>
        </vs-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                code: "",
                usage_limit: "",
                discount: "",
                showFormAlert: false,
                formStatus: false,
                formErrorMsg: '',
            }
        },
        mounted: function () {
            this.getData();
        },
        methods: {
            backToPromo() {
                this.$router.push({name: "Promos"});
            },
            getData() {
                this.$vs.loading();
                var self = this.$data;

                this.$http.get('/admin/promos/' + self.id)
                    .then((response) => {
                        self.code = response.data.code;
                        self.usage_limit = response.data.usage_limit;
                        self.discount = response.data.discount;

                        this.$vs.loading.close();
                    }, (error) => {
                        self.showFormAlert = true
                        self.formStatus = false
                        if (error.response.data.message !== undefined) {
                            self.formErrorMsg = error.response.data.message
                        }

                        if (error.response.data.errors !== undefined) {
                            for (var key in error.response.data.errors) {
                                self.formErrorMsg += error.response.data.errors[key]
                            }
                        }
                    })
            },
            submitForm: function () {
                var self = this.$data

                // RESET FORM ALERT
                self.showFormAlert = false
                self.formStatus = false
                self.formErrorMsg = ''

                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$vs.loading();
                        this.$http.patch('/admin/promos/' + self.id, {
                            code: self.code,
                            usage_limit: self.usage_limit,
                            discount: self.discount,
                        })
                            .then((response) => {
                                this.$vs.loading.close();
                                let success = {
                                    title: "Success",
                                    description: response.data.message,
                                    color: "success",
                                    time: 4500,
                                };
                                this.$store.commit("MESSAGE_NOTIFICATION", success);

                                this.backToPromo();
                            }, (error) => {
                                this.$vs.loading.close()

                                self.showFormAlert = true
                                self.formStatus = false
                                if (error.response.data.message !== undefined) {
                                    self.formErrorMsg = error.response.data.message + '<br>'
                                }

                                if (error.response.data.errors !== undefined) {
                                    for (var key in error.response.data.errors) {
                                        self.formErrorMsg += error.response.data.errors[key] + '<br>'
                                    }
                                }
                            })
                    }
                })
            },
        },
    }
</script>
