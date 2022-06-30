import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MissionCardProps = {
  name: string;
  userId?: string;
  time: string;
  minCost: number;
  point: number;
  status?: string; //"start","request","onrequest","success", "review"
  // handleOnPress?: () => void;
};
export type MissionCardContentProps = {
  handleOnPress?: () => void;
  text: string;
  textColor?: string;
  cancelBgColor?: string;
  cancelTextColor?: string;
  bgColor?: string;
};

//prettier-ignore
export const MissionUserCard: FC<MissionCardProps> = ({name, time, minCost, point}) => {
    //const navigation = useNavigation();
    return (
    <View style={[styles.missionCardWrap]}>
      <TouchableOpacity onPress={() => {}} style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
            <View style={[styles.flexRow]}>
                <Icon name='chevron-right' size={18} style={[styles.hidden]}/>
                <Text style={[styles.nameText]}>{name}</Text>
                <Icon name='chevron-right' size={18}/>
            </View>
            <Text style={[styles.categoryText]}>{time}</Text>
          </View>
          <View style={[styles.seperateLine]} />
          <View>
            <Text>
              <Text style={[styles.costText]}>{minCost}원 이상</Text>
              <Text>의 식사시 </Text>
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
  },
  nameBox: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
  missionMain: {
    flex: 1,
    width: 303,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    borderWidth: 0.5,
    width: 303,
    borderColor: '#DFDFDF',
    marginBottom: 16,
  },
  nameText: {
    color: '#111111',
    fontSize: 16,
    marginBottom: 8,
    marginRight: 6,
    marginLeft: 6,
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
