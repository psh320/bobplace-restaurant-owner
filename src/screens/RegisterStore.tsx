import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RegisterHeader, RegisterNextButton} from '../components';
import {AuthStackParamList} from '../nav';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStore'>;

const RegisterStore = ({navigation, route}: Props) => {
  const [registerStoreData, setRegisterStoreData] = useState(route.params.data);
  const [imageData, setImageData] = useState();
  const goResult = () => {
    navigation.navigate('RegisterDone', {status: 0});
  };

  const goNext = () => {
    navigation.navigate('RegisterStoreInfo', {storeData: registerStoreData, imageData: imageData});
  };
  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={() => goResult()} pageNum={1} totalPage={3} />
      <View style={[styles.flex, styles.formWrap]}>
        <Text style={[styles.RegisterFormTitle]}>점포인증</Text>
        <View style={[styles.spaceBetween, styles.flexRow, styles.subtitleText]}>
          <Text>대표메뉴 미션을 위해 사용됩니다.</Text>
          <View style={[styles.flexRow]}>
            <Text style={{color: '#6C69FF'}}>*</Text>
            <Text>필수입력</Text>
          </View>
        </View>
        <View style={[styles.checklistWrap]}>
          <Text style={[styles.checklistText]}>1. 사업자 등록증</Text>
          <Text style={[styles.checklistText]}>2. 영업신고증</Text>
          <Text style={[styles.checklistText]}>3. 통장사본</Text>
          <Text style={[styles.checklistText]}>4. (선택)로고</Text>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            borderColor: '#C4C4C4',
            borderWidth: 1,
            height: 44,
            marginTop: 50,
            borderRadius: 10,
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <View style={[styles.spaceBetween, styles.flexRow]}>
            <Text>파일 첨부</Text>
            <Icon name="plus" size={22} color="#C4C4C4" />
          </View>
        </TouchableOpacity>
        <View></View>
      </View>
      <RegisterNextButton goNext={goNext} buttonState={1} />
    </SafeAreaView>
  );
};

export default RegisterStore;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  formWrap: {marginLeft: 16, marginRight: 16},
  RegisterFormTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    marginTop: 8,
  },
  checklistWrap: {
    marginTop: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  checklistText: {
    color: '#2A2A2A',
    fontSize: 14,
    lineHeight: 22,
  },
});
