export type OperationTime = {
  breakEndTime: string;
  breakStartTime: string;
  endTime: string;
  startTime: string;
  dayofweek: string;
  isOpen: boolean;
};

export type RegisterStoreInterface = {
  addressDong: string;
  addressStreet: string;
  operationTimeVO: OperationTime[];
  representativeMenuName: string;
  storeName: string;
  storeTypeId: number;
  tableNum: number;
  x: number;
  y: number;
};
