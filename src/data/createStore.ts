import {RegisterStoreInterface} from './RegisterStoreInterface';

export const createStore = (): RegisterStoreInterface => {
  return {
    addressDong: '',
    addressStreet: '',
    monday: {
      startTime: '00:00:00',
      endTime: '00:00:00',
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
    },
    tuesday: {
      startTime: '00:00:00',
      endTime: '00:00:00',
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
    },
    wednesday: {
      startTime: '00:00:00',
      endTime: '00:00:00',
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
    },
    thursday: {
      startTime: '00:00:00',
      endTime: '00:00:00',
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
    },
    friday: {
      startTime: '00:00:00',
      endTime: '00:00:00',
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
    },
    saturday: {
      startTime: '00:00:00',
      endTime: '00:00:00',
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
    },
    sunday: {
      startTime: '00:00:00',
      endTime: '00:00:00',
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
    },
    representativeMenuName: '',
    storeName: '',
    storeTypeId: 0,
    tableNum: 0,
    x: 0,
    y: 0,
  };
};
