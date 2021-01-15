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
									<h4 class="mb-4">Welcome!</h4>
									<p>Go ahead and log in to your account.</p>
								</div>

								<div>
									<vs-input label="Email Address" name="email" v-model="email" class="w-full mt-10" v-validate="'required|email|max:255'" />
									<span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>

									<vs-input label="Password" type="password" name="password" v-model="password" class="w-full mt-6" v-validate="'required|min:6|max:30'" />
									<span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first("password") }}</span>

									<div class="flex flex-wrap justify-between my-5 mb-12">
										<vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
										<router-link class="login-register-link" to="/forgotpassword">Forgot Password?</router-link>
									</div>

									<vs-button class="w-full" @click.prevent="submitForm">Login</vs-button>

									<div v-if="resetLinkStatus.status" class="mt-10 my-5 text-center">
										<!-- <a href="#" @click.prevent="resendVerificationLink()" class="login-register-link">Resend Email Verification Link</a> -->
										<vs-button color="success" class="w-full" @click.prevent="resendVerificationLink()">Resend Verification</vs-button>
									</div>
									<!-- <div v-if="formError" class="flex flex-wrap justify-between my-5">
										<vs-alert title="Error" active="true" color="danger">
											{{ formErrorMsg }}
										</vs-alert>
									</div> -->

									<div class="login-register-footer-block mt-12">
										Don't have an account? <router-link class="login-register-link" to="/register">Sign Up</router-link>
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
			email: "Please provide valid email",
			max: "Maximum of 255 characters are allowed",
		},
		password: {
			required: "Password is required",
			min: "Password should atleast 6 characters",
			max: "Maximum of 30 characters are allowed",
		},
	},
};

// register custom messages
Validator.localize("en", custom_err_message);

export default {
	data() {
		return {
			email: "",
			password: "",
			checkbox_remember_me: false,
			formError: false,
			formErrorMsg: "",
		};
	},
	computed: {
		resetLinkStatus() {
			return this.$store.getters["getResendLinkStatus"];
		},
		userName() {
			return this.$store.getters["getUserName"];
		},
	},
	methods: {
		resendVerificationLink() {
			this.$vs.loading();

			if (this.resetLinkStatus.userEmail != null) {
				this.$store.dispatch("resendVerificationEmailLink", this.resetLinkStatus.userEmail).then((res) => {
					// hide loading gif
					this.$vs.loading.close();
					// update reset link state
					let resetLink = {
						verifyStatus: false,
						userEmail: null,
					};
					this.$store.commit("UPDATE_RESEND_LINK_STATUS", resetLink);
				});
			} else {
				let fail = {
					title: "Oops",
					description: "Something went wrong.",
					color: "danger",
					time: 4500,
				};
				this.$store.commit("MESSAGE_NOTIFICATION", fail);
			}
		},
		submitForm() {
			var self = this.$data;

			// RESET FORM ALERT
			self.formError = false;
			self.formErrorMsg = "";

			this.$validator.validateAll().then((result) => {
				if (result) {
					this.$vs.loading();
					// Valid
					this.$http
						.post("/auth/login", {
							email: self.email,
							password: self.password,
							remember_me: self.checkbox_remember_me,
						})
						.then(
							(response) => {
								let token_expire_datetime = new Date(response.expires_at).toUTCString();

								window.$cookies.set("_DMt", response.data.access_token, token_expire_datetime, null, null, null, "Lax");

								this.$store.dispatch("updateUserInfo", response.data.user);

								this.$router.push("/");
								this.$vs.loading.close();

								let success = {
									title: `Welcome ${this.userName}`,
									description: "You are now login.",
									color: "primary",
									time: 3500,
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
									time: 8500,
								};
								this.$store.commit("MESSAGE_NOTIFICATION", fail);

								// check if users is register but email not verified, display a resend link button
								if (error.response.data.unVerified) {
									let resendUserData = {
										verifyStatus: error.response.data.unVerified,
										userEmail: self.email,
									};
									this.$store.commit("UPDATE_RESEND_LINK_STATUS", resendUserData);
								}
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
