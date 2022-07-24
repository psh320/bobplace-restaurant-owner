import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StoreMenuBar} from '../../components/Store/StoreMenuBar';
import {StoreInfo} from '../../components/Store/StoreInfo';
import {useNavigation} from '@react-navigation/native';
import {storeData, storeGetData} from '../../state';
import {useRecoilState} from 'recoil';
import {RegisterStoreInterface} from '../../data/IStore';
import {DesignSystem} from '../../assets/DesignSystem';
import {queryKey} from '../../api/queryKey';
import {getStoreInfo} from '../../api/store';
import {useQuery} from 'react-query';

const dummyStore: RegisterStoreInterface = {
  addressDetail: '1층 2층 3층',
  addressDong: '강남구',
  addressStreet: '서울특별시 강남구 논현로150길 16',
  intro: '고기먹고싶다',
  operationTimeVO: [
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      dayOfWeek: 'MONDAY',
      endTime: '23:00:00',
      hasBreak: true,
      hasOperationiTime: false,
      startTime: '23:00:00',
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      dayOfWeek: 'TUESDAY',
      endTime: '23:00:00',
      hasBreak: false,
      hasOperationiTime: true,
      startTime: '23:00:00',
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      dayOfWeek: 'WEDNESDSAY',
      endTime: '23:00:00',
      hasBreak: false,
      hasOperationiTime: true,
      startTime: '23:00:00',
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      dayOfWeek: 'THURSDAY',
      endTime: '23:00:00',
      hasBreak: true,
      hasOperationiTime: true,
      startTime: '23:00:00',
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      dayOfWeek: 'FRIDAY',
      endTime: '23:00:00',
      hasBreak: true,
      hasOperationiTime: true,
      startTime: '23:00:00',
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      dayOfWeek: 'SATURDAY',
      endTime: '23:00:00',
      hasBreak: true,
      hasOperationiTime: true,
      startTime: '23:00:00',
    },
    {
      breakEndTime: '16:00:00',
      breakStartTime: '14:00:00',
      dayOfWeek: 'SUNDAY',
      endTime: '23:00:00',
      hasBreak: true,
      hasOperationiTime: true,
      startTime: '23:00:00',
    },
  ],
  representativeMenuName: '삼겹살',
  storeName: '강남고기집 신칠성집xx',
  storeTypeId: 6,
  tableNum: 1,
};

const Store = () => {
  const [store, setStore] = useRecoilState(storeGetData);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const DataStoreInfo = useQuery(queryKey.STOREINFO, getStoreInfo, {
    onSuccess: (data) => {
      setStore(data);
    }, //쿼리요청 성공하면 리턴받은값으로 리코일 갱신 ..하고싶
  });
  console.log('datasroeInfo query', DataStoreInfo.data);
  // useEffect(() => {
  //   //가게 정보 get을 통해서 1회 받고 리코일에 저장하기
  //   //axios 어쩌구
  //   setStore(dummyStore); //쿼리요청되고 리코일 갱신되면 이 useEffect지워도 될듯
  // }, [setStore]);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={[styles.flex, {paddingTop: insets.top}]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>가게 관리</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StoreEdit')}>
            <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>편집</Text>
          </TouchableOpacity>
        </View>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission')}
          toggleReview={() => navigation.navigate('StoreReview')}
          storeStatus={0}
        />
        <StoreInfo />
      </SafeAreaView>
    </>
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
