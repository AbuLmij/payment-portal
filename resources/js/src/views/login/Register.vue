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
									<h4 class="mb-4">Sign up</h4>
									<p>Register to create an account.</p>
								</div>

								<form>
									<vs-input label="Full Name" name="name" v-model="name" class="w-full mt-10" v-validate="'required|alpha_spaces|max:255'" />
									<span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span>

									<vs-input label="Email Address" name="email" v-model="email" class="w-full mt-10" v-validate="'required|email|max:255'" />
									<span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>

									<vs-input
										label="Password"
										type="password"
										ref="password"
										name="password"
										v-model="password"
										class="w-full mt-6"
										v-validate="'required|min:6|max:30'"
									/>
									<span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first("password") }}</span>

									<vs-input
										label="Confirm Password"
										type="password"
										name="confirmPassword"
										v-model="confirmPassword"
										class="w-full mt-6"
										v-validate="'required|confirmed:password'"
									/>
									<span class="text-danger text-sm" v-show="errors.has('confirmPassword')">{{ errors.first("confirmPassword") }}</span>

									<div class="flex flex-wrap justify-between my-5">
										<vs-checkbox v-model="termsAgreement" name="termsAgreement" v-validate="'required'" class="mb-3 ml-0">
											I accept the Terms and Conditions
										</vs-checkbox>
										<span class="text-danger text-sm w-full" v-show="termsAgreementError">Please accept Terms and Conditions</span>
									</div>

									<!-- <div v-if="formError" class="flex flex-wrap justify-between my-5">
										<vs-alert title="Error" active="true" color="danger">
											{{ formErrorMsg }}
										</vs-alert>
									</div> -->

									<!-- <div v-if="registrationSuccess" class="flex flex-wrap justify-between my-5">
										<vs-alert title="Success" active="true" color="success">
											{{ registrationSuccessMsg }}
										</vs-alert>
									</div> -->

									<vs-button class="w-full mt-8 mb-8" @click.prevent="submitForm">Sign Up</vs-button>

									<div class="login-register-footer-block mt-12">
										Already have an account? <router-link class="login-register-link" to="/login">Log In</router-link>
									</div>
								</form>
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
		name: {
			required: "Fullname is required",
			alpha_spaces: "Alphabetic characters and spaces are only allowed",
			max: "Maximum of 255 characters are allowed",
		},
		email: {
			required: "Email Address is required",
			email: "Invalid E-mail format",
			max: "Maximum of 255 characters are allowed",
		},
		password: {
			required: "Password is required",
			min: "At least 6 characters are required",
			max: "Maximum of 30 characters are allowed",
		},
		confirmPassword: {
			confirmed: "Passwords don't match",
			required: "Confirm your new password",
			min: "At least 6 characters are required",
			max: "Maximum of 30 characters are allowed",
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
			password: "",
			confirmPassword: "",
			termsAgreement: false,
			termsAgreementError: false,
			formError: false,
			formErrorMsg: "",
			registrationSuccess: false,
			registrationSuccessMsg: "",
		};
	},
	methods: {
		submitForm() {
			var self = this.$data;
			self.termsAgreementError = false;

			// RESET FORM ALERT
			// self.formError = false;
			// self.formErrorMsg = "";
			// self.registrationSuccess = false;
			// self.registrationSuccessMsg = "";

			this.$validator.validateAll().then((result) => {
				if (self.termsAgreement) {
					if (result) {
						this.$vs.loading();
						// Valid
						this.$http
							.post("/auth/register", {
								name: self.name,
								email: self.email,
								password: self.password,
								password_confirmation: self.confirmPassword,
							})
							.then(
								(response) => {
									this.$vs.loading.close();

									// self.registrationSuccess = true;
									// self.registrationSuccessMsg = response.data.message;

									let success = {
										title: "Verify your account to proceed",
										description: "A verification link was sent to your email",
										color: "success",
										time: 5500,
									};
									this.$store.commit("MESSAGE_NOTIFICATION", success);

									this.$router.push({ name: "Login" });``
								},
								(error) => {
									this.$vs.loading.close();
									let mssgDescription = "";

									// self.formError = true;
									if (error.response.data.message !== undefined) {
										mssgDescription = error.response.data.message + " ";
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
										time: 5000,
									};
									this.$store.commit("MESSAGE_NOTIFICATION", fail);
								}
							);
					}
				} else {
					this.termsAgreementError = true;
				}
			});
		},
	},
};
</script>

<style lang="scss">
</style>
