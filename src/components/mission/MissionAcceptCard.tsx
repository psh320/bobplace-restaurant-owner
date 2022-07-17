import React, { useEffect } from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Colors} from 'react-native-paper';
import {IMission} from '../../data/IMissions';


//prettier-ignore
export const MissionAcceptCard: FC<IMission> = ({date, mission, missionId, point, userId, userName}) => {
  const nowDate = new Date();
  function timeForToday(now: any, cutomerTime: any) {
    const betweenTime = Math.floor((now.getTime() - cutomerTime.getTime()) / 1000 / 60);
    if (betweenTime < 1) {return '방금 전';}
    else if (betweenTime < 60) {
        return `${betweenTime}분 전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간 전`;
    }
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일 전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  }
  function handleDeny() {
    //거절요청 버튼 누를 시
    console.log('거절');
  }
  function handleAccept() {
    //수락 버튼 누를 시
    console.log('수락');
  }
  const buttonWidth = (Dimensions.get('screen').width - 66 - 15 ) / 2;

  return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
          <View style={[styles.nameBox]}>
            <Text>
              <Text style={[styles.requestText]}>성공요청 • </Text>
              <Text style={[styles.requestText]}>{timeForToday(nowDate, new Date("2022-07-16T15:16:39.528Z"))}</Text>
            </Text>
            <Text style={[styles.nameText]}>{userName}</Text>
          </View>
          <View style={[styles.missionBox]}>
            <Text style={[styles.costText]}>{mission}</Text>
            <Text style={[styles.normalText]}>의 식사시 </Text>
            <Text style={[styles.pointText]}>{point}P 적립</Text>
          </View>
        <View style={[styles.missionTwoButton]}>
            <TouchableOpacity style={[styles.missionButtonDeny, {width: buttonWidth}]} onPress={handleDeny}>
              <View >
                <Text style={{fontSize: 16, color: '#616161', lineHeight:24}}>거절</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.missionButtonAccept, {width: buttonWidth}]} onPress={handleAccept}>
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
    marginBottom: 12,
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
    // width: 147,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  missionButtonAccept: {
    // width: 147,
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
