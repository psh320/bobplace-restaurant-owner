import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StoreStackParamList} from '../../nav';
import {StackNavigationProp} from '@react-navigation/stack';
import {DesignSystem} from '../../assets/DesignSystem';
import {patchMissionActive, patchMissionStop} from '../../api/store';

type StoreMissionCardProps = {
  category: string;
  mission: string;
  missionGroupId: number;
  missionGroupStatus: string;
  name: string;
  point: number;
  navigation: StackNavigationProp<StoreStackParamList, 'StoreMission', undefined>;
  setMissionManageModal: (type: string) => void;
};

//prettier-ignore
export const StoreMissionCard: FC<StoreMissionCardProps> = ({category, mission, missionGroupId, missionGroupStatus, name, point, navigation, setMissionManageModal}) => {
  const closeMission = () => {
    console.log('배포 중지!');
    setMissionManageModal('STOP');
  };
  const reopenMission = () => {
    console.log('재배포 요청 !!');
    setMissionManageModal('ACTIVE');
  };
  return (
    <View style={[styles.missionCardWrap]}>
      <TouchableOpacity onPress={() => {navigation.navigate('StoreMissionDetail', {missionId: missionGroupId})}} >
        <View style={[styles.missionCard]}>
          <View style={[styles.nameBox]}>
            <Text style={[DesignSystem.caption1Lt, {color: missionGroupStatus === 'ACTIVE' ? '#6C69FF' : '#E24C44'}]}>
              {missionGroupStatus === 'ACTIVE' ? '배포중' : '배포중지' }
            </Text>
            <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{name}</Text>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey10]}>{category}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View>
            <Text>
              <Text style={[DesignSystem.title4Md, {color: 'black'}]}>{mission} </Text>
              <Text style={[DesignSystem.body1Lt, {color: 'black'}]}>결제시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.openBtnWrap]}
            onPress={missionGroupStatus === 'ACTIVE' ? () => closeMission(missionGroupId) : () => reopenMission(missionGroupId)}
          >
            <Text style={[DesignSystem.h3SB, DesignSystem.grey8]}>{missionGroupStatus === 'ACTIVE' ? '배포 중지 요청' : '재배포 요청' }</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  missionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  nameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  seperateLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#DFDFDF',
    marginBottom: 10,
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
  openBtnWrap: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
});
