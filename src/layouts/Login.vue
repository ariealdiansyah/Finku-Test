<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="username" label="Username" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn label="Login" type="submit" color="primary" @click="onLogin" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('login', {
      uname: 'getUsername',
      pass: 'getPassword',
    }),
    username: {
      get() {
        return this.uname;
      },
      set(v) {
        this.$store.commit('login/setUsername', v);
      },
    },
    password: {
      get() {
        return this.pass;
      },
      set(v) {
        this.$store.commit('login/setPassword', v);
      },
    },
  },
  methods: {
    async onLogin() {
      try {
        const res = await this.$store.dispatch('login/login', {
          username: this.username,
          password: this.password,
        });
        if (res) {
          this.$router.push('./home');
        }

        return;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
