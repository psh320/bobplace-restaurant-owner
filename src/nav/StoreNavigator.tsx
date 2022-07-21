import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Store from '../screens/Store/Store';
import StoreEdit from '../screens/Store/StoreEdit';
import StoreMission from '../screens/Store/StoreMission';
import StoreReview from '../screens/Store/StoreReview';
import StoreMissionDetail from '../screens/Store/StoreMissionDetail';
import StoreMissionPayment from '../screens/Store/StoreMissionPayment';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type StoreStackParamList = {
  Store: undefined;
  StoreEdit: undefined;
  StoreMission: {storeId: number};
  StoreReview: {storeId: number};
  StoreMissionDetail: {missionId: number};
  StoreMissionPayment: {
    missionId: number;
    name: string;
    successDate: string;
    point: number;
    phone: string;
  };
};

const Stack = createStackNavigator<StoreStackParamList>();

export const StoreNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'StoreMissionDetail' || routeName === 'StoreMissionPayment') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      initialRouteName="Store"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="StoreEdit"
        component={StoreEdit}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="StoreMission"
        component={StoreMission}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="StoreReview"
        component={StoreReview}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen name="StoreMissionDetail" component={StoreMissionDetail} />
      <Stack.Screen name="StoreMissionPayment" component={StoreMissionPayment} />
    </Stack.Navigator>
  );
};
