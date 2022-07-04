import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../components/Store/StoreMenuBar';
import {StoreInfo} from '../components/Store/StoreInfo';
import {useNavigation} from '@react-navigation/native';
import {storeData} from '../state';
import {useRecoilState} from 'recoil';
import {RegisterStoreInterface} from '../data';

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
  storeImage: [
    {uri: 'https://source.unsplash.com/1024x768/?restaurant', type: 'image/jpg', name: '1.jpg'},
    {uri: 'https://source.unsplash.com/1024x768/?restaurant', type: 'image/jpg', name: '2.jpg'},
    {uri: 'https://source.unsplash.com/1024x768/?restaurant', type: 'image/jpg', name: '3.jpg'},
  ],
  menuImage: [
    {uri: 'https://source.unsplash.com/1024x768/?food', type: 'image/jpg', name: '1.jpg'},
    {uri: 'https://source.unsplash.com/1024x768/?food', type: 'image/jpg', name: '2.jpg'},
  ],
  description: '맛있는 고기집',
};

const Store = () => {
  const [store, setStore] = useRecoilState(storeData);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  useEffect(() => {
    //가게 정보 get을 통해서 1회 받고 리코일에 저장하기
    //axios 어쩌구
    setStore(dummyStore);
  }, [setStore]);

  return (
    <View style={[styles.flex, {paddingTop: insets.top}]}>
      <View style={[styles.screenHeaderWrap]}>
        <Text style={[styles.screenHeaderTitle, {color: 'black'}]}>가게 관리</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StoreEdit')}>
          <Text style={[styles.screenHeaderTitle, {color: '#6C69FF'}]}>편집</Text>
        </TouchableOpacity>
      </View>
      <StoreMenuBar
        toggleStore={() => navigation.navigate('Store')}
        toggleMission={() => navigation.navigate('StoreMission')}
        toggleReview={() => navigation.navigate('StoreReview')}
        storeStatus={0}
      />
      <StoreInfo />
    </View>
  );
};

export default Store;

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
    backgroundColor: '#f6f6fa',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  missionSeperate: {
    marginTop: 16,
  },
  screenHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    lineHeight: 24,
  },
});
