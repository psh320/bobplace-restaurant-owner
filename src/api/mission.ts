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

//포인트 적립 취소
export const postCancelPoint = async (missionId: number, reason: string) => {
  const response = await customAxios().put(`/api/v1/missions/owner/${missionId}`, null, {
    params: {
      reason: reason,
    },
  });
  console.log('postCancelPoint r.data', response.data);
  return response.data; //스웨거에서의 result
};
