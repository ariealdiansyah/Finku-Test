import { getAllUser, changeEmail, changeMobileNumber, deleteUser } from "src/services/users";
import { Notify } from 'quasar';

export const getUser = async ({ commit }) => {
  try {
    const res = await getAllUser();
    commit('setData', res)
    return;
  } catch (err) {

  }
}

export const changeMail = async ({ commit }, { existData, newData }) => {
  try {
    const res = await changeEmail(existData, newData);
    console.log(res);
    return;
  } catch (error) {
    console.error(error);
    Notify.create({
      color: 'negative',
      icon: 'report_problem',
      message: error.message,
      position: 'top',
    });
    throw error;
  }
}

export const changeMobile = async ({ commit }, { existData, newData }) => {
  try {
    const res = await changeMobileNumber(existData, newData);
    console.log(res);
    return;
  } catch (error) {
    console.error(error);
    Notify.create({
      color: 'negative',
      icon: 'report_problem',
      message: error.message,
      position: 'top',
    });
    throw error;
  }
}

export const removUser = async ({ commit }, { email, password }) => {
  try {
    const res = await deleteUser(email, password);
    console.log(res);
    return;
  } catch (error) {
    Notify.create({
      color: 'negative',
      icon: 'report_problem',
      message: error.message,
      position: 'top',
    });
    throw error;
  }
}
