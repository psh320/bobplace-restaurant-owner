import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import {TimeList} from '../data/TimeList';

type OperationTimeModalProps = {
  visible: boolean;
  closeOperationTimeModal: () => void;
  index: number;
  item: OperationTime;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
};

export const OperationTimeModal: FC<OperationTimeModalProps> = ({
  visible,
  closeOperationTimeModal,
  index,
  item,
  setRegisterData,
  registerData,
}) => {
  const submitChangedDate = () => {
    const tempData = {...registerData};
    if (
      item.startTime === '00:00:00' &&
      item.endTime === '00:00:00' &&
      item.breakStartTime === '00:00:00' &&
      item.breakEndTime === '00:00:00'
    ) {
      tempData.operationTimeVO.map((data, key) => {
        tempData.operationTimeVO[key].breakEndTime = operationData.breakEndTime;
        tempData.operationTimeVO[key].breakStartTime = operationData.breakStartTime;
        tempData.operationTimeVO[key].endTime = operationData.endTime;
        tempData.operationTimeVO[key].startTime = operationData.startTime;
      });
    }

    tempData.operationTimeVO[index] = operationData;
    setRegisterData(tempData);
    closeOperationTimeModal();
  };
  const [operationData, setOperationData] = useState<OperationTime>(
    registerData.operationTimeVO[index],
  );
  useEffect(() => {
    setOperationData(registerData.operationTimeVO[index]);
  }, [index, registerData.operationTimeVO]);
  console.log('OPERATION TIME', operationData);
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
            onPress={closeOperationTimeModal}
            style={{position: 'absolute', top: 16, right: 16}}
          >
            <View style={{width: 24, height: 24}}>
              <Icon name="close" size={24} color="#111111" />
            </View>
          </TouchableOpacity>

          <View style={{width: '100%', marginTop: 28}}>
            <Text style={{fontSize: 16, lineHeight: 22, marginBottom: 8}}>영업시간</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(itemValue: string) => {
                  const tempData = {...operationData};
                  tempData.startTime = itemValue;
                  setOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={operationData.startTime}
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
                  const tempData = {...operationData};
                  tempData.endTime = itemValue;
                  setOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={operationData.endTime}
                items={TimeList}
                //Picker Select library에 가서 Icon type을 React.ReactNode | (()=>JSX.element) 로 설정 해줘야 빨간줄 안뜸
                Icon={() => {
                  return <Icon name="chevron-down" size={24} />;
                }}
              />
            </View>
          </View>

          <View style={{width: '100%', marginTop: 18}}>
            <Text style={{fontSize: 16, lineHeight: 22, marginBottom: 8}}>브레이크 타임</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(itemValue: string) => {
                  const tempData = {...operationData};
                  tempData.breakStartTime = itemValue;
                  setOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={operationData.breakStartTime}
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
                  const tempData = {...operationData};
                  tempData.breakEndTime = itemValue;
                  setOperationData(tempData);
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                value={operationData.breakEndTime}
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
    width: '100%',
    height: 44,
    color: '#000000',
    borderColor: '#DFDFDF',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
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
