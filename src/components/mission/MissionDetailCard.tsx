import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreStackParamList} from '../../nav';
import {StackNavigationProp} from '@react-navigation/stack';

type MissionDetailCardProps = {
  userName: string;
  point: number;
  purchaseDate: string;
  purchaseId: number;
  navigation: StackNavigationProp<StoreStackParamList, 'StoreMissionDetail', undefined>;
};

export const MissionDetailCard: FC<MissionDetailCardProps> = ({
  userName,
  point,
  purchaseDate,
  purchaseId,
  navigation,
}) => {
  return (
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
            <Text style={[styles.cancelText]}>결제취소</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.seperateLine]} />

      <View style={[styles.infoRow]}>
        <Text style={[styles.fieldText]}>고객명</Text>
        <Text style={[styles.normalText]}>{userName}</Text>
      </View>
      <View style={[styles.infoRow]}>
        <Text style={[styles.fieldText]}>결제일</Text>
        <Text style={[styles.normalText]}>{purchaseDate}</Text>
      </View>
      <View style={[styles.infoRow]}>
        <Text style={[styles.fieldText]}>포인트</Text>
        <Text style={[styles.normalText]}>{point}P</Text>
      </View>
      <View style={[styles.infoRow]}>
        <Text style={[styles.fieldText]}>구분번호</Text>
        <Text style={[styles.normalText]}>{purchaseId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCard: {
    backgroundColor: Colors.white,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    padding: 16,
  },
  cancelWrap: {justifyContent: 'center', alignItems: 'flex-end'},
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
