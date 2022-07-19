import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {customAxios} from '../../api';
import {RegisterHeader, RegisterNextButton} from '../../components';
import {RegisterMenuName} from '../../components/Register/RegisterMenuName';
import {RegisterStoreImages} from '../../components/Register/RegisterStoreImages';
import {RegisterTime} from '../../components/Register/RegisterTime';
import {ImageInterface} from '../../data';
import {AuthStackParamList} from '../../nav';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStoreTime'>;

const RegisterStoreTime = ({navigation, route}: Props) => {
  const [registerStoreData, setRegisterStoreData] = useState(route.params.storeData);
  const [storeImages, setStoreImages] = useState<ImageInterface[]>([]);
  const postRegister = async () => {
    try {
      const response = await customAxios().post('/api/v1/stores', registerStoreData);
      console.log('post stores register:', response.data);
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
      menuName: '',
    },
  });
  const goBack = () => {
    navigation.navigate('RegisterStoreInfo', {
      storeData: registerStoreData,
    });
  };

  const goNext = async () => {
    await postRegister();
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
                  setStoreImages={setStoreImages}
                  storeImages={storeImages}
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
                  setRegisterData={setRegisterStoreData}
                  registerData={registerStoreData}
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

          <RegisterTime setRegisterData={setRegisterStoreData} registerData={registerStoreData} />
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
