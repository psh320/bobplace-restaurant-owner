import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';

export type MissionCardProps = {
  name: string;
  userId?: string;
  time?: string;
  minCost: number;
  point: number;
  status?: string; //"start","request","onrequest","success", "review"
  // handleOnPress?: () => void;
};

//prettier-ignore
export const MissionAcceptCard: FC<MissionCardProps> = ({name, time, minCost, point}) => {

  function handleDeny() {
    //성공요청 버튼 누를 시
    console.log('거절');
    // 사장님께 전송 -> 사장님이 확인->
  }
  function handelAccept() {
    //성공 버튼 누를 시
    console.log('성공');
  }

  return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
          <View style={[styles.nameBox]}>
            <Text style={[styles.requestText]}>성공요청</Text>
            <Text style={[styles.nameText]}>{name}</Text>
          </View>
          <View style={[styles.missionBox]}>
            <Text style={[styles.costText]}>{minCost}원 이상</Text>
            <Text style={[styles.normalText]}>의 식사시 </Text>
            <Text style={[styles.pointText]}>{point}P 적립</Text>
          </View>
        <View style={[styles.missionTwoButton]}>
            <TouchableOpacity style={[styles.missionButtonDeny]} onPress={handleDeny}>
            <View >
                <Text style={{fontSize: 16, color: '#616161', lineHeight:24}}>거절</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.missionButtonAccept]} onPress={handelAccept}>
            <View>
                <Text style={{color:'#6C69FF', fontSize: 16, lineHeight:24}}>수락</Text>
            </View>
            </TouchableOpacity>
         </View>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'center',
  },
  missionCard: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center', //
  },
  nameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: '#DFDFDF',
    marginBottom: 16,
  },
  missionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  requestText: {color: '#E03D32', fontSize: 12, lineHeight: 14, marginBottom: 4},
  nameText: {
    color: '#111111',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 16,
  },
  costText: {
    color: '#111111',
    fontSize: 16,
    lineHeight: 24,
  },
  normalText: {color: '#111111', fontSize: 16, lineHeight: 24},
  pointText: {
    color: '#6C69FF',
    fontSize: 16,
    lineHeight: 24,
  },

  missionTwoButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  missionButtonDeny: {
    width: 147,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  missionButtonAccept: {
    width: 147,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C69FF',
  },
  missionButtonView: {
    borderWidth: 2,
  },
});
