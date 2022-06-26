export type RegisterStoreInterface = {
  addressDong: string;
  addressStreet: string;
  operationTimeVO: {
    breakEndTime: {hour: number; minute: number; nano: number; second: number};
    breakStartTime: {hour: number; minute: number; nano: number; second: number};
    dayOfWeek: string;
    endTime: {hour: number; minute: number; nano: number; second: number};
    startTime: {hour: number; minute: number; nano: number; second: number};
  }[];
  representativeMenuName: string;
  storeName: string;
  storeTypeId: number;
  tableNum: number;
  x: number;
  y: number;
};
