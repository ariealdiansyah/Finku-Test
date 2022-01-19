<template>
  <q-page class="flex flex-center">
    <template v-if="isLoggedIn">
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
    </template>
    <template v-else>
      <login />
    </template>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import Login from 'layouts/Login.vue';

export default {
  name: 'PageIndex',
  components: { Login },
  computed: {
    ...mapState('users', {
      isLoggedIn: 'isLoggedIn',
    }),
  },
};
</script>
