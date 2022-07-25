import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Mission from '../screens/Mission';
import {Notifications} from '../screens/Notifications';

export type MissionStackParamList = {
  Main: undefined;
  Notifications: {newNotiCount: number};
  Mission: {missionId: number};
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
    </Stack.Navigator>
  );
};
