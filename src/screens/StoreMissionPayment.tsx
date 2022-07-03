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

type Props = StackScreenProps<StoreStackParamList, 'StoreMissionPayment'>;

const dummyPurchase = {
  userName: '박승민',
  purchaseDate: '2022.02.02 월요일 12:07:13',
  point: 500,
  purchaseId: 1223,
};

const StoreMissionPayment = ({navigation, route}: Props) => {
  const insets = useSafeAreaInsets();
  const missionList = route.params.purchaseId; //이 미션 아이디로 get 하기.
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
          <Text style={[styles.screenHeaderTitle]}>결제 취소 요청</Text>
          <Icon name="arrow-left" size={24} color="black" style={{opacity: 0}} />
        </View>
        <View style={[styles.missionCard]}>
          <View style={[styles.cancelWrap]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('StoreMissionPayment', {purchaseId: purchaseId});
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                  width: '100%',
                }}
              >
                <Text style={[styles.normalText]}>상세정보</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.seperateLine]} />

          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>고객명</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.userName}</Text>
          </View>
          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>결제일</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.purchaseDate}</Text>
          </View>
          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>포인트</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.point}P</Text>
          </View>
          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>구분번호</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.purchaseId}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default StoreMissionPayment;

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

  missionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    padding: 16,
  },
  cancelWrap: {justifyContent: 'center', alignItems: 'flex-start'},
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#DFDFDF',
    marginBottom: 12,
  },
  nameText: {
    fontFamily: 'Pretendard-Medium',
    color: '#111111',
    fontSize: 16,
    lineHeight: 24,
  },
  fieldText: {
    fontFamily: 'Pretendard-Light',
    color: '#616161',
    fontSize: 16,
    lineHeight: 24,
  },
  cancelText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard-Light',
    color: '#949494',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
  },

  normalText: {fontFamily: 'Pretendard-Medium', color: '#111111', fontSize: 16, lineHeight: 24},
});
