import {atom} from 'recoil';
import {ImageInterface} from '../data';
import {RegisterStoreInterface} from '../data/IStore';

export const userToken = atom({
  key: 'userToken',
  default: '',
});

export const address = atom({
  key: 'address',
  default: {
    address: '',
    bname: '',
    x: '',
    y: '',
  },
});

export const storeData = atom<RegisterStoreInterface>({
  key: 'storeData',
  default: {
    addressDong: '',
    addressStreet: '',
    intro: '',
    operationTimeVO: [
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'MONDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'TUESDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'WEDNESDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'THURSDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'FRIDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'SATURDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'SUNDAY',
        isOpen: true,
      },
    ],
    representativeMenuName: '',
    storeName: '',
    storeTypeId: 0,
    tableNum: 0,
    x: '0',
    y: '0',
    storeImage: [],
    menuImage: [],
  },
});

export const storeImage = atom<ImageInterface[]>({
  key: 'storeImage',
  default: [],
});

export const menuImage = atom<ImageInterface[]>({
  key: 'menuImage',
  default: [],
});

export const RCprogressNow = atom({
  key: 'RCprogressNow',
  default: true,
});
