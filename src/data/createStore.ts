import {RegisterStoreInterface} from './RegisterStoreInterface';

export const createStore = (): RegisterStoreInterface => {
  return {
    addressDong: '',
    addressStreet: '',
    operationTimeVO: [
      {
        breakEndTime: {hour: 0, minute: 0, nano: 0, second: 0},
        breakStartTime: {hour: 0, minute: 0, nano: 0, second: 0},
        dayOfWeek: 'MONDAY',
        endTime: {hour: 0, minute: 0, nano: 0, second: 0},
        startTime: {hour: 0, minute: 0, nano: 0, second: 0},
      },
      {
        breakEndTime: {hour: 0, minute: 0, nano: 0, second: 0},
        breakStartTime: {hour: 0, minute: 0, nano: 0, second: 0},
        dayOfWeek: 'TUESDAY',
        endTime: {hour: 0, minute: 0, nano: 0, second: 0},
        startTime: {hour: 0, minute: 0, nano: 0, second: 0},
      },
      {
        breakEndTime: {hour: 0, minute: 0, nano: 0, second: 0},
        breakStartTime: {hour: 0, minute: 0, nano: 0, second: 0},
        dayOfWeek: 'WEDNESDAY',
        endTime: {hour: 0, minute: 0, nano: 0, second: 0},
        startTime: {hour: 0, minute: 0, nano: 0, second: 0},
      },
      {
        breakEndTime: {hour: 0, minute: 0, nano: 0, second: 0},
        breakStartTime: {hour: 0, minute: 0, nano: 0, second: 0},
        dayOfWeek: 'THURSDAY',
        endTime: {hour: 0, minute: 0, nano: 0, second: 0},
        startTime: {hour: 0, minute: 0, nano: 0, second: 0},
      },
      {
        breakEndTime: {hour: 0, minute: 0, nano: 0, second: 0},
        breakStartTime: {hour: 0, minute: 0, nano: 0, second: 0},
        dayOfWeek: 'FRIDAY',
        endTime: {hour: 0, minute: 0, nano: 0, second: 0},
        startTime: {hour: 0, minute: 0, nano: 0, second: 0},
      },
      {
        breakEndTime: {hour: 0, minute: 0, nano: 0, second: 0},
        breakStartTime: {hour: 0, minute: 0, nano: 0, second: 0},
        dayOfWeek: 'SATURDAY',
        endTime: {hour: 0, minute: 0, nano: 0, second: 0},
        startTime: {hour: 0, minute: 0, nano: 0, second: 0},
      },
      {
        breakEndTime: {hour: 0, minute: 0, nano: 0, second: 0},
        breakStartTime: {hour: 0, minute: 0, nano: 0, second: 0},
        dayOfWeek: 'SUNDAY',
        endTime: {hour: 0, minute: 0, nano: 0, second: 0},
        startTime: {hour: 0, minute: 0, nano: 0, second: 0},
      },
    ],
    representativeMenuName: '',
    storeName: '',
    storeTypeId: 0,
    tableNum: 0,
    x: 0,
    y: 0,
  };
};
