import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {OperationTime} from '../data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import {TimeList} from '../data/TimeList';
import {useRecoilState} from 'recoil';
import {registerOperationTime} from '../state';
import {DesignSystem} from '../assets/DesignSystem';

type RegisterTimeModalProps = {
  visible: boolean;
  closeRegisterTimeModal: () => void;
  index: number;
};

export const RegisterTimeModal: FC<RegisterTimeModalProps> = ({
  visible,
  closeRegisterTimeModal,
  index,
}) => {
  const [registerTime, setRegisterTime] = useRecoilState(registerOperationTime);
  const [registerOperationData, setRegisterOperationData] = useState<OperationTime>(
    registerTime[index],
  );

  const submitChangedDate = () => {
    const tempData = [...registerTime];
    if (
      tempData[index].startTime === '00:00:00' &&
      tempData[index].endTime === '00:00:00' &&
      tempData[index].breakStartTime === '00:00:00' &&
      tempData[index].breakEndTime === '00:00:00'
    ) {
      tempData.map((data, key) => {
        tempData[key] = {
          ...tempData[key],
          breakEndTime: registerOperationData.breakEndTime,
          breakStartTime: registerOperationData.breakStartTime,
          startTime: registerOperationData.startTime,
          endTime: registerOperationData.endTime,
        };
      });
    }

    tempData[index] = {...registerOperationData};
    setRegisterTime(tempData);

    closeRegisterTimeModal();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            width: 330,
            height: 306,
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <TouchableOpacity
            onPress={closeRegisterTimeModal}
            style={{position: 'absolute', top: 16, right: 16}}
          >
            <View style={{width: 24, height: 24}}>
              <Icon name="close" size={24} color="#111111" />
            </View>
          </TouchableOpacity>

          <View style={{width: '100%', marginTop: 28}}>
            <Text style={[{fontSize: 16, lineHeight: 22, marginBottom: 8}, DesignSystem.grey17]}>
              영업시간
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(itemValue: string) => {
                  let tempData = {...registerOperationData};
                  tempData = {
                    ...tempData,
                    startTime: itemValue,
                  };
                  setRegisterOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={registerOperationData.startTime}
                items={TimeList}
                //Picker Select library에 가서 Icon type을 React.ReactNode | (()=>JSX.element) 로 설정 해줘야 빨간줄 안뜸
                Icon={() => {
                  return <Icon name="chevron-down" size={24} />;
                }}
              />
              <Text>~</Text>

              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(itemValue: string) => {
                  let tempData = {...registerOperationData};
                  tempData = {
                    ...tempData,
                    endTime: itemValue,
                  };
                  setRegisterOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={registerOperationData.endTime}
                items={TimeList}
                //Picker Select library에 가서 Icon type을 React.ReactNode | (()=>JSX.element) 로 설정 해줘야 빨간줄 안뜸
                Icon={() => {
                  return <Icon name="chevron-down" size={24} />;
                }}
              />
            </View>
          </View>

          <View style={{width: '100%', marginTop: 18}}>
            <Text style={[{fontSize: 16, lineHeight: 22, marginBottom: 8}, DesignSystem.grey17]}>
              브레이크 타임
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(itemValue: string) => {
                  let tempData = {...registerOperationData};
                  tempData = {
                    ...tempData,
                    breakStartTime: itemValue,
                  };
                  setRegisterOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={registerOperationData.breakStartTime}
                items={TimeList}
                //Picker Select library에 가서 Icon type을 React.ReactNode | (()=>JSX.element) 로 설정 해줘야 빨간줄 안뜸
                Icon={() => {
                  return <Icon name="chevron-down" size={24} />;
                }}
              />

              <Text>~</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(itemValue: string) => {
                  let tempData = {...registerOperationData};
                  tempData = {
                    ...tempData,
                    breakEndTime: itemValue,
                  };
                  setRegisterOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={registerOperationData.breakEndTime}
                items={TimeList}
                //Picker Select library에 가서 Icon type을 React.ReactNode | (()=>JSX.element) 로 설정 해줘야 빨간줄 안뜸
                Icon={() => {
                  return <Icon name="chevron-down" size={24} />;
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              submitChangedDate();
            }}
          >
            <View
              style={{
                width: '100%',
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 24,
                backgroundColor: '#6C69FF',
                borderRadius: 10,
              }}
            >
              <Text style={{fontSize: 16, lineHeight: 24, color: '#FFFFFF'}}>확인</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    width: 141,
    height: 48,
    borderRadius: 10,
    borderColor: '#949494',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    paddingLeft: 50,
  },
  inputAndroid: {
    fontSize: 14,
    width: 141,
    height: 48,
    color: '#000000',
    borderRadius: 10,
    borderColor: '#949494',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
  textinput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
