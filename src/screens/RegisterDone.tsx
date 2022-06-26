import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegisterNextButton} from '../components';
import {AuthStackParamList} from '../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterDone'>;

const RegisterDone = ({navigation, route}: Props) => {
  const goMain = () => {
    navigation.navigate('MainNavigator');
  };

  const goRegisterStore = () => {
    navigation.navigate('RegisterStore');
  };

  const ownerRegister = () => {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="checkmark" size={50} color="#6C69FF" />
          <Text>가입완료</Text>
        </View>
        <RegisterNextButton goNext={() => goRegisterStore} buttonState={2} />
      </>
    );
  };

  const storeRegister = () => {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="checkmark" size={50} color="#6C69FF" />
          <Text>가입완료</Text>
          <Text>가입완료</Text>
        </View>
        <RegisterNextButton goNext={() => goMain} buttonState={2} />
      </>
    );
  };

  return (
    <SafeAreaView>{route.params.status === 0 ? ownerRegister() : storeRegister()}</SafeAreaView>
  );
};

export default RegisterDone;
