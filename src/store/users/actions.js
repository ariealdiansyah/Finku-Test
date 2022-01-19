import { getAllUser } from "src/services/users";

export const getUser = async ({ commit }) => {
  try {
    console.log('mask act get user');
    const res = await getAllUser();
    console.log(res);
    commit('setData', res)
    return;
  } catch (err) {

  }
}
