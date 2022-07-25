import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreStackParamList} from '../../nav';
import {StackNavigationProp} from '@react-navigation/stack';
import {DesignSystem} from '../../assets/DesignSystem';
import {dayofweekType} from '../../data/IMissions';

type StoreMissionDetailCardProps = {
  dayOfWeek: string;
  missionId: number;
  name: string;
  phone: string;
  point: number;
  successDate: string;
  navigation: StackNavigationProp<StoreStackParamList, 'StoreMissionDetail', undefined>;
};

export const StoreMissionDetailCard: FC<StoreMissionDetailCardProps> = ({
  dayOfWeek,
  missionId,
  name,
  phone,
  point,
  successDate,
  navigation,
}) => {
  const DAYOFWEEK: dayofweekType = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };
  console.log('sdfasf', successDate);
  return (
    <View style={[styles.missionCard]}>
      <View style={[styles.cancelWrap]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StoreMissionPayment', {
              // dayOfWeek: dayOfWeek,
              missionId: missionId,
              name: name,
              successDate: successDate,
              point: point,
              phone: phone,
            });
          }}
        >
          <View style={[styles.cancelTextWrap]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>적립취소</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.seperateLine]} />

      <View style={[styles.infoRow]}>
        <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>고객명</Text>
        <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{name}</Text>
      </View>
      <View style={[styles.infoRow]}>
        <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>결제일</Text>
        <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>
          {successDate.slice(0, 4)}.{successDate.slice(5, 7)}.{successDate.slice(8, 10)}{' '}
          {DAYOFWEEK[dayOfWeek]}요일 {successDate.slice(11, 19)}
        </Text>
      </View>
      <View style={[styles.infoRow]}>
        <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>포인트</Text>
        <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{point}P</Text>
      </View>
      <View style={[styles.infoRow]}>
        <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>구분번호</Text>
        <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCard: {
    backgroundColor: 'white',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cancelWrap: {justifyContent: 'center', alignItems: 'flex-end'},
  cancelTextWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#DFDFDF',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
  },
});
