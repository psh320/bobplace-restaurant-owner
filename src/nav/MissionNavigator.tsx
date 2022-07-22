import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Mission from '../screens/Mission';
import {Notifications} from '../screens/Notifications';
import {useRecoilState} from 'recoil';
import {RCstoreId} from '../state';
import {getStoreId} from '../api/store';

export type MissionStackParamList = {
  Main: undefined;
  Notifications: undefined;
  Mission: {missionId: number};
};

const Stack = createStackNavigator<MissionStackParamList>();

export const MissionNavigator = ({navigation, route}) => {
  const [storeId, setStoreId] = useRecoilState(RCstoreId);
  const getStoreIdRc = async () => {
    const re = await getStoreId();
    setStoreId(re);
  };
  useEffect(() => {
    getStoreIdRc();
  }, []);
  console.log('storeId 저장됨 ? ', storeId);

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
