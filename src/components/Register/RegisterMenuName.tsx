import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RegisterStoreInterface} from '../../data';

type RegisterMenuNameProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterMenuName: FC<RegisterMenuNameProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
  error,
}) => {
  const [focusedName, setFocusedName] = useState(false);
  return (
    <View style={[styles.nameWrap]}>
      <Text style={[styles.formHeadText]}>대표메뉴</Text>
      <Text style={[styles.formSubText, {marginBottom: 12}]}>
        가게를 대표하는 사진을 첨부해주세요!
      </Text>
      <TextInput
        style={[
          styles.nameInput,
          error && focusedName
            ? styles.errorBorderFocus
            : error && !focusedName
            ? styles.errorBorderNoFocus
            : focusedName
            ? styles.focusBorder
            : styles.unfocusBorder,
        ]}
        onChangeText={(text) => {
          onChange(text);
          setRegisterData({...registerData, storeName: text});
        }}
        value={value}
        placeholder="대표메뉴 이름 입력"
        selectionColor={'#6C69FF'}
        onBlur={() => setFocusedName(false)}
        onFocus={() => setFocusedName(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameWrap: {
    marginTop: 24,
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
  errorBorderFocus: {borderColor: '#E03D32', borderWidth: 1},
  errorBorderNoFocus: {borderColor: '#E03D32', borderWidth: 0.5},
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
  },
  formSubText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#777777',
    marginBottom: 12,
  },
});
