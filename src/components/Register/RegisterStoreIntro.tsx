import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RegisterStoreInterface} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';

type RegisterStoreIntroProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterStoreIntro: FC<RegisterStoreIntroProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
  error,
}) => {
  const [focusedIntro, setFocusedIntro] = useState(false);
  return (
    <View style={[styles.addressWrap]}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게 한줄 소개</Text>
      </View>
      <TextInput
        style={[
          styles.nameInput,
          error && focusedIntro
            ? styles.errorBorderFocus
            : error && !focusedIntro
            ? styles.errorBorderNoFocus
            : focusedIntro
            ? styles.focusBorder
            : styles.unfocusBorder,
        ]}
        onChangeText={(text) => {
          onChange(text);
          setRegisterData({...registerData, intro: text});
        }}
        value={value}
        placeholder="가게 소개 입력"
        selectionColor={'#6C69FF'}
        onBlur={() => setFocusedIntro(false)}
        onFocus={() => setFocusedIntro(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addressWrap: {marginTop: 0},
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
});
