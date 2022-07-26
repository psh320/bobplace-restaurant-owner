import {customAxios} from './customAxios';

export const getUserInfo = async () => {
  const {data} = await customAxios().get('/api/v1/users/me');
  console.log('유저인포-------------', data);
  return data.result;
};
