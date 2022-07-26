import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {StoreNavigator} from './StoreNavigator';
import {MyNavigator} from './MyNavigator';
import {getMissionsProgress} from '../api/mission';
import {MissionNavigator} from './MissionNavigator';
import {Image} from 'react-native';

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
  return {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: true,
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
  };
};

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  getMissionsProgress();
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="MissionNavigator">
      <Tab.Screen
        name="MissionNavigator"
        component={MissionNavigator}
        options={{
          tabBarLabel: '미션',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  source={require('../assets/tab_bar_icon/homeFocus.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/tab_bar_icon/home.png')}
                  style={{width: 24, height: 24}}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="StoreNavigator"
        component={StoreNavigator}
        options={{
          tabBarLabel: '가게관리',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  source={require('../assets/tab_bar_icon/noodleFocus.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/tab_bar_icon/noodle.png')}
                  style={{width: 24, height: 24}}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="MyNavigator"
        component={MyNavigator}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  source={require('../assets/tab_bar_icon/userFocus.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/tab_bar_icon/user.png')}
                  style={{width: 24, height: 24}}
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
