import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import {useMutation, useQueryClient} from 'react-query';
import {useRecoilState} from 'recoil';
import {RCnowWrite, RCprogressNow} from '../state';
import {patchNotificationsStatus} from '../api/my';
import {MissionStackParamList} from '../nav/MissionNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type NotificationCardProps = {
  checked: boolean;
  date: string;
  id: number;
  name: string;
  pushType: string;
  subId: number;
  subTitle: string;
  title: string;
  navigation: NativeStackNavigationProp<MissionStackParamList, 'Notifications', undefined>;
};

//prettier-ignore
//id는 알림구분번호id고 subId가 회원id, 미션id 등 기타 id
export const NotificationCard: FC<NotificationCardProps> = ({checked, date, id, name, pushType, subId, subTitle, title, navigation}) => {
  const queryClient = useQueryClient();
  const [progressNow, setProgressNow] = useRecoilState(RCprogressNow);
  const [nowWrite, setNowWrite] = useRecoilState(RCnowWrite);

  const missionSuccessRequestMutation = useMutation(
    (notiId: number) => patchNotificationsStatus(notiId),
    {
      onSuccess: (data) => {
        console.log('알림확인 전환 성공: ', data);
        queryClient.invalidateQueries('notifications');
      },
      onError: (err) => {
        console.log('알림확인 전환 실패: ', err);
      },
    },
  );
  return (
    <>
    {/* 미션성공요청 */}
    {pushType === 'OWNER_SUCCESS' ?
      <TouchableOpacity
        style={[styles.notiCard, checked && {opacity: 0.5}]}
        onPress={() => {
          navigation.pop();
          navigation.navigate('Mission');
          setProgressNow(false);
          missionSuccessRequestMutation.mutate(id);
        }}
      >
        <View style={[styles.notiWrap]}>
          <View style={!checked ? [styles.dot] : [styles.noDot]} />
          <View style={[styles.notiView]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>{title}</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}><Text style={[DesignSystem.purple5]}>{name}</Text>{subTitle}</Text>
            <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
              {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11,16)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      // 미션도전했습니다
      pushType === 'OWNER_CHALLENGE' ?
      <TouchableOpacity
        style={[styles.notiCard, checked && {opacity: 0.5}]}
        onPress={() => {
          navigation.pop();
          navigation.navigate('Mission');
          missionSuccessRequestMutation.mutate(id);
        }}
      >
        <View style={[styles.notiWrap]}>
          <View style={!checked ? [styles.dot] : [styles.noDot]} />
          <View style={[styles.notiView]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>{title}</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}><Text style={[DesignSystem.purple5]}>{name}</Text>{subTitle}</Text>
            <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
              {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11,16)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      // 리뷰알림
      pushType === 'OWNER_REVIEW' ?
      <TouchableOpacity
        style={[styles.notiCard, checked && {opacity: 0.5}]}
        onPress={() => {
          navigation.pop();
          navigation.navigate('StoreNavigator', {screen: 'StoreReview'});
          missionSuccessRequestMutation.mutate(id);
        }}
      >
        <View style={[styles.notiWrap]}>
          <View style={!checked ? [styles.dot] : [styles.noDot]} />
          <View style={[styles.notiView]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>{title}</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}><Text style={[DesignSystem.purple5]}></Text>{subTitle}</Text>
            <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
              {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11,16)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      // ANSWER(1:1문의 답변받으면)
      <TouchableOpacity
        style={[styles.notiCard, checked && {opacity: 0.5}]}
        onPress={() => {
          navigation.navigate('MyNavigator', {screen: 'MyInquiry'});
          setNowWrite(false);
          missionSuccessRequestMutation.mutate(id);
        }}
      >
        <View style={[styles.notiWrap]}>
          <View style={!checked ? [styles.dot] : [styles.noDot]} />
          <View style={[styles.notiView]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>{title}</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}><Text style={[DesignSystem.purple5]}></Text>{subTitle}</Text>
            <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
              {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11,16)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    }
    </>
  );
};

const styles = StyleSheet.create({
  notiCard: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  notiWrap: {
    //구성요소들 정렬
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 12,
    marginBottom: 12,
    marginRight: 25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#6C69FF',
    marginTop: 9,
    marginRight: 9,
  },
  noDot: {
    width: 6,
    marginRight: 9,
  },
  notiView: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
  },
  mission: {
    fontSize: 16,
    marginBottom: 8,
    color: '#111111',
    fontFamily: 'Pretendard-Light',
  },
  date: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: 'Pretendard-Light',
  },
});
