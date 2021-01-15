<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
	<div class="relative">
		<div class="vx-navbar-wrapper navbar-full p-0" v-if="activeUserInfo.type === 'admin'">
			<vs-navbar class="navbar-custom navbar-skelton" :class="navbarClasses" :style="navbarStyle" :color="navbarColor">
				<router-link tag="div" to="/" class="vx-logo cursor-pointer mx-auto ml-0 flex items-center">
					<vs-avatar class="pl-0 ml-0" text-color="primary" color="rgb(227, 234, 255)" icon-pack="feather" icon="icon-globe" />
					<span class="vx-logo-text text-primary display-3">PBN Marketplace</span>
				</router-link>

				<vs-button to="/admin/domains" class="px-2" color="dark" type="flat">
					<b>Domains</b>
				</vs-button>

				<vs-button to="/admin/promos" class="px-2" color="dark" type="flat">
					<b>Promos</b>
				</vs-button>

				<vs-button to="/admin/users" class="px-2" color="dark" type="flat">
					<b>Users</b>
				</vs-button>

				<vs-button to="/admin/settings" class="px-2" color="dark" type="flat">
					<b>Settings</b>
				</vs-button>

				<profile-drop-down />
			</vs-navbar>
		</div>
		<div class="vx-navbar-wrapper navbar-full p-0" v-else>
			<vs-navbar else class="navbar-custom navbar-skelton" :class="navbarClasses" :style="navbarStyle" :color="navbarColor">
				<router-link tag="div" to="/" class="vx-logo cursor-pointer mx-auto ml-0 flex items-center">
					<vs-avatar class="pl-0 ml-0" text-color="primary" color="rgb(227, 234, 255)" icon-pack="feather" icon="icon-globe" />
					<span class="vx-logo-text text-primary display-3">PBN Marketplace</span>
				</router-link>

				<vs-button to="/" class="px-2" color="dark" type="flat">
					<b>Domains</b>
				</vs-button>

				<vs-button to="/myorders" class="px-2" color="dark" type="flat">
					<b>My Orders</b>
				</vs-button>

				<profile-drop-down />

				<cart-drop-down />
			</vs-navbar>
		</div>
	</div>
</template>

<script>
import ProfileDropDown from "./components/ProfileDropDown.vue";
import CartDropDown from "./components/CartDropDown.vue";
import AdminDropDown from "./components/AdminDropDown.vue";

export default {
	name: "the-navbar-horizontal",
	props: {
		navbarType: {
			type: String,
			required: true,
		},
	},
	components: {
		ProfileDropDown,
		CartDropDown,
		AdminDropDown,
	},
	computed: {
		activeUserInfo() {
			return this.$store.state.AppActiveUser;
		},
		navbarColor() {
			let color = "#fff";
			if (this.navbarType === "sticky") color = "#f7f7f7";
			else if (this.navbarType === "static") {
				if (this.scrollY < 50) {
					color = "#f7f7f7";
				}
			}

			if (this.isThemedark === "dark") {
				if (color === "#fff") {
					color = "#10163a";
				} else {
					color = "#262c49";
				}
			}

			return color;
		},
		isThemedark() {
			return this.$store.state.theme;
		},
		navbarStyle() {
			return this.navbarType === "static" ? { transition: "all .25s ease-in-out" } : {};
		},
		navbarClasses() {
			return this.scrollY > 5 && this.navbarType === "static" ? null : "d-theme-dark-light-bg shadow-none";
		},
		scrollY() {
			return this.$store.state.scrollY;
		},
		verticalNavMenuWidth() {
			return this.$store.state.verticalNavMenuWidth;
		},
		windowWidth() {
			return this.$store.state.windowWidth;
		},
	},
};
</script>
