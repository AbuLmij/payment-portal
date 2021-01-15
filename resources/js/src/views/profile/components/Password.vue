<template>
	<form>
		<vx-card title="Password" class="mt-base">
			<vs-input label="Current Password" type="password" name="oldPassword" v-model="oldPassword" class="w-full mt-5" v-validate="'required'" />
			<span class="text-danger text-sm" v-show="errors.has('oldPassword')">{{ errors.first("oldPassword") }}</span>

			<vs-input label="New Password" type="password" name="newPassword" ref="newPassword" v-model="newPassword" class="w-full mt-5" v-validate="'required|min:6|max:30'" />
			<span class="text-danger text-sm" v-show="errors.has('newPassword')">{{ errors.first("newPassword") }}</span>

			<vs-input label="Confirm Password" type="password" name="confirmPassword" v-model="confirmPassword" class="w-full mt-5" v-validate="'required|confirmed:newPassword'" />
			<span class="text-danger text-sm" v-show="errors.has('confirmPassword')">{{ errors.first("confirmPassword") }}</span>

			<!-- Old message notifications -->
			<!-- <div v-if="showFormPassAlert" class="flex flex-wrap justify-between my-5">
				<vs-alert v-if="formPassStatus" title="Success" active="true" color="success"> Password Updated </vs-alert>
				<vs-alert v-else title="Error" active="true" color="danger">
					<span v-html="formPassErrorMsg"></span>
				</vs-alert>
			</div> -->

			<div class="vx-row">
				<div class="vx-col w-full">
					<vs-button class="mt-8 mb-8 float-right" @click="updatePassword">Update Password</vs-button>
				</div>
			</div>
		</vx-card>
	</form>
</template>

<script>
import { Validator } from "vee-validate";

const custom_err_message = {
	custom: {
		oldPassword: {
			required: "Old password is required",
		},
		newPassword: {
			required: "New password is required",
			min: "At least 6 characters are required",
			max: "Only 30 characters are allowed",
		},
		confirmPassword: {
			confirmed: "Please confirm your new password",
			required: "Confirm your new password"
		},
	},
};

// register custom messages
Validator.localize("en", custom_err_message);

export default {
	data() {
		return {
			id: "",
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
			showFormPassAlert: false,
			formPassStatus: false,
			formPassErrorMsg: "",
			messageColor: "primary",
			messageTitle: "",
		};
	},
	computed: {
		activeUserInfo() {
			return this.$store.getters["getUserInfo"];
		},
	},
	methods: {
		updatePassword() {
			// RESET FORM ALERT
			this.showFormPassAlert = false;
			this.formPassStatus = false;
			this.formPassErrorMsg = "";

			this.$validator.validateAll().then(async (result) => {
				if (result) {
					this.$vs.loading();

					let params = {
							old_password: this.oldPassword,
							password: this.newPassword,
							password_confirmation: this.confirmPassword,
					};

					await this.$store.dispatch("updateUserPassword", params).then((res) => {
						this.$vs.loading.close();
						this.oldPassword = this.newPassword = this.confirmPassword = null;
					});
				}
			});
		},
	},
};
</script>
