import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../../data';
import {CheckBoxRectangle} from '../common/CheckBoxRectangle';
import {OperationTimeModal} from '../../modal';

type RegisterTimeProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
};

const MapIndexToDay = ['월', '화', '수', '목', '금', '토', '일'];

const processTime = (time: string) => {
  return time.slice(undefined, 5);
};

export const RegisterTime: FC<RegisterTimeProps> = ({setRegisterData, registerData}) => {
  const [operationTimeModal, setOperationTimeModal] = useState(false);
  const [operationTime, setOperationTime] = useState<OperationTime>(
    registerData.operationTimeVO[0],
  );
  const [dayIndex, setDayIndex] = useState<number>(0);
  console.log(registerData);
  const renderedTimeTable = () => {
    return (
      <>
        {registerData.operationTimeVO.map((item, index) => {
          if (item.isOpen) {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#FFFFFF'}]}>
                <View
                  style={{
                    flex: 0.22,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = {...registerData};
                      tempData.operationTimeVO[index].isOpen = !item.isOpen;
                      setRegisterData(tempData);
                    }}
                    isChecked={item.isOpen}
                  />
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <TouchableOpacity
                    style={{height: 50, justifyContent: 'center'}}
                    onPress={() => {
                      setDayIndex(index);
                      setOperationTime(item);
                      setOperationTimeModal(true);
                    }}
                  >
                    <View>
                      <Text>
                        {processTime(item.startTime)}~{processTime(item.endTime)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <TouchableOpacity style={{height: 50, justifyContent: 'center'}}>
                    <View>
                      <Text>
                        {processTime(item.breakStartTime)}~{processTime(item.breakEndTime)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#F5F5F5'}]}>
                <View
                  style={{
                    flex: 0.22,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = {...registerData};
                      tempData.operationTimeVO[index].isOpen = !item.isOpen;
                      setRegisterData(tempData);
                    }}
                    isChecked={item.isOpen}
                  />
                </View>
                <View
                  style={{flex: 0.78, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <Text>휴무</Text>
                </View>
              </View>
            );
          }
        })}
      </>
    );
  };

  return (
    <View style={[styles.TimeWrap]}>
      <Text style={[styles.formHeadText]}>운영시간</Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          borderBottomColor: '#DFDFDF',
          borderBottomWidth: 1,
        }}
      >
        <View style={{flex: 0.22, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text>영업일</Text>
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text>영업 시간</Text>
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text>브레이크 타임</Text>
        </View>
      </View>
      {renderedTimeTable()}
      <OperationTimeModal
        visible={operationTimeModal}
        closeOperationTimeModal={() => setOperationTimeModal(false)}
        index={dayIndex}
        item={operationTime}
        registerData={registerData}
        setRegisterData={setRegisterData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TimeWrap: {
    marginTop: 24,
  },
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  tableContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
});
