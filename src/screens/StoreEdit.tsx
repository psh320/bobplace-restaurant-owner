import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../components/Store/StoreMenuBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StoreStackParamList} from '../nav/StoreNavigator';
import {useForm, Controller} from 'react-hook-form';
import {StoreTime} from '../components/Store/StoreTime';
import {RenderImageList} from '../components/common/RenderImageList';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {ImageInterface, RegisterStoreInterface} from '../data';
import {storeData} from '../state';
import {useRecoilState} from 'recoil';

type Props = NativeStackScreenProps<StoreStackParamList, 'StoreEdit'>;

const dot = () => {
  const dotStyle = {
    backgroundColor: '#ffffffb2',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={dotStyle} />;
};
const activeDot = () => {
  const activeDotStyle = {
    backgroundColor: '#6C69FF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={activeDotStyle} />;
};

const dummyStore: RegisterStoreInterface = {
  addressDong: '강남구',
  addressStreet: '서울특별시 강남구 논현로150길 16',
  operationTimeVO: [
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      endTime: '23:00:00',
      startTime: '17:00:00',
      dayofweek: 'MONDAY',
      isOpen: true,
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      endTime: '23:00:00',
      startTime: '17:00:00',
      dayofweek: 'TUESDAY',
      isOpen: true,
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      endTime: '23:00:00',
      startTime: '17:00:00',
      dayofweek: 'WEDNESDAY',
      isOpen: true,
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      endTime: '23:00:00',
      startTime: '17:00:00',
      dayofweek: 'THURSDAY',
      isOpen: true,
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      endTime: '23:00:00',
      startTime: '17:00:00',
      dayofweek: 'FRIDAY',
      isOpen: true,
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      endTime: '23:00:00',
      startTime: '17:00:00',
      dayofweek: 'SATURDAY',
      isOpen: true,
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      endTime: '23:00:00',
      startTime: '17:00:00',
      dayofweek: 'SUNDAY',
      isOpen: true,
    },
  ],
  representativeMenuName: '삼겹살',
  storeName: '강남고기집 신칠성집',
  storeTypeId: 6,
  tableNum: 1,
  x: 133,
  y: 124,
};

const dummyImage: ImageInterface[] = [
  {uri: 'https://source.unsplash.com/1024x768/?food', type: 'image/jpg', name: '1.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?snack', type: 'image/jpg', name: '2.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?candy', type: 'image/jpg', name: '3.jpg'},
];

const StoreEdit = ({navigation}: Props) => {
  const [store, setStore] = useRecoilState(storeData);
  const [storeEditData, setStoreEditData] = useState(store);

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
      representativeMenuName: '',
      representativePhoto: [],
      storePhoto: [],
    },
  });

  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={[styles.screenHeaderWrap]}>
        <Text>가게 관리</Text>
        <TouchableOpacity
          onPress={() => {
            setStore(storeEditData);
            navigation.goBack();
          }}
        >
          <Text>저장</Text>
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
          <View style={{height: 220}}>
            <Swiper dot={dot()} activeDot={activeDot()} showsButtons={false}>
              <FastImage
                source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
                style={{width: '100%', height: 220}}
              />
              <FastImage
                source={{uri: 'https://source.unsplash.com/1024x768/?water'}}
                style={{width: '100%', height: 220}}
              />
              <FastImage
                source={{uri: 'https://source.unsplash.com/1024x768/?girl'}}
                style={{width: '100%', height: 220}}
              />
              <FastImage
                source={{uri: 'https://source.unsplash.com/1024x768/?tree'}}
                style={{width: '100%', height: 220}}
              />
            </Swiper>
          </View>
          <View style={[styles.storeInfoWrap]}>
            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>상호명</Text>
              <View style={[styles.fieldBox]}>
                <Text style={[styles.fieldTitle]}>{dummyStore.storeName}</Text>
              </View>
            </View>
            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>가게 한줄 소개</Text>
              <View style={[styles.fieldBox]}>
                <Text style={[styles.fieldTitle]}>{dummyStore.storeName}</Text>
              </View>
            </View>
            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>가게주소</Text>
              <View style={[styles.fieldBox]}>
                <Text style={[styles.fieldTitle]}>{dummyStore.addressStreet}</Text>
              </View>
              <View style={[styles.fieldBox]}>
                <Text style={[styles.fieldTitle]}>{dummyStore.addressDong}</Text>
              </View>
            </View>
            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>가게 유형</Text>
              <View style={[styles.fieldBox]}>
                <Text style={[styles.fieldTitle]}>{dummyStore.storeTypeId}</Text>
              </View>
            </View>
            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>테이블 수</Text>
              <View style={[styles.fieldBox]}>
                <Text style={[styles.fieldTitle]}>{dummyStore.tableNum}</Text>
              </View>
            </View>
            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>대표메뉴</Text>
              <Text style={[styles.fieldSubTitle, {fontWeight: '300'}]}>
                대표메뉴 미션을 위해 사용됩니다.
              </Text>
              <View style={[styles.fieldBox]}>
                <Text style={[styles.fieldTitle]}>{dummyStore.representativeMenuName}</Text>
              </View>
            </View>

            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>대표메뉴 사진</Text>
              <View>
                <RenderImageList imageData={dummyImage} imageSize={100} />
              </View>
            </View>
            <View style={[styles.infoFieldWrap]}>
              <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>운영시간</Text>
              <StoreTime operationData={dummyStore.operationTimeVO} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StoreEdit;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  screenHeaderWrap: {
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

  storeInfoWrap: {flex: 1, marginLeft: 16, marginRight: 16, marginTop: 24, marginBottom: 24},
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
});
