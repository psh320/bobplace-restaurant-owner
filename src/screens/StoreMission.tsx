import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MissionUserCard} from '../components/mission/MissionUserCard';
import {StoreMenuBar} from '../components/Store/StoreMenuBar';
import {StoreInfo} from '../components/Store/StoreInfo';
import {useNavigation} from '@react-navigation/native';

import {StoreStackParamList} from '../nav/StoreNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {MissionCard} from '../components/mission/MissionCard';

type Props = StackScreenProps<StoreStackParamList, 'StoreMission'>;

const dummyMission = [
  {
    storeName: '마라탕집',
    storeId: '0',
    category: '중식당',
    mission: '10000원 이상',
    point: 500,
    isPresent: true,
  },
  {
    storeName: '중화반점은 홍콩반점',
    storeId: '1',
    category: '중식당',
    mission: '대표메뉴 짜장면',
    point: 500,
    isPresent: true,
  },
  {
    storeName: '한강 왜 가냐 라면 먹지',
    storeId: '2',
    category: '중식당',
    mission: '대표메뉴 라면',
    point: 500,
    isPresent: false,
  },
];

const StoreMission = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();

  const numberOfUsers = dummyMission.length;

  return (
    <>
      <View style={{backgroundColor: '#FFFFFF', height: insets.top}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[styles.screenHeaderTitle]}>가게 관리</Text>
        </View>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission')}
          toggleReview={() => navigation.navigate('StoreReview')}
          storeStatus={1}
        />

        <View style={[styles.missionUserNumberWrap]}>
          <Text style={[styles.missionStatText]}>최근 7일 미션이 총 </Text>
          <Text style={[styles.missionStatPointText]}>{numberOfUsers}명</Text>
          <Text style={[styles.missionStatText]}> 에게 노출되었어요</Text>
        </View>

        <FlatList
          contentContainerStyle={{flex: 1, backgroundColor: '#F8F8F8', marginTop: 12}}
          scrollEventThrottle={10}
          data={dummyMission}
          renderItem={({item}) => (
            <MissionCard
              storeId={item.storeId}
              storeName={item.storeName}
              category={item.category}
              mission={item.mission}
              point={item.point}
              isPresent={item.isPresent}
              navigation={navigation}
            />
          )}
          ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
          ListFooterComponent={() => (
            <TouchableOpacity onPress={() => {}} style={[styles.missionStopButtonWrap]}>
              <View>
                <Text style={[styles.missionStopText]}>미션 중지 요청</Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponentStyle={styles.missionStopButtonContainer}
        />
      </View>
    </>
  );
};

export default StoreMission;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F6F6FA'},
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
  screenHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    lineHeight: 24,
  },
  missionStopText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard-SemiBold',
    color: '#C8C8C8',
  },
  missionStatText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Light',
    color: '#3F3F3F',
  },
  missionStatPointText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#6C69FF',
  },
  missionStopButtonWrap: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#C8C8C8',
    borderWidth: 1,
  },
  missionStopButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 16,
    marginRight: 16,
  },
});
