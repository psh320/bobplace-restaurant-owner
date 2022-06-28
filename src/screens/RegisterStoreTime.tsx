import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RegisterHeader, RegisterNextButton} from '../components';
import {AuthStackParamList} from '../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStoreTime'>;

const RegisterStoreTime = ({navigation, route}: Props) => {
  const [registerStoreData, setRegisterStoreData] = useState(route.params.data);

  const goBack = () => {
    navigation.navigate('RegisterStoreInfo', {data: registerStoreData});
  };

  const goNext = () => {
    navigation.navigate('RegisterDone', {status: 1});
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={() => goBack()} pageNum={3} totalPage={3} />
      <RegisterNextButton goNext={goNext} buttonState={2} />
    </SafeAreaView>
  );
};

export default RegisterStoreTime;

const styles = StyleSheet.create({
  flex: {flex: 1},
  RegisterFormTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#2A2A2A',
    fontWeight: '600',
  },
});
