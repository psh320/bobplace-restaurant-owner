import {ImageInterface} from './ImageInterface';

export type OperationTime = {
  breakEndTime: string;
  breakStartTime: string;
  endTime: string;
  startTime: string;
  dayofweek: string;
  isOpen: boolean;
};

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
  x: string;
  y: string;
  storeImage: ImageInterface[];
  menuImage: ImageInterface[];
  description: string;
};

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
  images: [
    {
      imageUrl: string;
    },
  ];
  name: string;
  reviewCount: number;
  storeId: number;
  storeStatus: string;
};
