import {ImageInterface} from './ImageInterface';

export type OperationTime = {
  breakEndTime: string;
  breakStartTime: string;
  dayOfWeek: string;
  endTime: string;
  hasBreak: boolean;
  hasOperationiTime: boolean;
  operationTimeId?: number;
  startTime: string;
};

//가입 post 할때 쓰는 타입 ///api/v1/stores 가게 정보 등록 //요거로 통일!!..?!
export type RegisterStoreInterface = {
  addressDetail: string;
  addressDong: string;
  addressStreet: string;
  intro: string;
  operationTimeVO: OperationTime[];
  representativeMenuName: string;
  storeName: string;
  storeTypeId: number;
  tableNum: number;
  x: number;
  y: number;
};
export type RegisterStoreGetInterface = {
  addressDetail: string;
  addressDong: string;
  addressStreet: string;
  intro: string;
  operationTimeRes: OperationTime[];
  representativeMenuName: string;
  storeName: string;
  storeTypeId: number;
  tableNum: number;
  x: number;
  y: number;
};

//Get할때 쓰는 타입 ///api/v1/stores/{storeId}가게 상세 정보 조회
export type IStore = {
  address: {
    detail: string;
    dong: string;
    street: string;
    x: string;
    y: string;
  };
  averageRate: number;
  category: string;
  storeImages: [
    {
      imageUrl: string;
    },
  ];
  representativeImgaes: [
    {
      imageUrl: string;
    },
  ];
  name: string;
  reviewCount: number;
  storeId: number;
  storeStatus: string;
};
