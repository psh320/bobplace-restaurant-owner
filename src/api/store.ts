import {customAxios} from './customAxios';

//사장 점포관리탭 (storeInfo)

//진범쓰 api만들어지면 이름이랑 다 맞춰서 바꾸기
export const getStoreInfo = async () => {
  const response = await customAxios().get('/api/v1/api명 먀 ? ? ? ?');
  return response.data.result; //스웨거에서의 result
};
