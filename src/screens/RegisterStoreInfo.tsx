import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {RegisterAddress, RegisterHeader, RegisterNextButton} from '../components';
import {AuthStackParamList} from '../nav';
import {useForm, Controller} from 'react-hook-form';
import {RegisterStoreName} from '../components/Register/RegisterStoreName';
import {RegisterStoreType} from '../components/Register/RegisterStoreType';
import {RegisterStoreTable} from '../components/Register/RegisterStoreTable';
import {ImageInterface} from '../data';
import {RegisterStoreImages} from '../components/Register/RegisterStoreImages';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStoreInfo'>;

const RegisterStoreInfo = ({navigation, route}: Props) => {
  const [registerStoreData, setRegisterStoreData] = useState(route.params.storeData);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      storeName: '',
      storeTypeId: -1,
      tableNum: -1,
      address: '',
    },
  });
  const goBack = () => {
    navigation.navigate('Login');
  };

  const onSubmit = () => {
    navigation.navigate('RegisterStoreTime', {
      storeData: registerStoreData,
      menuImageData: route.params.menuImageData,
      storeImageData: route.params.storeImageData,
    });
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={() => goBack()} pageNum={2} totalPage={3} />
      <KeyboardAvoidingView
        style={[{flex: 1}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={[styles.flex, styles.formWrap]}>
          <Text style={[styles.RegisterFormTitle]}>영업정보</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterStoreName
                  setRegisterData={setRegisterStoreData}
                  registerData={registerStoreData}
                  onChange={onChange}
                  value={value}
                  error={errors.storeName !== undefined}
                />
              );
            }}
            name="storeName"
          />
          {errors.storeName?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterAddress
                  setRegisterData={setRegisterStoreData}
                  registerData={registerStoreData}
                  onChange={onChange}
                  value={value}
                  error={errors.address !== undefined}
                />
              );
            }}
            name="address"
          />
          {errors.address?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              min: 0,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterStoreType
                  setRegisterData={setRegisterStoreData}
                  registerData={registerStoreData}
                  onChange={onChange}
                  value={value}
                  error={errors.storeTypeId !== undefined}
                />
              );
            }}
            name="storeTypeId"
          />
          {errors.storeTypeId?.type === 'min' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              min: 0,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterStoreTable
                  setRegisterData={setRegisterStoreData}
                  registerData={registerStoreData}
                  onChange={onChange}
                  value={value}
                  error={errors.tableNum !== undefined}
                />
              );
            }}
            name="tableNum"
          />
          {errors.tableNum?.type === 'min' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <RegisterNextButton goNext={handleSubmit(onSubmit)} buttonState={isValid ? 1 : 0} />
    </SafeAreaView>
  );
};

export default RegisterStoreInfo;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  RegisterFormTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  formWrap: {marginLeft: 16, marginRight: 16},
  errorMessage: {color: '#E03D32', marginLeft: 8, marginTop: 4},
});
