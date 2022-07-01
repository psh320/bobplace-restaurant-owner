import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {OperationTime} from '../../data';
import {CheckBoxRectangle} from '../common/CheckBoxRectangle';

type RegisterTimeProps = {
  operationData: OperationTime[];
};

const MapIndexToDay = ['월', '화', '수', '목', '금', '토', '일'];

const processTime = (time: string) => {
  return time.slice(undefined, 5);
};

export const StoreTime: FC<RegisterTimeProps> = ({operationData}) => {
  const renderedTimeTable = () => {
    return (
      <>
        {operationData.map((item, index) => {
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
                  <CheckBoxRectangle title={MapIndexToDay[index]} isChecked={item.isOpen} />
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <View style={{height: 50, justifyContent: 'center'}}>
                    <Text>
                      {processTime(item.startTime)}~{processTime(item.endTime)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <View style={{height: 50, justifyContent: 'center'}}>
                    <Text>
                      {processTime(item.breakStartTime)}~{processTime(item.breakEndTime)}
                    </Text>
                  </View>
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
                  <CheckBoxRectangle title={MapIndexToDay[index]} isChecked={item.isOpen} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  TimeWrap: {
    marginTop: 20,
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
