import React, {FC, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type switchProps = {
  progressnow: boolean;
  setProgressnow: any;
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

export const MissionSwitch: FC<switchProps> = ({progressnow, setProgressnow, missionWaiting}) => {
  const progressValue = useState(new Animated.Value(2))[0]; //

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
      {missionWaiting && progressnow && currentMissionWaiting()}
      <View style={[styles.progressToggle]}>
        <Animated.View
          style={
            progressnow
              ? [
                  styles.progressSwitch,
                  {width: 66, borderRadius: 21, transform: [{translateX: progressValue}]},
                ]
              : [
                  styles.progressSwitch,
                  {width: 66, borderRadius: 21, transform: [{translateX: progressValue}]},
                ]
          }
        />
        <TouchableOpacity
          onPress={() => {
            setProgressnow(true);
            moveLeft(progressValue);
          }}
        >
          <View style={[styles.progressTextWrap]}>
            <Text
              style={
                progressnow ? [{fontSize: 14, color: 'white'}] : [{fontSize: 14, color: '#616161'}]
              }
            >
              진행중
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setProgressnow(false);
            moveRight(progressValue);
          }}
        >
          <View style={[styles.progressTextWrap]}>
            <Text
              style={
                progressnow ? [{fontSize: 14, color: '#616161'}] : [{fontSize: 14, color: 'white'}]
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
    width: '100%',
    position: 'absolute',
    bottom: 15,
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
    borderColor: '#E8E8E8',
    borderWidth: 1,
    width: 138,
    height: 34,
    backgroundColor: '#FFFFFF',
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
