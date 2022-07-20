import {customAxios} from './customAxios';

//사장 미션 탭

//현재 진행중인 미션 조회
export const getMissionsProgress = async () => {
  const response = await customAxios().get('/api/v1/missions/owners/progress');
  return response.data.result; //스웨거에서의 result
};
export const getMissionsSuccess = async () => {
  const response = await customAxios().get('/api/v1/missions/owners/success');
  return response.data.result;
};
//미션 노출 수
export const getMissionManageCount = async () => {
  const response = await customAxios().get('/api/v1/missions/owners/mission-manage/count');
  return response.data.result.count;
};
