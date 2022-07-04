import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

type MissionUserCardProps = {
  name: string;
  userId?: string;
  time: string;
  minCost: number;
  point: number;
};

//prettier-ignore
export const MissionUserCard: FC<MissionUserCardProps> = ({name, userId, time, minCost, point}) => {
    //const navigation = useNavigation();
    return (
    <View style={[styles.missionCardWrap]}>
      <TouchableOpacity onPress={() => {}} style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
              <Text style={[styles.timeText]}>{time.slice(0,5)} 시작</Text>
              <Text style={[DesignSystem.title3SB, {color: '#2A2A2A'}]}>{name}</Text>
              <Text style={[DesignSystem.body2Lt, {color: '#616161', marginBottom: 6}]}>{userId}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View>
            <Text>
              <Text style={[styles.costText]}>{minCost}원 이상</Text>
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
    height: 145,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center', //
    borderColor: '#EFEFEF',
    borderWidth: 1,
    marginBottom: 12,
  },
  nameBox: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
  timeText: {
    fontSize: 14,
    color: '#6C69FF',
    marginBottom: 6,
  },
  missionMain: {
    flex: 1,
    width: 303,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    height: 0.5,
    width: 303,
    backgroundColor: '#DFDFDF',
    marginBottom: 16,
  },
  costText: {
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },
  normalText: {
    fontWeight: '300',
    color: '#111111',
    fontSize: 16,
  },
  pointText: {
    fontWeight: '500',
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
