import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../../data';
import {CheckBoxRectangle} from '../common/CheckBoxRectangle';
import {
  UpdateMonday,
  UpdateTuesday,
  UpdateWednesday,
  UpdateThursday,
  UpdateFriday,
  UpdateSaturday,
  UpdateSunday,
} from '../';

type RegisterTimeProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
};

export const RegisterTime: FC<RegisterTimeProps> = ({setRegisterData, registerData}) => {
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
      <UpdateMonday registerData={registerData} setRegisterData={setRegisterData} />
      <UpdateTuesday registerData={registerData} setRegisterData={setRegisterData} />
      <UpdateWednesday registerData={registerData} setRegisterData={setRegisterData} />
      <UpdateThursday registerData={registerData} setRegisterData={setRegisterData} />
      <UpdateFriday registerData={registerData} setRegisterData={setRegisterData} />
      <UpdateSaturday registerData={registerData} setRegisterData={setRegisterData} />
      <UpdateSunday registerData={registerData} setRegisterData={setRegisterData} />
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
