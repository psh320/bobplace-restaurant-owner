import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MissionStackParamList} from '../nav/MissionNavigator';
import {MyHeader} from '../components/My/MyHeader';
import {NotificationCard} from '../components/NotificationCard';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {queryKey} from '../api/queryKey';
import {DesignSystem} from '../assets/DesignSystem';
import {getNotifications} from '../api/my';
import {INotiType} from '../data/IMissions';
import {patchNotificationsStatus} from '../data/INoti';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
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
    title: '타타이틀',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 10,
    name: '고구마',
    pushType: 'OWNER_SUCCESS',
    subId: 110,
    subTitle: 'string',
    title: '타타이틀',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 20,
    name: '감자',
    pushType: 'OWNER_PROGRESS',
    subId: 220,
    subTitle: 'string',
    title: '타타이틀',
  },
  {
    checked: false,
    date: '2022-07-19T06:44:56.115Z',
    id: 30,
    name: '홍길동',
    pushType: 'OWNER_PROGRESS',
    subId: 330,
    subTitle: 'string',
    title: '타타이틀',
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
    pushType: 'OWNER_ANSWER',
    subId: 330,
    subTitle: 'string',
    title: '타타이틀',
  },
];
export const Notifications = ({navigation}: Props) => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(RCstoreId);
  // console.log('아이디이이이조라', storeId);

  const DataNoti = useQuery<INotiType[]>(queryKey.NOTIFICATIONS, getNotifications, {
    onError: (err) => {
      console.log('ERR', err);
    },
  });
  console.log('DataNoti', DataNoti); //스웨거에서result인 배열
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
            // data={DataNoti.data}
            data={dummy}
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
