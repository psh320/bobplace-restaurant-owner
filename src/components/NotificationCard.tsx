import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {INotiType} from '../data';
import {queryKey} from '../api/queryKey';
import {useRecoilState} from 'recoil';
import {RCprogressNow} from '../state';
import {patchNotificationsStatus} from '../api/my';

export type NotificationCardProps = {
  pushType: string; //미션알림1인지 리뷰남기란 알림0인지
  storeName: string;
  storeId: number;
  missionId: number;
  mission: string; //미션
  date: string;
  checked: boolean;
  id: number;
};

//prettier-ignore
export const NotificationCard: FC<NotificationCardProps> = ({id, pushType, storeName, storeId, missionId, mission, date, checked, checkedNoti}) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [progressNow, setProgressNow] = useRecoilState(RCprogressNow);
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
    {pushType === 'OWNERMISSION' ?
      <TouchableOpacity
        style={[styles.notiCard, checked && {opacity: 0.5}]}
        onPress={() => {
          navigation.navigate('Mission');
          setProgressNow(false);
          missionSuccessRequestMutation.mutate(id);
        }
      }
      >
        <View style={[styles.notiWrap]}>
          <View style={!checked ? [styles.dot] : [styles.noDot]} />
          <View style={[styles.notiView]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>미션 성공요청이 도착했습니다!</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}><Text style={[DesignSystem.purple5]}>{mission}</Text></Text>
            <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
              {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11,15)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      pushType === 'OWNERREVIEW' ?
      <TouchableOpacity
        style={[styles.notiCard, checked && {opacity: 0.5}]}
        onPress={() => {
          missionSuccessRequestMutation.mutate(id);
        }
      }
      >
        <View style={[styles.notiWrap]}>
          <View style={!checked ? [styles.dot] : [styles.noDot]} />
          <View style={[styles.notiView]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>OWNERREVIEW.</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}><Text style={[DesignSystem.purple5]}>{storeName}</Text>의 음식이 맛있었다면 리뷰를 남겨주세요.</Text>
            <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
              {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11,16)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      //ANSWER(1:1문의 답변받으면)
      <TouchableOpacity
        style={[styles.notiCard, checked && {opacity: 0.5}]}
        onPress={() => {
          missionSuccessRequestMutation.mutate(id);
        }
      }
      >
        <View style={[styles.notiWrap]}>
          <View style={!checked ? [styles.dot] : [styles.noDot]} />
          <View style={[styles.notiView]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>ANSWER.</Text>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}><Text style={[DesignSystem.purple5]}>{storeName}</Text>의 음식이 맛있었다면 리뷰를 남겨주세요.</Text>
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
