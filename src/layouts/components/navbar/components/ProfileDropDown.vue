<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.displayName">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img v-if="activeUserInfo.photoURL" key="onlineImg" :src="activeUserInfo.photoURL" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <!--vs-divider class="m-1" /-->

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
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
  data () {
    return {

    }
  },
  computed: {
    activeUserInfo () {
      const userinfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userinfo.photoURL === '') {
        return {photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', displayName: userinfo.displayName}
      }
      return userinfo 
    }
  },
  methods: {
    logout () {
      this.$vs.loading()
      this.$store.dispatch('destroyToken')
        .then(() => {
          this.$router.push({ name: 'login'})
          this.$vs.loading.close()
        })
        .catch(error => {
          this.$vs.loading.close()
          console.log(error.message)
        })
      // If JWT login
      /*if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken')
        this.$router.push('/login').catch(() => {})
      }*/
    }
  }
}
</script>
