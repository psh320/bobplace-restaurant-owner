import {RegisterStoreInterface} from './data';

declare namespace ReactNavigation {
  interface RootParamList {
    CustomerLogin: undefined;
    OwnerLogin: undefined;
    MainNavigator: undefined;
    Register: undefined;
    Store: undefined;
    StoreEdit: undefined;
    StoreMission: undefined;
    StoreReview: undefined;
    RegisterDone: {status: number};
    RegisterStoreInfo: {storeData: RegisterStoreInterface};
  }
}
