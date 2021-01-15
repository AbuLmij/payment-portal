<template>
	<div id="domain-add">
		<vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
			<div class="vx-col sm:w-full md:w-1/3 lg:w-1/4">
				<form>
					<vx-card title="Details" class="mt-base">
                        <domain-form ref="domain_form" :data="this.$data">
                            <masked-input :data="this.$data"></masked-input>
                        </domain-form>
                        <div class="vx-row">
							<div class="vx-col w-full">
								<vs-button class="mt-8 mb-8 float-right" @click.prevent="submitForm">Add</vs-button>
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
        },
        methods: {
            backToDomain() {
                this.$router.push({name: "Domains List"});
            },
            submitForm: function () {
				this.$refs['domain_form'].$validator.validateAll().then((result) => {
                    if (result) {
                        this.$vs.loading();
                        this.$http
                            .post("admin/domains", {
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

                                    let success = {
                                        title: "Success",
                                        description: response.data.message,
                                        color: "success",
                                    };
                                    this.$store.commit("MESSAGE_NOTIFICATION", success);

                                    this.backToDomain();
                                },
                                (error) => {
                                    this.$vs.loading.close();
                                    let mssgDescription = "";

                                    if (error.response.data.message !== undefined) {
                                        mssgDescription = error.response.data.message;
                                    }

                                    if (error.response.data.errors !== undefined) {
                                        for (var key in error.response.data.errors) {
                                            mssgDescription += error.response.data.errors[key];
                                        }
                                    }
                                    let fail = {
                                        title: "Oops",
                                        description: mssgDescription,
                                        color: "danger",
                                    };
                                    this.$store.commit("MESSAGE_NOTIFICATION", fail);
                                }
                            );
                    }
                });
            },
        },
    };
</script>
