<template>
	<div id="profile-page">
		<div class="vx-row">
			<!-- PROFILE -->
			<div class="vx-col sm:w-full md:w-1/2">
				<vc-form-profile />
			</div>

			<!-- PASSWORD -->
			<div class="vx-col sm:w-full md:w-1/2">
				<vc-form-password />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Profile",
	components: {
		vcFormProfile: () => import("@/views/profile/components/Profile"),
		vcFormPassword: () => import("@/views/profile/components/Password"),
	},
	data: () => ({}),
	computed: {},
	mounted: function () {},
	methods: {},
};
</script>
