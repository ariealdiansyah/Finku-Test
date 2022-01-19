import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import users from './users';
import login from './login';

const ls = new SecureLS({
  isCompression: false
});

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      users,
      login
    },
    plugins: [
      createPersistedState({
        key: 'app-test',
        reducer(state) {
          // Filter State
          const stateFilter = { ...state };
          //tambahkan store tetap akan dihapus jika di refresh
          const blackList = [];

          blackList.forEach((item) => {
            delete stateFilter[item];
          });
          return stateFilter;
        },
        storage: {
          getItem: (key) => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: (key) => ls.remove(key)
        }
      })
    ],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
