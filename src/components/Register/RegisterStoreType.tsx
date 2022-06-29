import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RegisterStoreInterface} from '../../data';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

type RegisterAddressProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
  onChange: (...event: any[]) => void;
  value: number;
  error: boolean;
};

export const RegisterStoreType: FC<RegisterAddressProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
  error,
}) => {
  const [selectedType, setSelectedType] = useState(registerData.storeTypeId);

  return (
    <View style={[styles.addressWrap]}>
      <Text style={[styles.formHeadText]}>가게유형</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(itemValue: number) => {
          setSelectedType(itemValue);
          onChange(itemValue);
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{label: '가게유형 선택', value: -1}}
        value={selectedType}
        items={[
          {label: '한식당', value: 0},
          {label: '일식당', value: 1},
          {label: '중식당', value: 2},
          {label: '양식당', value: 3},
          {label: '치킨집', value: 4},
          {label: '분식집', value: 5},
          {label: '고기/구이', value: 6},
          {label: '도시락', value: 7},
          {label: '야식(족발,보쌈)', value: 8},
          {label: '패스트푸드', value: 9},
          {label: '디저트/카페', value: 10},
          {label: '아시안푸드', value: 11},
        ]}
        Icon={() => {
          return <Icon name="chevron-down" size={24} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addressWrap: {marginTop: 40},
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
    fontSize: 16,
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
    fontSize: 16,
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
