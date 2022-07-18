import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegisterNextButton} from '../../components';
import {AuthStackParamList} from '../../nav';
import {createStore} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterDone'>;

const RegisterDone = ({navigation, route}: Props) => {
  const data = createStore();
  const goInfo = () => {
    navigation.navigate('RegisterStoreInfo', {storeData: data});
  };

  const goRegisterStore = () => {
    navigation.navigate('Login'); //입점요청 승낙받을때까지 로그인화면 슝
    // console.log('go Register Store!');
    // navigation.navigate('RegisterStore');
  };

  const ownerRegister = () => {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="check" size={50} color="#7879F7" />
          <Text style={[DesignSystem.h1SB, {color: '#7879F7'}]}>가입완료</Text>
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
          <Text style={[DesignSystem.h1SB, {color: '#7879F7'}]}>입정요청이</Text>
          <Text style={[DesignSystem.h1SB, {color: '#7879F7'}]}>접수되었습니다.</Text>
          <Text style={[DesignSystem.body1Long, DesignSystem.grey10, {marginTop: 24}]}>
            1 영업일 이내에 가입이 완료됩니다.
          </Text>
        </View>
        <RegisterNextButton goNext={() => goInfo()} buttonState={2} />
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
