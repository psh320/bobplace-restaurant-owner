import React, { useEffect } from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Colors} from 'react-native-paper';
import {IMission} from '../../data/IMissions';
import { DesignSystem } from '../../assets/DesignSystem';


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
          <Text style={[DesignSystem.body2Lt, {color: '#E03D32'}]}>성공요청 • {timeForToday(nowDate, new Date("2022-07-16T15:16:39.528Z"))}</Text>
          <Text style={[DesignSystem.title3SB, DesignSystem.grey14]}>{userName}</Text>
        </View>
        <View style={[styles.missionBox]}>
          <Text style={[DesignSystem.title4Md, {color: 'black'}]}>{mission} </Text>
            <Text style={[DesignSystem.body1Lt, {color: 'black'}]}>결제시 </Text>
            <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
        </View>
        <View style={[styles.missionTwoButton]}>
          <TouchableOpacity style={[styles.missionButtonDeny, {width: buttonWidth}]} onPress={handleDeny}>
            <View >
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>거절</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.missionButtonAccept, {width: buttonWidth}]} onPress={handleAccept}>
            <View>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>수락</Text>
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
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  missionCard: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  nameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: '#DFDFDF',
    paddingBottom: 10,
    marginBottom: 16,
  },
  missionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionTwoButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  missionButtonDeny: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  missionButtonAccept: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C69FF',
  },
});
