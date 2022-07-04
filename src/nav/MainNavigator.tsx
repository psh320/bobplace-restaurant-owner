import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
import Mission from '../screens/Mission';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {StoreNavigator} from './StoreNavigator';
import {MyNavigator} from './MyNavigator';

type TabBarIconProps = {focused: boolean; color: string; size: number};

const icons: Record<string, string[]> = {
  Mission: ['home', 'home-outline'],
  StoreNavigator: ['food', 'food-outline'],
  MyNavigator: ['account-settings', 'account-settings-outline'],
};

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
  return {
    headerShown: false,
    tabBarShowLabel: true,
    tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
      const {name} = route;
      const focusedSize = focused ? size + 6 : size;
      const focusedColor = focused ? 'black' : color;
      const [icon, iconOutline] = icons[name];
      const iconName = focused ? icon : iconOutline;
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
  };
};

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Mission">
      <Tab.Screen name="Mission" component={Mission} options={{tabBarLabel: '미션'}} />
      <Tab.Screen
        name="StoreNavigator"
        component={StoreNavigator}
        options={{tabBarLabel: '점포관리'}}
      />
      <Tab.Screen
        name="MyNavigator"
        component={MyNavigator}
        options={{tabBarLabel: '마이페이지'}}
      />
    </Tab.Navigator>
  );
};
