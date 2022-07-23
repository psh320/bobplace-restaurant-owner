import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {storeData} from '../../state';

type RegisterAddressProps = {
  onChange: (...event: any[]) => void;
  value: number;
  error: boolean;
};

export const RegisterStoreType: FC<RegisterAddressProps> = ({onChange, value, error}) => {
  const [RCstoreData, setRCstoreData] = useRecoilState(storeData);

  return (
    <View style={[styles.addressWrap]}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={[DesignSystem.h2SB, DesignSystem.grey17, {marginBottom: 8}]}>가게 유형</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#6C69FF'}}> * </Text>
        </View>
      </View>
      <RNPickerSelect
        style={error ? pickerSelectErrorStyles : pickerSelectStyles}
        onValueChange={(itemValue: number) => {
          onChange(itemValue);
          setRCstoreData({...RCstoreData, storeTypeId: value});
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{label: '가게유형 선택', value: -1}}
        value={value}
        items={[
          {label: '한식당', value: 1},
          {label: '일식당', value: 2},
          {label: '중식당', value: 3},
          {label: '양식당', value: 4},
          {label: '치킨집', value: 5},
          {label: '분식집', value: 6},
          {label: '고기/구이', value: 7},
          {label: '도시락', value: 8},
          {label: '야식(족발,보쌈)', value: 9},
          {label: '패스트푸드', value: 10},
          {label: '디저트/카페', value: 11},
          {label: '아시안푸드', value: 12},
        ]}
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
