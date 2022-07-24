import {OperationTime} from '../data';
import {customAxios} from './customAxios';

//사장 가게id 확인용!!!
export const getStoreId = async () => {
  try {
    const response = await customAxios().get('/api/v1/stores/me/id');
    return response.data.result;
  } catch (err) {
    console.log('getStoreId err', err);
  }
};

//사장 점포관리탭 (storeInfo)

export const getStoreInfo = async () => {
  const response = await customAxios().get('/api/v1/stores/me');
  console.log('getStoreInfo r.data.result', response.data.result);
  return response.data.result; //스웨거에서의 result
};

export const putStoresMe = async (storeData: any) => {
  const response = await customAxios().put('/api/v1/stores/me', storeData);
  console.log('putStoresMe r.data', response.data);
  return response.data; //스웨거에서의 result
};

export const patchDeleteStoreImage = async (storeImageId: any) => {
  const response = await customAxios().patch(`/api/v1/stores/store-images/${storeImageId}`);
  console.log('가게 사진삭제 완료', response.data);
  return response.data; //스웨거에서의 result
};

export const patchDeleteMenuImage = async (menuImageId: any) => {
  const response = await customAxios().patch(
    `/api/v1/stores/representative-menu-images/${menuImageId}`,
  );
  console.log('메뉴 사진삭제 완료', response.data);
  return response.data; //스웨거에서의 result
};

export const putEditTime = async (operationTime: OperationTime, operationTimeId: any) => {
  const response = await customAxios().put(
    `/api/v1/stores/operation-time/${operationTimeId}`,
    operationTime,
  );
  console.log('putStoresMe r.data', response.data);
  return response.data;
};

export const getStoreImage = async () => {
  const response = await customAxios().patch('/api/v1/stores/me/menu-images');
  console.log('메뉴 사진삭제 완료', response.data);
  return response.data; //스웨거에서의 result
};

export const getMenuImage = async () => {
  const response = await customAxios().patch('/api/v1/stores/store-images');
  console.log('메뉴 사진삭제 완료', response.data);
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
//미션그룹 상세정보
export const getMissionManageDetail = async (missionGroupId: number) => {
  const response = await customAxios().get(
    `/api/v1/missions/owners/mission-manage/${missionGroupId}`,
  );
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
