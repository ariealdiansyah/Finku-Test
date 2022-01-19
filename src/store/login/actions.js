import { isLoggedIn } from "src/services/login";

export const login = async ({ commit }, { username, password }) => {
  try {
    const res = await isLoggedIn(username, password);
    commit('isLoggedIn', res)
    return res;
  } catch (err) {
    console.error(err);
  }
}

export const logout = async ({ commit }) => {
  try {
    commit('logout')
    return;
  } catch (err) {
    console.error(err);
  }
}
