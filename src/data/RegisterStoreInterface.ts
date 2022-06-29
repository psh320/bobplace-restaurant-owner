export type OperationTime = {
  breakEndTime: string;
  breakStartTime: string;
  endTime: string;
  startTime: string;
};

export type RegisterStoreInterface = {
  addressDong: string;
  addressStreet: string;
  monday: OperationTime | null;
  tuesday: OperationTime | null;
  wednesday: OperationTime | null;
  thursday: OperationTime | null;
  friday: OperationTime | null;
  saturday: OperationTime | null;
  sunday: OperationTime | null;
  representativeMenuName: string;
  storeName: string;
  storeTypeId: number;
  tableNum: number;
  x: number;
  y: number;
};
