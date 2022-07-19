import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Mission from '../screens/Mission';
import {Notifications} from '../screens/Notifications';
import StoreReview from '../screens/Store/StoreReview';
import {StoreNavigator} from './StoreNavigator';

export type MissionStackParamList = {
  Main: undefined;
  Notifications: undefined;
  Mission: {missionId: number};
  StoreReview: undefined;
  StoreNavigator: undefined;
};

const Stack = createStackNavigator<MissionStackParamList>();

export const MissionNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Notifications') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="Mission" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Mission" component={Mission} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="StoreNavigator" component={StoreNavigator} />
    </Stack.Navigator>
  );
};
