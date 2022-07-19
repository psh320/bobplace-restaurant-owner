import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilState} from 'recoil';
import {DesignSystem} from '../../assets/DesignSystem';
import {RCprogressNow} from '../../state';

type switchProps = {
  missionWaiting: boolean;
};
function moveLeft(progressValue: Animated.Value) {
  Animated.timing(progressValue, {
    toValue: 2, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}
function moveRight(progressValue: Animated.Value) {
  Animated.timing(progressValue, {
    toValue: 68, //
    duration: 200, //
    useNativeDriver: false,
  }).start();
}

export const MissionSwitch: FC<switchProps> = ({missionWaiting}) => {
  const progressValue = useState(new Animated.Value(2))[0]; //
  const [progressNow, setProgressNow] = useRecoilState(RCprogressNow);

  useEffect(() => {
    if (progressNow) {
      moveLeft(progressValue);
    } else {
      moveRight(progressValue);
    }
  }, [progressNow]);
  const currentMissionWaiting = () => {
    return (
      <View style={[styles.missionAlarmWrap]}>
        <View style={[styles.missionBubbleCard]}>
          <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: '700'}}>
            성공요청 승인을 기다리고 있어요
          </Text>
        </View>
        <Icon name="menu-down" size={24} color="#6C69FF" style={[styles.bubbleIcon]} />
      </View>
    );
  };
  return (
    <View style={[styles.progressRow]}>
      {missionWaiting && progressNow && currentMissionWaiting()}
      <View style={[styles.progressToggle]}>
        <Animated.View
          style={
            progressNow
              ? [
                  styles.progressSwitch,
                  {width: 68, borderRadius: 21, transform: [{translateX: progressValue}]},
                ]
              : [
                  styles.progressSwitch,
                  {width: 68, borderRadius: 21, transform: [{translateX: progressValue}]},
                ]
          }
        />
        <TouchableOpacity
          onPress={() => {
            setProgressNow(true);
            moveLeft(progressValue);
          }}
        >
          <View style={[styles.progressTextWrap]}>
            <Text
              style={
                progressNow
                  ? [DesignSystem.title4Md, {color: 'white'}]
                  : [DesignSystem.body2Lt, {color: '#616161'}]
              }
            >
              진행중
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setProgressNow(false);
            moveRight(progressValue);
          }}
        >
          <View style={[styles.progressTextWrap]}>
            <Text
              style={
                progressNow ? [{fontSize: 14, color: '#616161'}] : [{fontSize: 14, color: 'white'}]
              }
            >
              성공요청
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressRow: {
    position: 'absolute',
    bottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  progressToggle: {
    flexDirection: 'row',
    borderRadius: 17.5,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    width: 138,
    height: 34,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
  },
  progressSwitch: {
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
  },
  progressTextWrap: {
    height: '100%',
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionAlarmWrap: {
    poistion: 'absolute',
    left: 40,
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionBubbleCard: {
    width: 180,
    height: 36,
    backgroundColor: '#6C69FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleIcon: {
    position: 'absolute',
    top: 25,
  },
});
