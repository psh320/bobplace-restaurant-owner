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

type Props = StackScreenProps<StoreStackParamList, 'StoreMission'>;

const dummyMission = [
  {
    name: '김진범',
    userId: '0',
    time: '18:00:12',
    minCost: 10000,
    point: 500,
  },
  {
    name: '이예진',
    userId: '1',
    time: '14:01:23',
    minCost: 10000,
    point: 500,
  },
  {
    name: '박성호',
    userId: '2',
    time: '12:21:14',
    minCost: 10000,
    point: 500,
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
            <MissionUserCard
              name={item.name}
              time={item.time}
              minCost={item.minCost}
              point={item.point}
              status="start"
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
