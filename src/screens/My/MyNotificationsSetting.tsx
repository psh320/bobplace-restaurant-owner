import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';

type Props = NativeStackScreenProps<MyStackParamList, 'MyNotificationsSetting'>;

export const MyNotificationsSetting = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [onRequestSuccess, setOnRequestSuccess] = useState(false);
  const [onNewReview, setOnNewReview] = useState(false);
  const [onReplyInquiry, setOnReplyInquiry] = useState(false);
  const [onNewEvent, setOnNewEvent] = useState(false);

  return (
    <>
      <SafeAreaView style={{flex:0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <MyHeader goBack={goBack} title={'알림 설정'} />
        <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText]}>미션 성공 요청</Text>
          <Switch
            value={onRequestSuccess}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onRequestSuccess ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnRequestSuccess(!onRequestSuccess)}
            style={{marginRight: 16}}
          />
        </View>
        <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText]}>새로운 리뷰</Text>
          <Switch
            value={onNewReview}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onNewReview ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnNewReview(!onNewReview)}
            style={{marginRight: 16}}
          />
        </View>
        <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText]}>문의 내역 답변</Text>
          <Switch
            value={onReplyInquiry}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onReplyInquiry ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnReplyInquiry(!onReplyInquiry)}
            style={{marginRight: 16}}
          />
        </View>
        <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText]}>새로운 이벤트</Text>
          <Switch
            value={onNewEvent}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onNewEvent ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnNewEvent(!onNewEvent)}
            style={{marginRight: 16}}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  eachNotifications: {
    height: hp(calHeight(68)),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  eachNotiText: {
    marginLeft: 21.87,
    color: '#000000',
    fontFamily: 'Pretendard-Light',
    lineHeight: 24,
    fontSize: 16,
  },
});
