import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Store from '../screens/Store';
import StoreEdit from '../screens/StoreEdit';
import StoreMission from '../screens/StoreMission';
import StoreReview from '../screens/StoreReview';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type StoreStackParamList = {
  Store: undefined;
  StoreEdit: undefined;
  StoreMission: undefined;
  StoreReview: undefined;
};

const Stack = createStackNavigator<StoreStackParamList>();

export const StoreNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MissionDetail') {
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
    </Stack.Navigator>
  );
};
