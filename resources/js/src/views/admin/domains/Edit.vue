<template>
    <div id="domain-add">
        <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
            <div class="vx-col sm:w-full md:w-1/3 lg:w-1/4">
                <form>
                    <vx-card title="Masked Domain ?" class="mt-base">
                        <masked-input :data="this.$data"></masked-input>

                        <div class="vx-row">
                            <div class="vx-col w-full">
                                <vs-button class="my-4 float-right" @click.prevent="updateMasked">Update</vs-button>
                            </div>
                        </div>
                    </vx-card>
                </form>
            </div>
        </vs-row>
        <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
            <div class="vx-col sm:w-full md:w-1/3 lg:w-1/4">
                <form>
                    <vx-card title="Details" class="mt-base">
                        <domain-form ref="domain_form" :data="this.$data"></domain-form>
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
    import DomainForm from './Form';
    import MaskedInput from './MaskedInput';

    export default {
        data() {
            return {
                id: this.$route.params.id,
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
                booleanOptions: [
                    {text: 'No', value: 0},
                    {text: 'Yes', value: 1},
                ],
                showFormAlert: false,
                formStatus: false,
                formErrorMsg: "",
            };
        },
        components: {
            DomainForm,
            MaskedInput
        },
        mounted: function () {
            this.getData();
        },
        methods: {
            getData() {
                this.$vs.loading();
                var self = this.$data;

                // Valid
                this.$http.get("admin/domains/" + self.id).then(
                    (response) => {
                        self.domain = response.data.domain;
                        self.price = response.data.price;
                        self.guest_post = response.data.guest_post;
                        self.guest_post_price = response.data.guest_post_price;
                        self.lang = response.data.lang;
                        self.masked = response.data.masked;

                        this.$vs.loading.close();
                        //console.log(self)
                    },
                    (error) => {
                        self.showFormAlert = true;
                        let errorMessage = null;

                        self.formStatus = false;

                        if (error.response.data.message !== undefined) {
                            errorMessage = error.response.data.message;
                        }

                        if (error.response.data.errors !== undefined) {
                            for (var key in error.response.data.errors) {
                                errorMessage += error.response.data.errors[key];
                            }
                        }

                        let fail = {
                            title: "Oops",
                            description: errorMessage,
                            color: "danger",
                        };
                        this.$store.commit("MESSAGE_NOTIFICATION", fail);

                        this.backToDomain();
                    }
                );
            },
            backToDomain() {
                this.$router.push({name: "Domains List"});
            },
            submitForm: function () {
                this.$refs['domain_form'].$validator.validateAll().then((result) => {
                    if (result) {
                        this.$vs.loading();
                        this.$http
                            .patch("admin/domains/" + this.id, {
                                domain: this.domain,
                                available: this.available,
                                price: this.price,
                                guest_post: this.guest_post,
                                guest_post_price: this.guest_post_price,
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
                                lang: this.lang,
                                masked: this.masked,
                            })
                            .then(
                                (response) => {
                                    this.$vs.loading.close();

                                    if (response.status == 200) {
                                        let success = {
                                            title: "Success",
                                            description: response.data.message,
                                            color: "success",
                                        };
                                        this.$store.commit("MESSAGE_NOTIFICATION", success);
                                    }

                                    this.backToDomain();
                                },
                                (error) => {
                                    this.$vs.loading.close();

                                    if (error.response.data.message !== undefined) {
                                        errorMessage = error.response.data.message;
                                    }

                                    if (error.response.data.errors !== undefined) {
                                        for (var key in error.response.data.errors) {
                                            errorMessage += error.response.data.errors[key];
                                        }
                                    }

                                    let fail = {
                                        title: "Oops",
                                        description: errorMessage,
                                        color: "danger",
                                    };
                                    this.$store.commit("MESSAGE_NOTIFICATION", fail);
                                }
                            );
                    }
                });
            },
            updateMasked: function () {
                var self = this.$data;
                this.$vs.loading();
                this.$http
                    .patch(`admin/domains/${self.id}/masked`, {
                        masked: self.masked,
                    })
                    .then(
                        (response) => {
                            this.$vs.loading.close();

                            if (response.status == 200) {
                                let success = {
                                    title: "Success",
                                    description: response.data.message,
                                    color: "success",
                                };
                                this.$store.commit("MESSAGE_NOTIFICATION", success);
                            }

                            this.backToDomain();
                        },
                        (error) => {
                            this.$vs.loading.close();

                            if (error.response.data.message !== undefined) {
                                errorMessage = error.response.data.message;
                            }

                            if (error.response.data.errors !== undefined) {
                                for (var key in error.response.data.errors) {
                                    errorMessage += error.response.data.errors[key];
                                }
                            }

                            let fail = {
                                title: "Oops",
                                description: errorMessage,
                                color: "danger",
                            };
                            this.$store.commit("MESSAGE_NOTIFICATION", fail);

                            this.backToDomain();
                        }
                    );
            }
        },
    };
</script>
