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
