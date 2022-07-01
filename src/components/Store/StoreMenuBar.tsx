import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type StoreMenuBarProps = {
  toggleStore: () => void;
  toggleMission: () => void;
  toggleReview: () => void;
  storeStatus: number;
};

export const StoreMenuBar: FC<StoreMenuBarProps> = ({
  toggleStore,
  toggleMission,
  toggleReview,
  storeStatus,
}) => {
  return (
    <View style={[styles.ToggleWrap]}>
      <TouchableOpacity onPress={toggleStore} style={{flex: 0.33}}>
        <View style={[storeStatus === 0 ? styles.toggleButtonWrapOn : styles.toggleButtonWrapOff]}>
          <Text style={[storeStatus === 0 ? styles.toggleTextOn : styles.toggleTextOff]}>
            가게 정보
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMission} style={{flex: 0.33}}>
        <View style={[storeStatus === 1 ? styles.toggleButtonWrapOn : styles.toggleButtonWrapOff]}>
          <Text style={[storeStatus === 1 ? styles.toggleTextOn : styles.toggleTextOff]}>
            미션관리
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleReview} style={{flex: 0.33}}>
        <View style={[storeStatus === 2 ? styles.toggleButtonWrapOn : styles.toggleButtonWrapOff]}>
          <Text style={[storeStatus === 2 ? styles.toggleTextOn : styles.toggleTextOff]}>리뷰</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ToggleWrap: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  toggleButtonWrapOn: {
    height: '100%',
    borderBottomColor: '#6C69FF',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonWrapOff: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTextOff: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
  },
  toggleTextOn: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
  },
});
