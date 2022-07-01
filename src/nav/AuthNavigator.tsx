import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import {MainNavigator} from './MainNavigator';
import Register from '../screens/Register';
import RegisterForm from '../screens/RegisterForm';
import {RegisterInterface, RegisterStoreInterface} from '../data';
import RegisterDone from '../screens/RegisterDone';
import RegisterStore from '../screens/RegisterStore';
import RegisterStoreInfo from '../screens/RegisterStoreInfo';
import RegisterStoreTime from '../screens/RegisterStoreTime';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterForm: {registerData: RegisterInterface};
  RegisterDone: {status: number};
  RegisterStore: {storeData: RegisterStoreInterface; imageData: any};
  RegisterStoreInfo: {storeData: RegisterStoreInterface; imageData: any};
  RegisterStoreTime: {storeData: RegisterStoreInterface; imageData: any};
  MainNavigator: undefined;
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
    </Stack.Navigator>
  );
};
