import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import {MainNavigator} from './MainNavigator';
import Register from '../screens/Register/Register';
import RegisterForm from '../screens/Register/RegisterForm';
import {RegisterInterface} from '../data/IRegister';
import {RegisterStoreInterface} from '../data/IStore';
import RegisterDone from '../screens/Register/RegisterDone';
import RegisterStore from '../screens/Register/RegisterStore';
import RegisterStoreInfo from '../screens/Register/RegisterStoreInfo';
import RegisterStoreTime from '../screens/Register/RegisterStoreTime';
import RegisterContract from '../screens/Register/RegisterContract';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterForm: {registerData: RegisterInterface};
  RegisterDone: {status: number};
  RegisterStore: undefined;
  RegisterStoreInfo: {storeData: RegisterStoreInterface};
  RegisterStoreTime: {storeData: RegisterStoreInterface};
  MainNavigator: undefined;
  RegisterContract: {type: number};
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="RegisterDone" component={RegisterDone} />
      <Stack.Screen name="RegisterStore" component={RegisterStore} />
      <Stack.Screen name="RegisterStoreInfo" component={RegisterStoreInfo} />
      <Stack.Screen name="RegisterStoreTime" component={RegisterStoreTime} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen name="RegisterContract" component={RegisterContract} />
    </Stack.Navigator>
  );
};
