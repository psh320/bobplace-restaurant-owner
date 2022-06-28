import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RegisterHeader, RegisterNextButton} from '../components';
import {AuthStackParamList} from '../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStoreInfo'>;

const RegisterStoreInfo = ({navigation, route}: Props) => {
  const [registerStoreData, setRegisterStoreData] = useState(route.params.storeData);
  const [imageData, setImageData] = useState(route.params.imageData);

  const goBack = () => {
    navigation.navigate('RegisterStore', {storeData: registerStoreData, imageData: imageData});
  };

  const goNext = () => {
    navigation.navigate('RegisterStoreTime', {storeData: registerStoreData, imageData: imageData});
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={() => goBack()} pageNum={2} totalPage={3} />
      <View style={[styles.flex, styles.formWrap]}>
        <Text style={[styles.RegisterFormTitle]}>영업정보</Text>
      </View>

      <RegisterNextButton goNext={goNext} buttonState={1} />
    </SafeAreaView>
  );
};

export default RegisterStoreInfo;

const styles = StyleSheet.create({
  flex: {flex: 1},
  RegisterFormTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  formWrap: {marginLeft: 16, marginRight: 16},
});
