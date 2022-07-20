import React from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text, Dimensions} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {RCpressedMissionGroupId} from '../state';
import {patchMissionActive, patchMissionStop} from '../api/store';

type MissionManageModalProps = {
  type: string;
  closeMissionManageModal: () => void;
};
const BUTTONWIDTH = (Dimensions.get('screen').width - 72 - 17) / 2;

export const MissionManageModal: FC<MissionManageModalProps> = ({
  type,
  closeMissionManageModal,
}) => {
  const [pressedMissionGId, setPressedMissionGId] = useRecoilState(RCpressedMissionGroupId);

  const handleSubmitStopAll = () => {
    //서버에 미션중지 요청 post //아직 api가 없  ? ?
    closeMissionManageModal();
  };
  const handleSubmitStopOne = () => {
    //서버에 미션중지 요청 post
    patchMissionStop(pressedMissionGId);
    closeMissionManageModal();
  };
  const handleSubmitActive = () => {
    patchMissionActive(pressedMissionGId);
    closeMissionManageModal();
  };
  return (
    <>
      <Modal
        visible={type === 'STOPALL'}
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
      >
        <View style={styles.modalWrap}>
          <View style={styles.modalContainer}>
            <View style={styles.warningContainer}>
              <Text style={[DesignSystem.title1SB, DesignSystem.grey17, {marginBottom: 10}]}>
                미션 전체 중지 요청시 주의사항
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>
                현재까지 배포된 미션은 소멸되지 않으며, 모든 미션이 없어지기까지 최대 7일까지 소요될
                수 있습니다.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={closeMissionManageModal}>
                <View style={styles.buttonNo}>
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmitStopAll}>
                <View style={styles.buttonYes}>
                  <Text style={[DesignSystem.title4Md, {color: 'white'}]}>중지 요청</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* 하나만 중지 */}
      <Modal
        visible={type === 'STOP'}
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
      >
        <View style={styles.modalWrap}>
          <View style={styles.modalContainer}>
            <View style={styles.warningContainer}>
              <Text style={[DesignSystem.title1SB, DesignSystem.grey17, {marginBottom: 10}]}>
                하나 미션 중지 요청시 주의사항
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>
                현재까지 배포된 미션은 소멸되지 않으며, 모든 미션이 없어지기까지 최대 7일까지 소요될
                수 있습니다.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={closeMissionManageModal}>
                <View style={styles.buttonNo}>
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmitStopOne}>
                <View style={styles.buttonYes}>
                  <Text style={[DesignSystem.title4Md, {color: 'white'}]}>중지 요청</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* 재배포 요청 */}
      <Modal
        visible={type === 'ACTIVE'}
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
      >
        <View style={styles.modalWrap}>
          <View style={styles.modalContainer}>
            <View style={styles.warningContainer}>
              <Text style={[DesignSystem.title1SB, DesignSystem.grey17, {marginBottom: 10}]}>
                미션 재배포 요청시 주의사항
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>
                미션 재배포까지 최대 7일의 시간이 소요될 수 있습니다.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={closeMissionManageModal}>
                <View style={styles.buttonNo}>
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmitActive}>
                <View style={styles.buttonYes}>
                  <Text style={[DesignSystem.title4Md, {color: 'white'}]}>재배포 요청</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 16,
    paddingRight: 16,
  },
  warningContainer: {
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
  },
  buttonNo: {
    width: BUTTONWIDTH,
    paddingVertical: 12,
    borderColor: '#949494',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  buttonYes: {
    width: BUTTONWIDTH,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6C69FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
