import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StoreMenuBar} from '../../components/Store/StoreMenuBar';
import {StoreInfo} from '../../components/Store/StoreInfo';
import {useNavigation} from '@react-navigation/native';
import {editOperationTime, storeData} from '../../state';
import {useRecoilState} from 'recoil';
import {DesignSystem} from '../../assets/DesignSystem';
import {queryKey} from '../../api/queryKey';
import {getOperationTime, getStoreInfo} from '../../api/store';
import {useQuery} from 'react-query';

const Store = () => {
  const [store, setStore] = useRecoilState(storeData);
  const [storeTime, setStoreTime] = useRecoilState(editOperationTime);
  const navigation = useNavigation();
  const DataStoreInfo = useQuery(queryKey.STOREINFO, getStoreInfo, {
    onSuccess: (data) => {
      setStore(data);
    },
  });
  const OperationTimeData = useQuery(queryKey.OPERATIONTIME, getOperationTime, {
    onSuccess: (data) => {
      setStoreTime(data);
    },
  });

  console.log('datasroeInfo query', DataStoreInfo.data);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={[styles.flex]}>
        <StatusBar barStyle={'dark-content'} backgroundColor="white" />
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
