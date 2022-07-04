import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/My/MyHeader';

type Props = NativeStackScreenProps<MyStackParamList, 'MyNotificationsSetting'>;

export const MyNotificationsSetting = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [onRequestSuccess, setOnRequestSuccess] = useState(false);
  const [onRequestPay, setOnRequestPay] = useState(false);
  const [onNewReview, setOnNewReview] = useState(false);
  const [onReplyInquiry, setOnReplyInquiry] = useState(false);
  const [onNewEvent, setOnNewEvent] = useState(false);

  return (
    <View style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'알림 설정'} />
      <View style={[styles.eachNotifications]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'미션 성공 요청'}</Text>
        <Switch
          value={onRequestSuccess}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onRequestSuccess ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnRequestSuccess(!onRequestSuccess)}
          style={{marginRight: 16}}
        />
      </View>
      <View style={[styles.eachNotifications]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'결제 요청'}</Text>
        <Switch
          value={onRequestPay}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onRequestPay ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnRequestPay(!onRequestPay)}
          style={{marginRight: 16}}
        />
      </View>
      <View style={[styles.eachNotifications]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'새로운 리뷰'}</Text>
        <Switch
          value={onNewReview}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onNewReview ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnNewReview(!onNewReview)}
          style={{marginRight: 16}}
        />
      </View>
      <View style={[styles.eachNotifications, {marginTop: 8}]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'문의 내역 답변'}</Text>
        <Switch
          value={onReplyInquiry}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onReplyInquiry ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnReplyInquiry(!onReplyInquiry)}
          style={{marginRight: 16}}
        />
      </View>
      <View style={[styles.eachNotifications]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'새로운 이벤트'}</Text>
        <Switch
          value={onNewEvent}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onNewEvent ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnNewEvent(!onNewEvent)}
          style={{marginRight: 16}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  alarmWrap: {
    height: 68,
    backgroundColor: 'white',
  },
  reply: {
    height: 68,
    backgroundColor: 'white',
  },
  inquiry: {
    height: 68,
    backgroundColor: 'white',
  },
  eachNotifications: {
    height: 68,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
