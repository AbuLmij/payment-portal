<template>
	<div class="the-navbar__user-meta flex items-center">
		<vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
			<div class="con-img ml-3">
				<vs-button class="px-2" color="primary" type="flat" icon="account_circle" icon-after>
					<b class="text-primary"> {{ userName != null ? userName : "Account" }} </b>
				</vs-button>
			</div>

			<vs-dropdown-menu class="vx-navbar-dropdown">
				<ul style="min-width: 9rem">
					<router-link tag="li" to="/profile" class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
						<feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
						<span class="ml-2">Profile</span>
					</router-link>

					<li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logoutConfirm()">
						<feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
						<span class="ml-2">Logout</span>
					</li>
				</ul>
			</vs-dropdown-menu>
		</vs-dropdown>
	</div>
</template>

<script>
export default {
	methods: {
		logoutConfirm() {
			this.$vs.dialog({
				type: "confirm",
				color: "primary",
				title: "Confirm Logout",
				text: "Are you sure you want to logout?",
				acceptText: "Log out",
				accept: this.logout,
			});
		},

		async logout() {
			this.$vs.loading();

			await this.$store.dispatch("logoutUser").then(
				(res) => {
					this.$vs.loading.close();
				},
				(error) => {
					this.$vs.loading.close();
				}
			);
		},
	},
	computed: {
		userName() {
			return this.$store.getters["getUserName"];
		},
	},
};
</script>
<style lang="scss">
.vs-icon {
	font-size: 1.5rem;
}
</style>
