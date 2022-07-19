import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../data';

type MissionReopenModalProps = {
  visible: boolean;
  closeMissionReopenModal: () => void;
};

export const MissionReopenModal: FC<MissionReopenModalProps> = ({
  visible,
  closeMissionReopenModal,
}) => {
  const handleSubmit = () => {
    //서버에 미션중지 요청 post
    closeMissionReopenModal();
  };
  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View style={styles.modalWrap}>
        <View style={styles.modalContainer}>
          <View style={styles.warningContainer}>
            <Text style={styles.headText}>미션 재배포 요청시 주의사항</Text>
            <Text style={styles.fieldText}>
              미션 재배포까지 최대 7일의 시간이 소요될 수 있습니다.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={closeMissionReopenModal}>
              <View style={styles.buttonNo}>
                <Text style={styles.noText}>취소</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.buttonYes}>
                <Text style={styles.yesText}>재배포 요청</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  warningContainer: {
    justifyContent: 'center',
  },
  modalContainer: {
    width: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
  },
  headText: {
    fontFamily: 'Pretendard-Medium',
    color: '#111111',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 12,
  },
  fieldText: {
    flexWrap: 'wrap',
    fontFamily: 'Pretendard-Light',
    color: '#616161',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonNo: {
    width: 139,
    height: 48,
    borderColor: '#949494',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  noText: {color: '#616161', fontFamily: 'Pretendard-Regular', fontSize: 16, lineHeight: 24},
  buttonYes: {
    width: 139,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#6C69FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesText: {color: '#FFFFFF', fontFamily: 'Pretendard-Regular', fontSize: 16, lineHeight: 24},
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
