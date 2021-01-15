<template>
    <form>
        <vx-card title="Personal Details" class="mt-base">
            <vs-input label="Full Name" name="name" v-model="name" class="w-full mt-5"
                      v-validate="'required|alpha_spaces|max:255'"/>
            <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span>

            <vs-input label="Email Address" name="email" v-model="email" class="w-full mt-5"
                      v-validate="'required|email|max:255'"/>
            <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>

            <div class="vx-row">
                <div class="vx-col xs:w-full md:w-1/2">
                    <vs-input label="Job Title" name="job_title" v-model="job_title" class="w-full mt-5"
                              v-validate="'max:255'"/>
                    <span class="text-danger text-sm"
                          v-show="errors.has('job_title')">{{ errors.first("job_title") }}</span>
                </div>

                <div class="vx-col xs:w-full md:w-1/2">
                    <vs-input label="Company" name="company" v-model="company" class="w-full mt-5"
                              v-validate="'max:255'"/>
                    <span class="text-danger text-sm"
                          v-show="errors.has('company')">{{ errors.first("company") }}</span>
                </div>
            </div>

            <vs-input label="Website" name="website" v-model="website" class="w-full mt-5"
                      v-validate="'url:require_protocol|max:255'"/>
            <span class="text-danger text-sm" v-show="errors.has('website')">{{ errors.first("website") }}</span>

            <div class="vx-row">
                <div class="vx-col xs:w-full md:w-1/2">
                    <vs-input label="Vat Number" name="vat_number" v-model="vat_number" class="w-full mt-5"
                              v-validate="'alpha_dash|max:255'"/>
                    <span class="text-danger text-sm"
                          v-show="errors.has('vat_number')">{{ errors.first("vat_number") }}</span>
                </div>

                <div class="vx-col xs:w-full md:w-1/2">
                    <vs-input label="Telephone Number" name="telephone_number" v-model="telephone_number"
                              class="w-full mt-5" v-validate="'max:255'"/>
                    <span class="text-danger text-sm" v-show="errors.has('telephone_number')">{{ errors.first("telephone_number") }}</span>
                </div>
            </div>

            <vs-input label="Address" name="address" v-model="address" class="w-full mt-5" v-validate="'max:255'"/>
            <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first("address") }}</span>

            <div class="vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary">
                <label for="country" class="vs-input--label">Country</label>
                <country-select label="Country" name="country" v-model="country"
                                class="w-full vs-inputx vs-input--input normal" :country="country" countryName/>
                <span class="text-danger text-sm" v-show="errors.has('country')">{{ errors.first("country") }}</span>
            </div>

            <!-- Old notification message -->
            <!-- <div v-if="showFormProfileAlert" class="flex flex-wrap justify-between my-5">
                <vs-alert v-if="formProfileStatus" title="Success" active="true" color="success"> Profile Updated </vs-alert>
                <vs-alert v-else title="Error" active="true" color="danger">
                    {{ formProfileErrorMsg }}
                </vs-alert>
            </div> -->

            <div class="vx-row">
                <div class="vx-col w-full">
                    <vs-button class="mt-8 mb-8 float-right" @click.prevent="updateProfile">Update</vs-button>
                </div>
            </div>
        </vx-card>
    </form>
</template>

<script>
    import {Validator} from "vee-validate";

    const custom_err_message = {
        custom: {
            name: {
                required: "This field is required",
                alpha_spaces: "Alphabetic characters and spaces are only allowed",
                max: "Maximum of 255 characters are allowed",
            },
            email: {
                required: "This field is required",
                email: "Invalid E-mail format",
                max: "Maximum of 255 characters are allowed",
            },
            job_title: {
                max: "Maximum of 255 characters are allowed",
            },
            company: {
                max: "Maximum of 255 characters are allowed",
            },
            website: {
                url: "Invalid URL format",
                max: "Maximum of 255 characters are allowed",
            },
            vat_number: {
                max: "Maximum of 255 characters are allowed",
            },
            telephone_number: {
                max: "Maximum of 255 characters are allowed",
            },
            address: {
                max: "Maximum of 255 characters are allowed",
            },
        },
    };

    // register custom messages
    Validator.localize("en", custom_err_message);

    export default {
        data() {
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
                messageTitle: "",
            };
        },
        mounted() {
            this.getUserData();
        },
        computed: {
            activeUserInfo() {
                return this.$store.getters["getUserInfo"];
            },
        },
        methods: {
            async getUserData() {
                this.$vs.loading();

                let $this = this.$data;

                let user = await this.$store.dispatch("fetchUserInfo");

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
                this.$vs.loading.close();
            },

            updateProfile() {
                var self = this.$data;

                // RESET FORM ALERT
                self.showFormProfileAlert = false;
                self.formProfileStatus = false;
                self.formProfileErrorMsg = "";

                this.$validator.validateAll().then(async (result) => {
                    if (result) {
                        let params = {
                            name: self.name,
                            email: self.email,
                            job_title: self.job_title,
                            company: self.company,
                            website: self.website,
                            vat_number: self.vat_number,
                            telephone_number: self.telephone_number,
                            address: self.address,
                            country: self.country,
                        };
                        this.$vs.loading();

                        await this.$store.dispatch("updateUserProfile", params).then((res) => {
                            this.$vs.loading.close();
                        });
                    }
                });
            },
        },
    };
</script>
