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
import {MissionDetailCard} from '../components/mission/MissionDetailCard';

type Props = StackScreenProps<StoreStackParamList, 'StoreMissionDetail'>;

const dummyMission = [
  {
    userName: '박승민',
    purchaseTime: '12:07 AM',
    purchaseDate: '12/03/22',
    point: 500,
    purchaseId: 1234,
  },
  {
    userName: '박승민',
    purchaseTime: '12:07 AM',
    purchaseDate: '12/03/22',
    point: 500,
    purchaseId: 1234,
  },
  {
    userName: '박승민',
    purchaseTime: '12:07 AM',
    purchaseDate: '12/03/22',
    point: 500,
    purchaseId: 1234,
  },
  {
    userName: '박승민',
    purchaseTime: '12:07 AM',
    purchaseDate: '12/03/22',
    point: 500,
    purchaseId: 1234,
  },
  {
    userName: '박승민',
    purchaseTime: '12:07 AM',
    purchaseDate: '12/03/22',
    point: 500,
    purchaseId: 1234,
  },
];

const StoreMissionDetail = ({navigation, route}: Props) => {
  const insets = useSafeAreaInsets();
  const missionList = route.params.missionId; //이 미션 아이디로 get 하기.
  return (
    <>
      <View style={{backgroundColor: '#FFFFFF', height: insets.top}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={[styles.screenHeaderTitle]}>상세정보</Text>
          <Icon name="arrow-left" size={24} color="black" style={{opacity: 0}} />
        </View>

        <FlatList
          contentContainerStyle={{backgroundColor: '#F8F8F8', marginTop: 8}}
          scrollEventThrottle={10}
          data={dummyMission}
          renderItem={({item}) => (
            <MissionDetailCard
              userName={item.userName}
              point={item.point}
              purchaseDate={item.purchaseDate}
              purchaseId={item.purchaseId}
              navigation={navigation}
            />
          )}
          ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{margin: 20}}
        />
      </View>
    </>
  );
};

export default StoreMissionDetail;

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
    marginTop: 8,
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
});
