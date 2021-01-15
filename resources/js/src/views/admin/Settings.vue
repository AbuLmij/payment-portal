<template>
	<div id="domain-add">
        <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
			<div class="vx-col sm:w-full md:w-2/3 lg:w-2/4">
                <form>
                    <vx-card title="" class="mt-base">
						<h4 class="mb-4">Metrics Checking Setting</h4>

						<div class="vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary">
							<label for="domain_attr_update_freq" class="vs-input--label">Allow Metric Checking?</label>
							<v-select
				              label="API Updated Frequency"
				              name="allow_check_metrics"
							  v-model="allow_check_metrics"
							  v-validate="'required'"
							  :options="['yes','no']"
							/>
				            <span class="text-danger text-sm" v-show="errors.has('allow_check_metrics')">{{ errors.first('allow_check_metrics') }}</span>
						</div>

						<div class="vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary">
							<label for="metrics_checking_frequency" class="vs-input--label">Frequency Of Checking</label>
							<v-select
				              label="API Updated Frequency"
				              name="metrics_checking_frequency"
							  v-model="metrics_checking_frequency"
							  :options="['weekly','bi-monthly','monthly']"
							  :disabled="allow_check_metrics == 'no'"
							/>
						</div>

                        <div class="vx-row">
                            <div class="vx-col w-full">
                                <vs-button class="mt-8 mb-8 float-right" @click.prevent="updateMetricsSetting">Update</vs-button>
                            </div>
                        </div>
                    </vx-card>
                </form>
			</div>
			<div class="vx-col sm:w-full md:w-2/3 lg:w-2/4">
                <form>
                    <vx-card title="" class="mt-base">
						<h4 class="mb-4">PayPal</h4>

						<div class="vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary">
							<label for="pp_mode" class="vs-input--label">Mode</label>
							<v-select
				              label="Paypal Mode"
				              name="pp_mode"
							  v-model="pp_mode"
							  v-validate="'required'"
							  :options="['sandbox','production']"
							/>
				            <span class="text-danger text-sm" v-show="errors.has('pp_mode')">{{ errors.first('pp_mode') }}</span>
						</div>

						<vs-input
			                label="Sandbox API Token"
			                name="pp_sandbox_token"
			                v-model="pp_sandbox_token"
			                class="w-full mt-5"
			                v-validate="'required|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('pp_sandbox_token')">{{ errors.first('pp_sandbox_token') }}</span>

						<vs-input
			                label="Production API Token"
			                name="pp_production_token"
			                v-model="pp_production_token"
			                class="w-full mt-5"
			                v-validate="'required|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('pp_production_token')">{{ errors.first('pp_production_token') }}</span>


						<h4 class="mt-10 mb-4">Credit Card</h4>

						<vs-input
			                label="API Secret Key"
			                name="cc_api_secret_key"
			                v-model="cc_api_secret_key"
			                class="w-full mt-5"
			                v-validate="'required|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('cc_api_secret_key')">{{ errors.first('cc_api_secret_key') }}</span>

						<vs-input
			                label="API Key"
			                name="cc_api_key"
			                v-model="cc_api_key"
			                class="w-full mt-5"
			                v-validate="'required|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('cc_api_key')">{{ errors.first('cc_api_key') }}</span>

						<vs-input
			                label="API URL"
			                name="cc_api_url"
			                v-model="cc_api_url"
			                class="w-full mt-5"
			                v-validate="'required|max:255'"
			            />
			            <span class="text-danger text-sm" v-show="errors.has('cc_api_url')">{{ errors.first('cc_api_url') }}</span>

						<div class="vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary">
							<label for="domain_attr_update_freq" class="vs-input--label">API Updated Frequency</label>
							<v-select
				              label="API Updated Frequency"
				              name="domain_attr_update_freq"
							  v-model="domain_attr_update_freq"
							  v-validate="'required'"
							  :options="['weekly','bi-monthly','monthly']"
							/>
				            <span class="text-danger text-sm" v-show="errors.has('domain_attr_update_freq')">{{ errors.first('domain_attr_update_freq') }}</span>
						</div>

                        <div v-if="showFormAlert" class="flex flex-wrap justify-between my-5">
                            <vs-alert v-if="formStatus" title="Success" active="true" color="success">
                              Settings Updated
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
import vSelect from 'vue-select'
import { Validator } from 'vee-validate';

const custom_err_message = {
  custom: {
    pp_mode: {
      required: 'This field is required',
    },
    pp_sandbox_token: {
      required: 'This field is required',
      max: "Maximum of 255 characters are allowed",
    },
    pp_production_token: {
      required: 'This field is required',
      max: "Maximum of 255 characters are allowed",
    },
	cc_api_secret_key: {
      required: 'This field is required',
    },
	cc_api_key: {
      required: 'This field is required',
    },
	cc_api_url: {
      required: 'This field is required',
    },
	domain_attr_update_freq: {
      required: 'This field is required',
    },
  }
};


// register custom messages
Validator.localize('en', custom_err_message);

export default{
  components: {
    'v-select': vSelect,
  },
  data() {
    return {
      pp_mode: "",
      pp_sandbox_token: "",
      pp_production_token: "",
      cc_api_secret_key: "",
      cc_api_key: "",
      cc_api_url: "",
	  domain_attr_update_freq: "weekly",
      showFormAlert: false,
	  formStatus: false,
	  formErrorMsg: '',
	  metrics_checking_frequency: '',
	  allow_check_metrics: 'no'
    }
  },
  mounted: function () {
	  this.getData();
	  this.getMetricsData();
  },
  computed: {
	activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
  },
  watch: {
	allow_check_metrics: function (val) {
       if (val == 'no') {
		   this.metrics_checking_frequency = '';
	   }
    },
  },
  methods: {
  	getData() {
  		this.$vs.loading();
  		var self = this.$data

  		// Valid
  		this.$http.get('/admin/settings/')
  		.then((response) => {
            //console.log(response.data);

            self.pp_mode = response.data.pp_mode
            self.pp_sandbox_token = response.data.pp_sandbox_token
            self.pp_production_token = response.data.pp_production_token

            self.cc_api_secret_key = response.data.cc_api_secret_key
            self.cc_api_key = response.data.cc_api_key
            self.cc_api_url = response.data.cc_api_url

            self.domain_attr_update_freq = response.data.domain_attr_update_freq

  			this.$vs.loading.close()
  			//console.log(self)
  		}, (error) => {
            //console.log(error);

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
	getMetricsData() {
  		this.$vs.loading();
  		var self = this.$data

  		// Valid
  		this.$http.post('/admin/settings/get_metrics', {
			user_id: this.activeUserInfo.id
		})
  		.then((response) => {
			const metrics = response.data;
			this.$vs.loading.close()
			self.allow_check_metrics = metrics.allow_check_metrics;
			self.metrics_checking_frequency = metrics.metrics_checking_frequency;
  			//console.log(self)
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
				this.$http.put('/admin/settings/', {
					pp_mode: self.pp_mode,
					pp_sandbox_token: self.pp_sandbox_token,
					pp_production_token: self.pp_production_token,
					cc_api_secret_key: self.cc_api_secret_key,
					cc_api_key: self.cc_api_key,
					cc_api_url: self.cc_api_url,
					domain_attr_update_freq: self.domain_attr_update_freq,
                })
				.then((response) => {
					this.$vs.loading.close()
					//console.log(response);
					self.showFormAlert = true
					self.formStatus = true

					let PpConfig = {
						pp_mode: self.pp_mode,
						pp_sandbox_token: self.pp_sandbox_token,
						pp_production_token: self.pp_production_token,
					}

					this.$store.dispatch('updatePpConfig',PpConfig)
				}, (error) => {
					this.$vs.loading.close()
					//console.log(error);

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
	updateMetricsSetting: function() {
		var self = this.$data
		this.$validator.validateAll().then(result => {
			if (result) {
				this.$http.put('/admin/settings/metrics', {
					allow_check_metrics: self.allow_check_metrics,
					metrics_checking_frequency : self.metrics_checking_frequency,
					user_id: this.activeUserInfo.id
                })
				.then((response) => {
					this.$vs.loading.close()
					self.showFormAlert = true
					self.formStatus = true

					self.metrics_checking_frequency = response.data.data.metrics_checking_frequency;
					self.allow_check_metrics = response.data.data.allow_check_metrics;

					let success = {
						title: "Success",
						description: "Metric setting has been successfully updated.",
						color: "success",
					};
					this.$store.commit("MESSAGE_NOTIFICATION", success);

				}, (error) => {
					this.$vs.loading.close()

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
				})
			}
		})
	}
	
  },
}
</script>
