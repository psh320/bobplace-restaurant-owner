import {customAxios} from './customAxios';

//사장 미션 탭

//현재 진행중인 미션 조회
export const getMissionsProgress = async () => {
  const response = await customAxios().get('/api/v1/missions/owners/progress');
  return response.data;
};
export const gotMissionsSuccess = async () => {
  const response = await customAxios().get('/api/v1/missions/owners/success');
  return response.data;
};
