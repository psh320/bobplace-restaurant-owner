import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegisterNextButton} from '../components';
import {AuthStackParamList} from '../nav';
import {RegisterStoreInterface} from '../data';
import {createStore} from '../data';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterDone'>;

const RegisterDone = ({navigation, route}: Props) => {
  const goLogin = () => {
    navigation.navigate('Login');
  };

  const goRegisterStore = () => {
    const data = createStore();
    console.log('go Register Store!');
    navigation.navigate('RegisterStore');
  };

  const ownerRegister = () => {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="check" size={50} color="#7879F7" />
          <Text style={[styles.registerDoneText]}>가입완료</Text>
        </View>
        <RegisterNextButton goNext={() => goRegisterStore()} buttonState={2} />
      </>
    );
  };

  const storeRegister = () => {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="check" size={100} color="#7879F7" />
          <Text style={[styles.registerDoneText]}>입정요청이 접수되었습니다.</Text>
          <Text>1 영업일 이내에 가입이 완료됩니다.</Text>
        </View>
        <RegisterNextButton goNext={() => goLogin()} buttonState={2} />
      </>
    );
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      {route.params.status === 0 ? ownerRegister() : storeRegister()}
    </SafeAreaView>
  );
};

export default RegisterDone;

const styles = StyleSheet.create({
  flex: {flex: 1},
  registerDoneText: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '600',
    color: '#7879F7',
  },
});
