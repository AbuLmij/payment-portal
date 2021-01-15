<template>
	<div id="domain-add">
        <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
			<div class="vx-col sm:w-full md:w-2/3 lg:w-2/4">
                <form>
                    <vx-card title="Details" class="mt-base">
						<v-select
			              label="Type"
			              name="usertype"
						  v-model="usertype"
						  v-validate="'required'"
						  :options="['regular','admin']"
						/>
			            <span class="text-danger text-sm" v-show="errors.has('usertype')">{{ errors.first('usertype') }}</span>

						<vs-input
			                label="Full Name"
			                name="name"
			                v-model="name"
			                class="w-full mt-5"
			                v-validate="'required|alpha_spaces|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

			            <vs-input
			                label="Email Address"
			                name="email"
			                v-model="email"
			                class="w-full mt-5"
			                v-validate="'required|email|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

			            <div class="vx-row">
			                <div class="vx-col xs:w-full md:w-1/2">
			                    <vs-input
			                        label="Job Title"
			                        name="job_title"
			                        v-model="job_title"
			                        class="w-full mt-5"
			                        v-validate="'max:255'"
			                    />
			                    <span class="text-danger text-sm" v-show="errors.has('job_title')">{{ errors.first('job_title') }}</span>
			                </div>

			                <div class="vx-col xs:w-full md:w-1/2">
			                    <vs-input
			                        label="Company"
			                        name="company"
			                        v-model="company"
			                        class="w-full mt-5"
			                        v-validate="'max:255'"
			                    />
			                    <span class="text-danger text-sm" v-show="errors.has('company')">{{ errors.first('company') }}</span>
			                </div>
			            </div>

			            <vs-input
			                label="Website"
			                name="website"
			                v-model="website"
			                class="w-full mt-5"
			                v-validate="'url:require_protocol|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('website')">{{ errors.first('website') }}</span>

			            <div class="vx-row">
			                <div class="vx-col xs:w-full md:w-1/2">
			                    <vs-input
			                        label="Vat Number"
			                        name="vat_number"
			                        v-model="vat_number"
			                        class="w-full mt-5"
			                        v-validate="'alpha_dash|max:255'"
			                    />
			                    <span class="text-danger text-sm" v-show="errors.has('vat_number')">{{ errors.first('vat_number') }}</span>
			                </div>

			                <div class="vx-col xs:w-full md:w-1/2">
			                    <vs-input
			                        label="Telephone Number"
			                        name="telephone_number"
			                        v-model="telephone_number"
			                        class="w-full mt-5"
			                        v-validate="'max:255'"
			                    />
			                    <span class="text-danger text-sm" v-show="errors.has('telephone_number')">{{ errors.first('telephone_number') }}</span>
			                </div>
			            </div>

			            <vs-input
			                label="Address"
			                name="address"
			                v-model="address"
			                class="w-full mt-5"
			                v-validate="'max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>

			            <div class="vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary">
			                <label class="vs-input--label">Country</label>
			                <country-select
			                    label="Country"
			                    name="country"
			                    v-model="country"
								:country="country"
			                    class="w-full vs-inputx vs-input--input normal"
			                    countryName
			                />
			                <span class="text-danger text-sm" v-show="errors.has('country')">{{ errors.first('country') }}</span>
			            </div>

						<vs-input
			                label="Password"
							ref="password"
							type="password"
			                name="password"
			                v-model="password"
			                class="w-full mt-10"
			                v-validate="'min:8'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

			            <vs-input
			                label="Confirm Password"
			                type="password"
			                name="confirmPassword"
			                v-model="confirmPassword"
			                class="w-full mt-5"
			                v-validate="'confirmed:password'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</span>

                        <div v-if="showFormAlert" class="flex flex-wrap justify-between my-5">
                            <vs-alert v-if="formStatus" title="Success" active="true" color="success">
                              User Updated
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
import vSelect from 'vue-select';

export default{
  components: {
    'v-select': vSelect,
  },
  data() {
    return {
      id: this.$route.params.id,
      usertype: "regular",
      name: "",
      email: "",
      job_title: "",
      company: "",
      website: "",
	  vat_number: "",
	  telephone_number: "",
	  address: "",
	  country: "",
      password: "",
      confirmPassword: "",
      showFormAlert: false,
	  formStatus: false,
      formErrorMsg: '',
      showFormAlert: false,
	  formStatus: false,
      formErrorMsg: '',
    }
  },
  mounted: function () {
      this.getData();
  },
  methods: {
  	getData() {
  		this.$vs.loading();
  		var self = this.$data

  		// Valid
  		this.$http.get('/admin/users/' + self.id)
  		.then((response) => {
            self.usertype = response.data.type
            self.name = response.data.name
            self.email = response.data.email
            self.job_title = response.data.job_title
            self.company = response.data.company
            self.website = response.data.website
            self.vat_number = response.data.vat_number
            self.telephone_number = response.data.telephone_number
            self.address = response.data.address
            self.country = response.data.country
            self.password = response.data.password

  			this.$vs.loading.close();
  		}, (error) => {
            self.showFormAlert = true
            self.formStatus = false
            if(error.response.data.message !== undefined){
              self.formErrorMsg = error.response.data.message
            }

            if(error.response.data.errors !== undefined){
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
				this.$http.patch('/admin/users/' + self.id, {
					type: self.usertype,
					name: self.name,
	  	  			email: self.email,
	  	  			job_title: self.job_title,
	  	  			company: self.company,
	  	  			website: self.website,
	  	  			vat_number: self.vat_number,
	  	  			telephone_number: self.telephone_number,
	  	  			address: self.address,
	  	  			country: self.country,
	  	  			password: self.password,
	  	  			password_confirmation: self.confirmPassword,
                })
				.then((response) => {
					this.$vs.loading.close();
					let success = {
						title: "User Updated",
						description: response.data.message,
						color: "success",
						time: 5500,
					};
					this.$store.commit("MESSAGE_NOTIFICATION", success);
					this.$router.push({name: 'Users'});
				}, (error) => {
					this.$vs.loading.close();

					self.showFormAlert = true
					self.formStatus = false
                    if(error.response.data.message !== undefined){
                      self.formErrorMsg = error.response.data.message + '<br>'
                    }

                    if(error.response.data.errors !== undefined){
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
