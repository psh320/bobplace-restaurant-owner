import React, {FC, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, SafeAreaView, Modal} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../nav/HomeNavigator';
import {MyHeader} from '../components/My/MyHeader';
import {NotificationCard} from '../components/NotificationCard';
// import {getNotifications, patchNotificationsStatus} from '../api';
import {useMutation, useQuery, useQueryClient} from 'react-query';
// import {INotiType} from '../data';
import {queryKey} from '../api/queryKey';

type NotiModalProps = {
  visible: boolean;
  closeNotiModal: () => void;
};

export const NotiModal: FC<NotiModalProps> = ({visible, closeNotiModal}) => {
  // const queryClient = useQueryClient();

  // const DataNoti = useQuery<INotiType[]>(queryKey.NOTIFICATIONS, getNotifications, {
  //   onError: (err) => {
  //     console.log('ERR', err);
  //   },
  //   onSuccess: (data) => {
  //     console.log('DataNoti', data);
  //   },
  // });
  // const missionSuccessRequestMutation = useMutation(
  //   (notiId: number) => patchNotificationsStatus(notiId),
  //   {
  //     onSuccess: (data) => {
  //       console.log('알림확인 전환 성공: ', data);
  //       queryClient.invalidateQueries('notifications');
  //     },
  //     onError: (err) => {
  //       console.log('알림확인 전환 실패: ', err);
  //     },
  //   },
  // );
  // const checkedNoti = (notiId: number) => {
  //   missionSuccessRequestMutation.mutate(notiId);
  // };
  // console.log('DATANOTI', DataNoti.data); //스웨거에서result인 배열
  return (
    <Modal visible={visible}>
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={closeNotiModal} title={'알림'} />
        {/* {DataNoti.data?.length !== 0 ? (
          <FlatList
            style={{marginLeft: 16, marginRight: 16}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60, marginTop: 12}}
            scrollEventThrottle={10}
            data={DataNoti.data}
            renderItem={({item}) => (
              <NotificationCard
                pushType={item.pushType}
                storeName={item.storeName}
                storeId={item.storeId}
                missionId={item.missionId}
                mission={item.subTitle}
                date={item.date}
                checked={item.checked}
                id={item.id}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 8}} />}
          />
        ) : (
          <View />
        )} */}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  flexTop: {},
});
