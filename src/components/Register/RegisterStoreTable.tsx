import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {storeData, storeGetData} from '../../state';

type RegisterAddressProps = {
  onChange: (...event: any[]) => void;
  value: number;
  error: boolean;
};

export const RegisterStoreTable: FC<RegisterAddressProps> = ({onChange, value, error}) => {
  const [RCstoreData, setRCstoreData] = useRecoilState(storeData);
  const [RCstoreGetData, setRCstoreGetData] = useRecoilState(storeGetData);

  return (
    <View style={[styles.addressWrap]}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={[DesignSystem.h2SB, DesignSystem.grey17, {marginBottom: 8}]}>테이블 수</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#6C69FF'}}> * </Text>
        </View>
      </View>
      <RNPickerSelect
        style={error ? pickerSelectErrorStyles : pickerSelectStyles}
        onValueChange={(itemValue: number) => {
          onChange(itemValue);
          setRCstoreData({...RCstoreData, tableNum: value});
          setRCstoreGetData({...RCstoreGetData, tableNum: value});
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{label: '테이블 수 선택', value: -1}}
        value={value}
        items={[
          {label: '0~2개', value: 0},
          {label: '3개 이상', value: 1},
        ]}
        //Picker Select library에 가서 Icon type을 React.ReactNode | (()=>JSX.element) 로 설정 해줘야 빨간줄 안뜸
        Icon={() => {
          return <Icon name="chevron-down" size={24} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addressWrap: {marginTop: 0},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  nameInput: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 8,
    color: '#111111',
  },
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  errorBorderNoFocus: {borderColor: '#E03D32', borderWidth: 0.5},
  spacebetweenWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 24,
    color: '#949494',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
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
    padding: 10,
  },
});

const pickerSelectErrorStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    width: '100%',
    height: 44,
    color: '#000000',
    borderColor: '#E03D32',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputAndroid: {
    fontSize: 14,
    width: '100%',
    height: 44,
    color: '#000000',
    borderColor: '#E03D32',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    padding: 10,
  },
});
