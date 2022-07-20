import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreStackParamList} from '../../nav/StoreNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreMissionDetailCard} from '../../components/Store/StoreMissionDetailCard';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = StackScreenProps<StoreStackParamList, 'StoreMissionDetail'>;

const dummyMission = [
  {
    missionId: 111,
    name: '박승민',
    phone: '1',
    point: 500,
    successDate: '2022-07-20T07:00:53.085Z',
  },
  {
    missionId: 112,
    name: '박승민',
    phone: '2',
    point: 500,
    successDate: '2022-07-20T07:00:53.085Z',
  },
  {
    missionId: 113,
    name: '박승민',
    phone: '12331231',
    point: 500,
    successDate: '2022-07-20T07:00:53.085Z',
  },
  {
    missionId: 114,
    name: '박승민',
    phone: '4',
    point: 500,
    successDate: '2022-07-20T07:00:53.085Z',
  },
  {
    missionId: 115,
    name: '박승민',
    phone: '5',
    point: 500,
    successDate: '2022-07-20T07:00:53.085Z',
  },
];

const StoreMissionDetail = ({navigation, route}: Props) => {
  const missionList = route.params.missionId; //이 미션 아이디로 get 하기.

  return (
    <>
      <View style={{flex: 0, backgroundColor: 'white'}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap, {marginBottom: 8}]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={[DesignSystem.title4Md, {color: 'black'}]}>상세정보</Text>
          <Icon name="arrow-left" size={24} color="black" style={{opacity: 0}} />
        </View>

        <FlatList
          contentContainerStyle={{backgroundColor: '#F8F8F8'}}
          scrollEventThrottle={10}
          data={dummyMission}
          renderItem={({item}) => (
            <StoreMissionDetailCard
              missionId={item.missionId}
              name={item.name}
              successDate={item.successDate}
              point={item.point}
              phone={item.phone}
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
  missionStopText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard-SemiBold',
    color: '#C8C8C8',
  },
});
