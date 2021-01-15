<template>
  <div class="the-navbar__user-meta flex items-center">
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <vs-button class="px-2" color="primary" type="filled" icon="settings_applications" icon-after>
          <b class="text-white">Admin</b>
        </vs-button>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <router-link tag="li" to="/admin/domains" class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <span class="ml-2">Domains</span>
          </router-link>

          <router-link tag="li" to="/admin/promos" class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <span class="ml-2">Promos</span>
          </router-link>

          <router-link tag="li" to="/admin/users" class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <span class="ml-2">Users</span>
          </router-link>

          <router-link tag="li" to="/admin/settings" class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <span class="ml-2">Settings</span>
          </router-link>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
  }
}
</script>
