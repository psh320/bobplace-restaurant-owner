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
    userId: '0',
    category: '중식당',
    mission: '10000원 이상',
    point: 500,
    isPresent: true,
  },
  {
    storeName: '중화반점은 홍콩반점',
    userId: '1',
    category: '중식당',
    mission: '대표메뉴 짜장면',
    point: 500,
    isPresent: true,
  },
  {
    storeName: '한강 왜 가냐 라면 먹지',
    userId: '2',
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
          <Text>현재 </Text>
          <Text>{numberOfUsers}명</Text>
          <Text>의 유저가 미션을 진행하고 있습니다</Text>
        </View>

        <FlatList
          contentContainerStyle={{flex: 1, backgroundColor: '#F8F8F8', marginTop: 12}}
          scrollEventThrottle={10}
          data={dummyMission}
          renderItem={({item}) => (
            <MissionCard
              storeName={item.storeName}
              category={item.category}
              mission={item.mission}
              point={item.point}
              isPresent={item.isPresent}
            />
          )}
          ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
        />
      </View>
    </>
  );
};

export default StoreMission;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
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
});
