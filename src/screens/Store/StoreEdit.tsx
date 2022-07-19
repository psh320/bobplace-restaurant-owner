import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../../components/Store/StoreMenuBar';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreStackParamList} from '../../nav/StoreNavigator';
import {useForm, Controller} from 'react-hook-form';
import {ImageInterface, RegisterStoreInterface} from '../../data';
import {storeData} from '../../state';
import {useRecoilState} from 'recoil';
import {ImageSwiper} from '../../components/common/ImageSwiper';
import {ImageSwiperModal} from '../../modal/ImageSwiperModal';
import {
  RegisterAddress,
  RegisterStoreName,
  RegisterStoreTable,
  RegisterStoreType,
} from '../../components';
import {RegisterStoreDescription} from '../../components/Register/RegisterStoreDescription';
import {RegisterStoreMenuName} from '../../components/Register/RegisterStoreMenuName';
import {RegisterTime} from '../../components/Register/RegisterTime';
import {RegisterMenuImages} from '../../components/Register/RegisterMenuImages';

type Props = StackScreenProps<StoreStackParamList, 'StoreEdit'>;

const StoreEdit = ({navigation}: Props) => {
  const [store, setStore] = useRecoilState(storeData);
  const [storeEditData, setStoreEditData] = useState(store);
  const [imageSwiperModal, setImageSwiperModal] = useState(false);
  const insets = useSafeAreaInsets();
  console.log('수정한 스토어 시간 데이터', storeEditData.operationTimeVO);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      storeName: store.storeName,
      storeTypeId: store.storeTypeId,
      tableNum: store.tableNum,
      address: store.addressStreet,
      representativeMenuName: store.representativeMenuName,
      description: store.description,
      menuImages: store.menuImage.length,
    },
  });

  const onSubmit = () => {
    setStore(storeEditData);
    //patch store to server
    navigation.goBack();
  };

  return (
    <View style={[styles.flex, {paddingTop: insets.top}]}>
      <View style={[styles.screenHeaderWrap]}>
        <Text style={[styles.screenHeaderTitle]}>가게 관리</Text>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.screenHeaderTitle, {color: '#6C69FF'}]}>저장</Text>
        </TouchableOpacity>
      </View>
      <View pointerEvents="none" style={{opacity: 0.5}}>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission')}
          toggleReview={() => navigation.navigate('StoreReview')}
          storeStatus={0}
        />
      </View>

      <KeyboardAvoidingView
        style={[{flex: 1}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{backgroundColor: '#FFFFFF'}}>
          <View>
            <ImageSwiperModal
              visible={imageSwiperModal}
              closeImageSwiperModal={() => setImageSwiperModal(false)}
              storeEditData={storeEditData}
              setStoreEditData={setStoreEditData}
            />
            <ImageSwiper height={220} imageList={storeEditData.storeImage} />
            <TouchableOpacity
              style={[styles.editImageSwiperButton]}
              onPress={() => setImageSwiperModal(true)}
            >
              <View style={[styles.editImageSwiperIcon]}>
                <Icon name="pencil" size={18} color="#323232" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.storeInfoWrap]}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterStoreName
                    registerData={storeEditData}
                    setRegisterData={setStoreEditData}
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
                  <RegisterStoreDescription
                    registerData={storeEditData}
                    setRegisterData={setStoreEditData}
                    onChange={onChange}
                    value={value}
                    error={errors.description !== undefined}
                  />
                );
              }}
              name="description"
            />
            {errors.description?.type === 'required' && (
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
                    registerData={storeEditData}
                    setRegisterData={setStoreEditData}
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
                    registerData={storeEditData}
                    setRegisterData={setStoreEditData}
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
                    registerData={storeEditData}
                    setRegisterData={setStoreEditData}
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

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterStoreMenuName
                    registerData={storeEditData}
                    setRegisterData={setStoreEditData}
                    onChange={onChange}
                    value={value}
                    error={errors.representativeMenuName !== undefined}
                  />
                );
              }}
              name="representativeMenuName"
            />
            {errors.representativeMenuName?.type === 'required' && (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            )}

            <Controller
              control={control}
              rules={{
                min: 1,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterMenuImages
                    registerData={storeEditData}
                    setRegisterData={setStoreEditData}
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
              name="menuImages"
            />
            {errors.menuImages?.type === 'min' && (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            )}

            <RegisterTime setRegisterData={setStoreEditData} registerData={storeEditData} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default StoreEdit;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  screenHeaderWrap: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 14,
    paddingTop: 8,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  screenStatusWrap: {flexDirection: 'row', flex: 1, backgroundColor: '#FFFFFF'},
  missionUserNumberWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 46,
    width: '100%',
    backgroundColor: '#FCFCFC',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  missionSeperate: {
    marginTop: 16,
  },

  storeInfoWrap: {flex: 1, marginLeft: 16, marginRight: 16, marginBottom: 24},
  infoFieldWrap: {marginBottom: 28, width: '100%'},
  fieldTitle: {fontSize: 16, lineHeight: 24, fontFamily: 'Pretendard-Regular', color: '#111111'},
  fieldSubTitle: {fontSize: 14, lineHeight: 22, fontFamily: 'Pretendard-Regular', color: '#777777'},
  fieldBox: {
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
  screenHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    lineHeight: 24,
  },

  editImageSwiperButton: {position: 'absolute', right: 20, bottom: 20},
  editImageSwiperIcon: {
    height: 24,
    width: 24,
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {color: '#E03D32', marginLeft: 8, marginTop: 4},
  imageAddButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    marginRight: 8,
  },
  flexRow: {
    flexDirection: 'row',
  },
});
