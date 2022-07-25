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
import {storeData, storeImage} from '../../state';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ImageSwiper} from '../../components/common/ImageSwiper';
import {ImageSwiperModal} from '../../modal/ImageSwiperModal';
import {
  RegisterAddress,
  RegisterStoreName,
  RegisterStoreTable,
  RegisterStoreType,
} from '../../components';
import {RegisterTime} from '../../components/Register/RegisterTime';
import {RegisterMenuImages} from '../../components/Register/RegisterMenuImages'; //주석 중
import {RegisterStoreIntro} from '../../components/Register/RegisterStoreIntro';
import {RegisterStoreAddressDetail} from '../../components/Register/RegisterStoreAddressDetail';
import {RegisterMenuName} from '../../components/Register/RegisterMenuName';
import {getMenuImage, getStoreImage, putStoresMe} from '../../api/store';
import {DesignSystem} from '../../assets/DesignSystem';
import {StoreEditTime} from '../../components/Store/StoreEditTime';
import {StoreEditMenuImages} from '../../components/Store/StoreEditMenuImages';
import {useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';

type Props = StackScreenProps<StoreStackParamList, 'StoreEdit'>;

const StoreEdit = ({navigation}: Props) => {
  const [store, setStore] = useRecoilState(storeData);
  const storeImages = useQuery(queryKey.STOREIMAGES, getStoreImage);
  const menuImages = useQuery(queryKey.MENUIMAGES, getMenuImage);
  const [imageSwiperModal, setImageSwiperModal] = useState(false); //수정전 주석중
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      addressDetail: store.addressDetail,
      addressDong: store.addressDong,
      addressStreet: store.addressStreet,
      intro: store.intro,
      representativeMenuName: store.representativeMenuName,
      storeName: store.storeName,
      storeTypeId: store.storeTypeId,
      tableNum: store.tableNum,
      x: store.x,
      y: store.y,
    },
  });

  const onSubmit = () => {
    putStoresMe(store);
    navigation.goBack();
    console.log('저장!!');
  };

  return (
    <View style={[styles.flex, {paddingTop: insets.top}]}>
      <View style={[styles.screenHeaderWrap]}>
        <Text style={[DesignSystem.h2SB, {color: 'black'}]}>가게 관리</Text>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>저장</Text>
        </TouchableOpacity>
      </View>
      <StoreMenuBar
        toggleStore={() => navigation.navigate('Store')}
        toggleMission={() => navigation.navigate('StoreMission')}
        toggleReview={() => navigation.navigate('StoreReview')}
        storeStatus={0}
      />
      <KeyboardAvoidingView
        style={[{flex: 1}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{backgroundColor: '#FFFFFF'}}>
          {/* 이미지 이거 아직 수정 안해서 꺼놓음 */}
          <View>
            <ImageSwiperModal
              visible={imageSwiperModal}
              closeImageSwiperModal={() => setImageSwiperModal(false)}
            />
            <ImageSwiper height={220} imageList={storeImages.data} />
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
                required: false,
              }}
              render={({field: {onChange, value}}) => {
                return <RegisterStoreIntro onChange={onChange} value={value} error={false} />;
              }}
              name="intro"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterAddress
                    onChange={onChange}
                    value={value}
                    error={errors.addressStreet !== undefined}
                  />
                );
              }}
              name="addressStreet"
            />
            {errors.addressStreet?.type === 'required' && (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            )}

            {/* 상세주소 */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <>
                    <RegisterStoreAddressDetail
                      onChange={onChange}
                      value={value}
                      error={errors.addressDetail !== undefined}
                    />
                  </>
                );
              }}
              name="addressDetail"
            />
            {errors.addressDetail?.type === 'required' ? (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            ) : (
              <View style={{height: 20}} />
            )}

            <Controller
              control={control}
              rules={{
                min: 0,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterStoreType
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
                  <RegisterMenuName
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

            {/* 메뉴이미지 */}
            {/* <Controller
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
            )} */}
            <StoreEditMenuImages />

            <StoreEditTime />
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
