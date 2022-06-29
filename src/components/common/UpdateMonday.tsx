import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RegisterStoreInterface} from '../../data';
import {CheckBoxRectangle} from '../common/CheckBoxRectangle';

type UpdateMondayProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
};

const processTime = (time: string) => {
  return time.slice(undefined, 5);
};

export const UpdateMonday: FC<UpdateMondayProps> = ({setRegisterData, registerData}) => {
  if (registerData.monday !== null) {
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
            title="월"
            onPress={() => {
              if (registerData.monday !== null) {
                setRegisterData({...registerData, monday: null});
              } else {
                setRegisterData({
                  ...registerData,
                  monday: {
                    breakEndTime: '00:00:00',
                    breakStartTime: '00:00:00',
                    startTime: '00:00:00',
                    endTime: '00:00:00',
                  },
                });
              }
            }}
            isChecked={registerData.monday !== null}
          />
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={{height: 50, justifyContent: 'center'}}>
            <View>
              <Text>
                {processTime(registerData.monday.startTime)}~
                {processTime(registerData.monday.endTime)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={{height: 50, justifyContent: 'center'}}>
            <View>
              <Text>
                {processTime(registerData.monday.breakStartTime)}~
                {processTime(registerData.monday.breakEndTime)}
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
            title="월"
            onPress={() => {
              if (registerData.monday !== null) {
                setRegisterData({...registerData, monday: null});
              } else {
                setRegisterData({
                  ...registerData,
                  monday: {
                    breakEndTime: '00:00:00',
                    breakStartTime: '00:00:00',
                    startTime: '00:00:00',
                    endTime: '00:00:00',
                  },
                });
              }
            }}
            isChecked={registerData.monday !== null}
          />
        </View>
        <View style={{flex: 0.78, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text>휴무</Text>
        </View>
      </View>
    );
  }
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
