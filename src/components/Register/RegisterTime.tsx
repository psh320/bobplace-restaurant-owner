import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../../data';
import {CheckBoxRectangle} from '../common/CheckBoxRectangle';
import {OperationTimeModal} from '../../modal';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {storeData, storeGetData} from '../../state';

type RegisterTimeProps = {
  get?: number; //1이면 가게관리에서 수정하는거. 처음registser할땐 값 안넘김
};

const MapIndexToDay = ['월', '화', '수', '목', '금', '토', '일'];

const processTime = (time: string) => {
  return time.slice(undefined, 5);
};

export const RegisterTime: FC<RegisterTimeProps> = ({get}) => {
  const [operationTimeModal, setOperationTimeModal] = useState(false);
  // const [operationTime, setOperationTime] = useState<OperationTime[]>(registerData.operationTimeVO);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [RCstoreData, setRCstoreData] = useRecoilState(storeData);
  const [RCstoreGetData, setRCstoreGetData] = useRecoilState(storeGetData);

  // useEffect(() => {
  //   setOperationTime(registerData.operationTimeVO);
  // }, [registerData]);
  const renderedTimeTable = () => {
    return (
      <>
        {RCstoreData.operationTimeVO.map((item, index) => {
          if (item.hasOperationTime) {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#FFFFFF'}]} key={index}>
                <View style={[styles.checkboxWrap]}>
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = {...RCstoreData};
                      tempData.operationTimeVO[index].hasOperationTime = !item.hasOperationTime;
                      setRCstoreData(tempData);
                    }}
                    isChecked={item.hasOperationTime}
                  />
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <TouchableOpacity
                    style={{height: 50, justifyContent: 'center'}}
                    onPress={() => {
                      setDayIndex(index);
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
              <View style={[styles.tableContainer, {backgroundColor: '#F5F5F5'}]} key={index}>
                <View style={[styles.checkboxWrap]}>
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = {...RCstoreData};
                      tempData.operationTimeVO[index].hasOperationTime = !item.hasOperationTime;
                      setRCstoreData(tempData);
                    }}
                    isChecked={item.hasOperationTime}
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

  const renderedTimeTableGet = () => {
    return (
      <>
        {RCstoreGetData.operationTimeRes.map((item, index) => {
          if (!item.hasOperationTime) {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#FFFFFF'}]} key={index}>
                <View style={[styles.checkboxWrap]}>
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = {...RCstoreGetData};
                      tempData.operationTimeRes[index].hasOperationTime = !item.hasOperationTime;
                      setRCstoreGetData(tempData);
                    }}
                    isChecked={item.hasOperationTime}
                  />
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <TouchableOpacity
                    style={{height: 50, justifyContent: 'center'}}
                    onPress={() => {
                      setDayIndex(index);
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
              <View style={[styles.tableContainer, {backgroundColor: '#F5F5F5'}]} key={index}>
                <View style={[styles.checkboxWrap]}>
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = {...RCstoreGetData};
                      tempData.operationTimeRes[index].hasOperationTime = !item.hasOperationTime;
                      setRCstoreGetData(tempData);
                    }}
                    isChecked={item.hasOperationTime}
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>운영시간</Text>
        <Text style={{color: '#6C69FF'}}> * </Text>
      </View>
      <View style={[styles.columnWrap]}>
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
      {/* {renderedTimeTable()} */}
      {get === 1 ? renderedTimeTableGet() : renderedTimeTable()}
      {get === 1 ? (
        <OperationTimeModal
          visible={operationTimeModal}
          closeOperationTimeModal={() => setOperationTimeModal(false)}
          index={dayIndex}
          item={RCstoreGetData.operationTimeRes[dayIndex]}
        />
      ) : (
        <OperationTimeModal
          visible={operationTimeModal}
          closeOperationTimeModal={() => setOperationTimeModal(false)}
          index={dayIndex}
          item={RCstoreData.operationTimeVO[dayIndex]}
        />
      )}
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
  checkboxWrap: {
    flex: 0.22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnWrap: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
});
