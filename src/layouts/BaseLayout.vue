<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseLayout',
  computed: {
    ...mapState('login', {
      isLoggedIn: 'isLoggedIn',
    }),
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.replace('./login');
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next();
  // },
};
</script>
