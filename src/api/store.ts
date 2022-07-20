import {customAxios} from './customAxios';

//사장 점포관리탭 (storeInfo)

export const getStoreInfo = async () => {
  const response = await customAxios().get('/api/v1/stores/me');
  console.log('getStoreInfo r.data.result', response.data.result);
  return response.data.result; //스웨거에서의 result
};

export const putStoresMe = async (
  addressDetail: string,
  addressDong: string,
  addressStreet: string,
  intro: string,
  representativeMenuName: string,
  storeName: string,
  storeTypeId: number,
  tableNum: number,
  x: number,
  y: number,
) => {
  const response = await customAxios().put('/api/v1/stores/me', null, {
    params: {
      addressDetail: addressDetail,
      addressDong: addressDong,
      addressStreet: addressStreet,
      intro: intro,
      representativeMenuName: representativeMenuName,
      storeName: storeName,
      storeTypeId: storeTypeId,
      tableNum: tableNum,
      x: x,
      y: y,
    },
  });
  console.log('putStoresMe r.data', response.data);
  return response.data; //스웨거에서의 result
};

//미션관리

//미션 노출 수
export const getMissionManageCount = async () => {
  const response = await customAxios().get('/api/v1/missions/owners/mission-manage/count');
  return response.data.result.count;
};
//미션관리 목록
export const getMissionManage = async () => {
  const response = await customAxios().get('/api/v1/missions/owners/mission-manage');
  return response.data.result;
};
// 미션 배포 중지
export const patchMissionStop = async (missionGroupId: number) => {
  // console.log(missionGroupId, '번번');
  const response = await customAxios().patch(
    `/api/v1/missions/owners/mission-stop/${missionGroupId}`,
  );
  console.log('배포 중지', response.data.message);
  return response.data.message;
};
// 미션 배포 활성화(재배포)
export const patchMissionActive = async (missionGroupId: number) => {
  // console.log(missionGroupId, '번번');
  const response = await customAxios().patch(
    `/api/v1/missions/owners/mission-active/${missionGroupId}`,
  );
  console.log('재배포', response.data.message);
  return response.data.message;
};
