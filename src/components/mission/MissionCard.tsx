import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreStackParamList} from '../../nav';
import {StackNavigationProp} from '@react-navigation/stack';

type MissionCardProps = {
  storeName: string;
  storeId: string;
  category: string;
  mission: string;
  point: number;
  isPresent: boolean;
  navigation: StackNavigationProp<StoreStackParamList, 'StoreMission', undefined>;
};

//prettier-ignore
export const MissionCard: FC<MissionCardProps> = ({storeName, storeId, category, mission, point, isPresent, navigation}) => {
    return (
        <View style={[styles.missionCardWrap]}>
        <TouchableOpacity onPress={() => {navigation.navigate('StoreMissionDetail', {missionId: storeId})}} >
          <View style={[styles.missionCard]}>
          <View style={[styles.nameBox]}>
            <Text style={[isPresent ? styles.ongoingText : styles.stoppedText]}>{isPresent ? '배포중' : '배포중지' }</Text>
            <Text style={[styles.nameText]}>{storeName}</Text>
            <Text style={[styles.categoryText]}>{category}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View>
            <Text>
              <Text style={[styles.costText]}>{mission}</Text>
              <Text style={[styles.normalText]}>의 식사시 </Text>
              <Text style={[styles.pointText]}>{point}P 적립</Text>
            </Text>
          </View>
          </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {marginLeft: 16, marginRight: 16},
  missionCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center', //
    borderColor: '#EFEFEF',
    borderWidth: 1,
    padding: 16,
    width: '100%',
  },
  nameBox: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},

  seperateLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#DFDFDF',
    marginBottom: 16,
  },
  ongoingText: {
    fontFamily: 'Pretendard-Medium',
    color: '#6C69FF',
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 4,
  },
  stoppedText: {
    fontFamily: 'Pretendard-Medium',
    color: '#ff6969',
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 4,
  },
  nameText: {
    fontFamily: 'Pretendard-Medium',
    color: '#111111',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 16,
  },
  costText: {
    color: '#111111',
    fontSize: 16,
  },
  normalText: {color: '#111111', fontSize: 16, lineHeight: 24},
  pointText: {
    color: '#6C69FF',
    fontSize: 16,
  },
  missionOneButton: {
    height: 48,
    width: '100%',
    backgroundColor: 'black',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  missionTwoButton: {
    flexDirection: 'row',
    height: 48,
  },
  missionButtonView: {
    borderWidth: 2,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  hidden: {opacity: 0},
});
