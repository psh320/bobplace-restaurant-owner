import {customAxios} from '../api';

//알림
export const getNotifications = async () => {
  const response = await customAxios().get(`/api/v1/push-notifications/me`);
  return response.data.result;
};
//알림 확인
export const patchNotificationsStatus = async (notiId: number) => {
  const response = await customAxios().patch(`/api/v1/push-notifications/me/${notiId}`);
  console.log('sdsd', response.data);
  return response.data.message;
};
