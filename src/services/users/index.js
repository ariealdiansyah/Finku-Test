import { api } from 'boot/axios'
import { AdapterAllUsers } from './adapter';

export const getAllUser = async () => {
  console.log('masuk service get user');
  let data;
  try {
    await api.get(`https://apicore.dev.finku.id/api/v2/users/fetch-all-users`).then(function (response) {
      data = response.data
      console.log('dapet data', data);
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
    console.log('adapter', AdapterAllUsers(data.data));
    return AdapterAllUsers(data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
