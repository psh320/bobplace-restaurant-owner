import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Switch, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getNotiSettting, patchNotiSetting} from '../../api/my';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<MyStackParamList, 'MyNotificationsSetting'>;

export const MyNotificationsSetting = ({navigation}: Props) => {
  const [onRequestSuccess, setOnRequestSuccess] = useState(false);
  const [onNewReview, setOnNewReview] = useState(false);
  const [onReplyInquiry, setOnReplyInquiry] = useState(false);
  // const [onNewEvent, setOnNewEvent] = useState(false); //새로운 이벤트

  const DataNotifications = useQuery(queryKey.NOTIFICATIONS_SETTING, getNotiSettting);
  // console.log('NOTI SEtting', DataNotifications.data);
  // console.log(onRequestSuccess, onNewReview, onReplyInquiry);
  useEffect(() => {
    if (DataNotifications.data !== undefined) {
      setOnRequestSuccess(DataNotifications.data.mission); //성공요청 키값뭐냐
      setOnNewReview(DataNotifications.data.review);
      setOnReplyInquiry(DataNotifications.data.question); //문의내역답변
    }
    console.log(onRequestSuccess, onNewReview, onReplyInquiry);
  }, [DataNotifications.data]);
  const queryClient = useQueryClient();

  const notificationsMutation = useMutation(
    (data: {mission: boolean; review: boolean; question: boolean; event: boolean}) =>
      patchNotiSetting(data),
    {
      onSuccess(data) {
        console.log('알림설정 patch 성공', data);
        queryClient.invalidateQueries(queryKey.NOTIFICATIONS_SETTING);
      },
    },
  );
  const submitReview = async () => {
    await notificationsMutation.mutate({
      mission: onRequestSuccess, //성공요청
      review: onNewReview, //새로운 리뷰
      question: onReplyInquiry, //문의내역 답변
      event: false, //나중...
    });
  };
  const goBack = () => {
    submitReview();
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F7F7F7'}]}>
        <MyHeader goBack={goBack} title={'알림 설정'} />
        <View style={{height: 1, backgroundColor: '#EFEFEF'}} />
        <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText, DesignSystem.body1Lt]}>미션 성공 요청</Text>
          <Switch
            value={onRequestSuccess}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onRequestSuccess ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnRequestSuccess(!onRequestSuccess)}
            style={{marginRight: 16}}
          />
        </View>
        <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText, DesignSystem.body1Lt]}>새로운 리뷰</Text>
          <Switch
            value={onNewReview}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onNewReview ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnNewReview(!onNewReview)}
            style={{marginRight: 16}}
          />
        </View>
        <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText, DesignSystem.body1Lt]}>문의 내역 답변</Text>
          <Switch
            value={onReplyInquiry}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onReplyInquiry ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnReplyInquiry(!onReplyInquiry)}
            style={{marginRight: 16}}
          />
        </View>
        {/* 나중에 추가할 스위치 - 승민 */}
        {/* <View style={[styles.eachNotifications]}>
          <Text style={[styles.eachNotiText, DesignSystem.body1Lt]}>새로운 이벤트</Text>
          <Switch
            value={onNewEvent}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onNewEvent ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnNewEvent(!onNewEvent)}
            style={{marginRight: 16}}
          />
        </View> */}
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
  },
});
