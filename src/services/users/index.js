import { api } from 'boot/axios'
import { AdapterAllUsers } from './adapter';

export const getAllUser = async () => {
  let data;
  try {
    await api.get(`https://apicore.dev.finku.id/api/v2/users/fetch-all-users`).then(function (response) {
      data = response.data
    }).catch(function (error) {
      console.log(error);
    })
    return AdapterAllUsers(data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const changeEmail = async (existData, newData) => {
  let data;
  try {
    await api.post(`https://apicore.dev.finku.id/api/v2/users/update-user-email`,
      { email: existData, newEmail: newData }).then(function (response) {
        data = response.data
        console.log('dapet data', data);
      }).catch(function (error) {
        console.log(error);
        throw error;
      })
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const changeMobileNumber = async (existData, newData) => {
  let data;
  try {
    await api.post(`https://apicore.dev.finku.id/api/v2/users/update-user-mobile-number`,
      { email: existData, newMobileNumber: newData }).then(function (response) {
        data = response.data
        console.log('dapet data', data);
      }).catch(function (error) {
        // handle error
        console.log(error);
        throw error;
      })
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const deleteUser = async (email, password) => {
  let data;
  try {
    await api.post(`https://apicore.dev.finku.id/api/v2/users/remove-user`,
      { username: email, password: password }).then(function (response) {
        data = response.data
      }).catch(function (error) {
        // handle error
        console.log(error);
        throw error;
      })
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
