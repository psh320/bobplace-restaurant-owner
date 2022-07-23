import {atom} from 'recoil';
import {ImageInterface} from '../data';
import {OperationTime, RegisterStoreGetInterface, RegisterStoreInterface} from '../data/IStore';

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

export const registerOperationTime = atom<OperationTime[]>({
  key: 'registerOperationTime',
  default: [
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'MONDAY',
      hasBreak: true,
      hasOperationTime: true,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'TUESDAY',
      hasBreak: true,
      hasOperationTime: true,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'WEDNESDAY',
      hasBreak: true,
      hasOperationTime: true,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'THURSDAY',
      hasBreak: true,
      hasOperationTime: true,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'FRIDAY',
      hasBreak: true,
      hasOperationTime: true,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'SATURDAY',
      hasBreak: true,
      hasOperationTime: true,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'SUNDAY',
      hasBreak: true,
      hasOperationTime: true,
    },
  ],
});

export const editOperationTime = atom<OperationTime[]>({
  key: 'editOperationTime',
  default: [
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'MONDAY',
      hasBreak: true,
      hasOperationTime: true,
      operationTimeId: 0,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'TUESDAY',
      hasBreak: true,
      hasOperationTime: true,
      operationTimeId: 0,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'WEDNESDAY',
      hasBreak: true,
      hasOperationTime: true,
      operationTimeId: 0,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'THURSDAY',
      hasBreak: true,
      hasOperationTime: true,
      operationTimeId: 0,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'FRIDAY',
      hasBreak: true,
      hasOperationTime: true,
      operationTimeId: 0,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'SATURDAY',
      hasBreak: true,
      hasOperationTime: true,
      operationTimeId: 0,
    },
    {
      breakEndTime: '00:00:00',
      breakStartTime: '00:00:00',
      endTime: '00:00:00',
      startTime: '00:00:00',
      dayOfWeek: 'SUNDAY',
      hasBreak: true,
      hasOperationTime: true,
      operationTimeId: 0,
    },
  ],
});

export const storeData = atom<RegisterStoreInterface>({
  key: 'storeData',
  default: {
    addressDong: '',
    addressStreet: '',
    addressDetail: '',
    intro: '',
    representativeMenuName: '',
    storeName: '',
    storeTypeId: 0,
    tableNum: 0,
    x: 0,
    y: 0,
  },
});

export const storeImage = atom<{imageURL: string; storeImageId: string}[]>({
  key: 'storeImage',
  default: [],
});

export const menuImage = atom<{imageURL: string; menuImageId: string}[]>({
  key: 'menuImage',
  default: [],
});

export const registerStoreImage = atom<ImageInterface[]>({
  key: 'registerStoreImage',
  default: [],
});

export const registerMenuImage = atom<ImageInterface[]>({
  key: 'registerMenuImage',
  default: [],
});

export const RCprogressNow = atom({
  key: 'RCprogressNow',
  default: true,
});

export const RCnowWrite = atom({
  key: 'RCnowWrite',
  default: true,
});

export const RCpressedMissionGroupId = atom({
  key: 'RCpressedMissionGroupId',
  default: 0,
});
