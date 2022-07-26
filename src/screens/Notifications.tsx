import React from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MissionStackParamList} from '../nav/MissionNavigator';
import {MyHeader} from '../components/My/MyHeader';
import {NotificationCard} from '../components/NotificationCard';
import {useQuery, useQueryClient} from 'react-query';
import {queryKey} from '../api/queryKey';
import {getNotifications} from '../api/my';
import {INotiType} from '../data/IMissions';
import {NoBobpool} from '../components/common/NoBobpool';
import {useRecoilValue} from 'recoil';
import {RCstoreId} from '../state';

type Props = NativeStackScreenProps<MissionStackParamList, 'Notifications'>;
const dummy = [
  {
    checked: true,
    date: '2022-07-19T06:44:56.115Z',
    id: 0,
    name: '이릉으',
    pushType: 'OWNER_SUCCESS',
    subId: 0,
    subTitle: 'string',
    title: '성공요청이들어왔습니다',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 10,
    name: '고구마',
    pushType: 'OWNER_SUCCESS',
    subId: 110,
    subTitle: '님의성공여부를확인후수락',
    title: '성공요청이들어왔습니다',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 20,
    name: '감자',
    pushType: 'OWNER_PROGRESS',
    subId: 220,
    subTitle: '님의성공여부를확인후수락',
    title: '고객님이미션도전했습니다',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 30,
    name: '홍길동',
    pushType: 'OWNER_PROGRESS',
    subId: 330,
    subTitle: '님이 현재 미션 진행중입니다',
    title: '고객님이미션도전했습니다',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 45,
    name: '',
    pushType: 'OWNER_REVIEW',
    subId: 0,
    subTitle: '리뷰를 확인해쥣고 . . .',
    title: '새로운 리뷰가 작성되었습니다',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 50,
    name: '홍길동',
    pushType: 'ANSWER',
    subId: 330,
    subTitle: '문의제목...에대한 답변ㄴ이디ㅡㅇ록',
    title: '(1:1)문의 답변이등록되었습니다',
  },
];
export const Notifications = ({navigation, route}: Props) => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(RCstoreId);
  const DataNoti = useQuery<INotiType[]>(queryKey.NOTIFICATIONS, getNotifications, {
    onError: (err) => {
      console.log('ERR', err);
    },
  });
  // console.log('DataNoti', DataNoti); //스웨거에서result인 배열
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'알림'} />
        {DataNoti.data?.length !== 0 ? (
          <FlatList
            style={{marginLeft: 16, marginRight: 16}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60, marginTop: 12}}
            scrollEventThrottle={10}
            data={DataNoti.data}
            // data={dummy}
            renderItem={({item}) => (
              <NotificationCard
                checked={item.checked}
                date={item.date}
                id={item.id}
                name={item.name}
                pushType={item.pushType}
                subId={item.subId}
                subTitle={item.subTitle}
                title={item.title}
                navigation={navigation}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 8}} />}
          />
        ) : (
          <NoBobpool category={'알림'} />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  flexTop: {},
});
