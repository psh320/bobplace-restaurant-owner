import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {customAxios} from '../../api';
import {RegisterHeader, RegisterNextButton, RegisterTime} from '../../components';
import {RegisterMenuName} from '../../components/Register/RegisterMenuName';
import {RegisterStoreImages} from '../../components/Register/RegisterStoreImages';
import {AuthStackParamList} from '../../nav';
import {useRecoilState, useRecoilValue} from 'recoil';
import {registerMenuImage, registerOperationTime, registerStoreImage, storeData} from '../../state';
import {RegisterMenuImages} from '../../components/Register/RegisterMenuImages';
import {postStoreImages, postStoreMenuImages} from '../../api/register';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStoreTime'>;

const RegisterStoreTime = ({navigation, route}: Props) => {
  const storeImages = useRecoilValue(registerStoreImage);
  const menuImages = useRecoilValue(registerMenuImage);
  const RCstoreData = useRecoilValue(storeData);
  const registerTime = useRecoilValue(registerOperationTime);
  const postData = {...RCstoreData, operationTimeVO: registerTime};
  console.log(postData);
  const postRegister = async (data: any) => {
    try {
      const response = await customAxios().post('/api/v1/stores', data);
      console.log('post stores register:', response.data);
      return response.data.result;
    } catch (error) {
      console.log('post stores register:', error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      storeImage: [],
      menuImage: [],
      menuName: '',
    },
  });
  const goBack = () => {
    navigation.goBack();
  };

  const goNext = async () => {
    const postData = {...RCstoreData, operationTimeVO: registerTime};
    const response = await postRegister(postData);
    await postStoreMenuImages(menuImages, response);
    await postStoreImages(storeImages, response);

    navigation.navigate('MainNavigator');
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <RegisterHeader goBack={() => goBack()} pageNum={2} totalPage={2} />
        <ScrollView style={[styles.flex, styles.formWrap]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterStoreImages
                  onChange={onChange}
                  value={value}
                  error={errors.storeImage !== undefined}
                />
              );
            }}
            name="storeImage"
          />
          {errors.storeImage?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterMenuName
                  onChange={onChange}
                  value={value}
                  error={errors.menuName !== undefined}
                />
              );
            }}
            name="menuName"
          />
          {errors.menuName?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterMenuImages
                  onChange={onChange}
                  value={value}
                  error={errors.menuImage !== undefined}
                />
              );
            }}
            name="storeImage"
          />
          {errors.menuImage?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <RegisterTime />
        </ScrollView>
        <RegisterNextButton goNext={handleSubmit(goNext)} buttonState={3} />
      </SafeAreaView>
    </>
  );
};

export default RegisterStoreTime;

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
