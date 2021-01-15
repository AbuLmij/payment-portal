<template>
	<div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
		<div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
			<vx-card fixedHeight class="login-register-form-wrapper">
				<div slot="no-body" class="full-page-bg-color">
					<vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12" class="bg-white">
						<div class="vx-col hidden lg:block lg:w-1/2">
							<img src="@assets/images/pages/login.png" alt="login" class="w-full" />
						</div>

						<div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
							<div class="p-8 h-full">
								<div class="vx-card__title mb-4">
									<h4 class="mb-4">Forgot Password</h4>
									<p>Please enter your email address, instructions for resetting password will be sent here.</p>
								</div>

								<div>
									<vs-input label="Email Address" name="email" v-model="email" class="w-full mt-10" v-validate="'required|email|max:255'" />
									<span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>

									<vs-button class="w-full mt-8 mb-8" @click.prevent="submitForm">Reset Password</vs-button>

									<!-- <div v-if="formError" class="flex flex-wrap justify-between my-5">
										<vs-alert title="Error" active="true" color="danger">
											{{ formErrorMsg }}
										</vs-alert>
									</div> -->

									<!-- <div v-if="registrationSuccess" class="flex flex-wrap justify-between my-5">
										<vs-alert title="Error" active="true" color="success">
											{{ registrationSuccessMsg }}
										</vs-alert>
									</div> -->

									<div class="login-register-footer-block mt-12">
										Know your password? <router-link class="login-register-link" to="/login">Login</router-link>
									</div>
								</div>
							</div>
						</div>
					</vs-row>
				</div>
			</vx-card>
		</div>
	</div>
</template>

<script>
window.$cookies.remove("_DMt");

import { Validator } from "vee-validate";

const custom_err_message = {
	custom: {
		email: {
			required: "Email Address is required",
			email: "Please provide valid Email Address",
			max: "Maximum of 255 characters are allowed",
		},
	},
};

// register custom messages
Validator.localize("en", custom_err_message);

export default {
	data() {
		return {
			email: "",
			formError: false,
			formErrorMsg: "",
			registrationSuccess: false,
			registrationSuccessMsg: "",
		};
	},
	methods: {
		submitForm() {
			var self = this.$data;

			// RESET FORM ALERT
			self.formError = false;
			self.formErrorMsg = "";
			self.registrationSuccess = false;
			self.registrationSuccessMsg = "";

			this.$validator.validateAll().then((result) => {
				if (result) {
					this.$vs.loading();

					// Valid
					this.$http
						.post("/auth/resetpassword", {
							email: self.email,
						})
						.then(
							(response) => {
								this.$vs.loading.close();

								// self.registrationSuccess = true;
								// self.registrationSuccessMsg = response.data.message;

								let success = {
									title: "Reset password link sent",
									description: "Please check your email to reset your password.",
									color: "success",
								};
								this.$store.commit("MESSAGE_NOTIFICATION", success);
							},
							(error) => {
								this.$vs.loading.close();
								let mssgDescription = "";

								self.formError = true;
								if (error.response.data.message !== undefined) {
									mssgDescription = error.response.data.message + "<br>";
								}

								if (error.response.data.errors !== undefined) {
									for (var key in error.response.data.errors) {
										mssgDescription += error.response.data.errors[key] + "<br>";
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

<style lang="scss">
</style>
