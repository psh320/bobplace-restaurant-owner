import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MissionUserCard} from '../components/mission/MissionUserCard';
import {MissionAcceptCard} from '../components/mission/MissionAcceptCard';
import {MissionSwitch} from '../components/mission/MissionSwitch';
import {DesignSystem} from '../assets/DesignSystem';
import {NotiModal} from '../modal/NotiModal';
import {queryKey} from '../api/queryKey';
import {useQuery} from 'react-query';
import {IMissionProgressType, IMissionSuccessType} from '../data/IMissions';
import {getMissionsProgress, getMissionsSuccess} from '../api/mission';
import {useRecoilState} from 'recoil';
import {RCprogressNow} from '../state';
import {useNavigation} from '@react-navigation/native';
import {NoBobpool} from '../components/common/NoBobpool';
import messaging from '@react-native-firebase/messaging';
import {ScrollView} from 'react-native-gesture-handler';

const dummyProgress = [
  {
    mission: '10000원 이상',
    missionId: 234,
    point: 500,
    startDate: '2022-07-18T15:16:39.528Z',
    userId: 1,
    userName: '김진범',
  },
  {
    mission: '10000원 이상',
    missionId: 23,
    point: 500,
    startDate: '2022-07-17T15:16:39.528Z',
    userId: 13,
    userName: '이예진',
  },
  {
    mission: '10000원 이상',
    missionId: 345345,
    point: 500,
    startDate: '2022-07-16T15:16:39.528Z',
    userId: 14,
    userName: '박성호',
  },
  {
    mission: '10000원 이상',
    missionId: 345345,
    point: 500,
    startDate: '2022-07-16T15:16:39.528Z',
    userId: 51,
    userName: '박성호',
  },
];

const dummySuccess = [
  {
    date: '2022-07-18T15:16:39.528Z',
    dayOfWeek: 'TUESDAY',
    mission: '10000원 이상',
    missionId: 234,
    point: 500,
    userId: 1,
    userName: '김진범18',
  },
  {
    date: '2022-07-17T15:16:39.528Z',
    dayOfWeek: 'MONDAY',
    mission: '10000원 이상',
    missionId: 23,
    point: 500,
    userId: 13,
    userName: '이예진17',
  },
  {
    date: '2022-07-16T15:16:39.528Z',
    dayOfWeek: 'SUNDAY',
    mission: '10000원 이상',
    missionId: 345345,
    point: 500,
    userId: 14,
    userName: '박성호16',
  },
  {
    date: '2022-07-16T15:16:39.528Z',
    dayOfWeek: 'MONDAY',
    mission: '10000원 이상',
    missionId: 345345,
    point: 500,
    userId: 51,
    userName: '이예진16',
  },
];
const Mission = () => {
  const navigation = useNavigation();

  // const [progressNow, setProgressNow] = useState(true);
  const [progressNow, setProgressNow] = useRecoilState(RCprogressNow);
  const [missionWaiting, setMissionWaiting] = useState(false);
  const [notiModal, setNotiModal] = useState(false);
  const seperate = useRef('');

  //진행중 카드 목록
  const DataMissionsProgress = useQuery<IMissionProgressType>(
    queryKey.MISSIONSPROGRESS,
    getMissionsProgress,
  );
  //성공요청 카드 목록
  const DataMissionsSuccess = useQuery<IMissionSuccessType[]>(
    queryKey.MISSIONSSUCCESS,
    getMissionsSuccess,
  );
  console.log('DataMissionsSuccess', DataMissionsSuccess.data);
  //Data___.data.키값(result내에서) 로 접근
  // console.log('DataMissionsProgress-----', DataMissionsProgress.data); //초기 undefined, 이후 []
  console.log(
    'DataMissionsProgress ownerMissionDto-----',
    DataMissionsProgress.data?.ownerMissionDto,
  ); //초기 undefined, 이후 []
  console.log('DataMissionsSuccess-----', DataMissionsSuccess.data?.length); //초기 undefined, 이후 []
  useEffect(() => {
    seperate.current = '2022-00-00T15:16:39.528Z'.slice(0, 10); //구분날짜 초기화
    if (DataMissionsSuccess.data?.length > 0) {
      console.log('요청있음');
      setMissionWaiting(true);
    } else {
      setMissionWaiting(false);
    }
  }, [DataMissionsSuccess]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      if (remoteMessage.data.title === 'missionSuccess') {
        //title값 추후 변경 - - - - -
        DataMissionsProgress.refetch();
        DataMissionsSuccess.refetch();
        console.log('성공요청 업데이트!');
      }
    });
    return unsubscribe;
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>미션</Text>
          {progressNow && (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications', {userId: 0})}>
              <Icon name="bell-outline" size={24} color="#323232" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1}}>
          {/* 스위치 '진행중' 일때 */}
          {progressNow ? (
            DataMissionsProgress.data?.missionOnProgressCount !== 0 ? (
              <>
                <View style={[styles.missionUserNumberWrap]}>
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey12]}>현재 </Text>
                  {/* <Text style={[DesignSystem.title3SB, DesignSystem.purple5]}>_명</Text> */}
                  <Text style={[DesignSystem.title3SB, DesignSystem.purple5]}>
                    {DataMissionsProgress.data?.missionOnProgressCount}명
                  </Text>
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey12]}>
                    의 유저가 미션을 진행하고 있습니다
                  </Text>
                </View>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={DataMissionsProgress.isLoading}
                      onRefresh={() => DataMissionsProgress.refetch()}
                    />
                  }
                  contentContainerStyle={{paddingTop: 12, paddingBottom: 50}}
                  ItemSeparatorComponent={() => <View style={{height: 10}} />}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={10}
                  data={dummyProgress}
                  // data={DataMissionsProgress.data?.ownerMissionDto}
                  renderItem={({item}) => (
                    <>
                      <MissionUserCard
                        mission={item.mission}
                        missionId={item.missionId}
                        point={item.point}
                        startDate={item.startDate}
                        userId={item.userId}
                        userName={item.userName}
                      />
                    </>
                  )}
                />
              </>
            ) : (
              <ScrollView
                contentContainerStyle={{flex: 1}}
                refreshControl={
                  <RefreshControl
                    refreshing={DataMissionsProgress.isLoading}
                    onRefresh={() => DataMissionsProgress.refetch()}
                  />
                }
              >
                <NoBobpool category={'진행중'} />
              </ScrollView>
            )
          ) : // 스위치 '성공요청' 일때
          DataMissionsSuccess.data?.length !== 0 ? (
            <>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={DataMissionsSuccess.isLoading}
                    onRefresh={() => DataMissionsSuccess.refetch()}
                  />
                }
                contentContainerStyle={{paddingTop: 12, paddingBottom: 50}}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                scrollEventThrottle={10}
                // data={dummySuccess}
                data={DataMissionsSuccess.data}
                renderItem={({item}) => (
                  <MissionAcceptCard
                    date={item.date}
                    dayOfWeek={item.dayOfWeek}
                    mission={item.mission}
                    missionId={item.missionId}
                    point={item.point}
                    userId={item.userId}
                    userName={item.userName}
                    seperate={seperate}
                  />
                )}
              />
            </>
          ) : (
            <ScrollView
              contentContainerStyle={{flex: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={DataMissionsSuccess.isLoading}
                  onRefresh={() => DataMissionsSuccess.refetch()}
                />
              }
            >
              <NoBobpool category={'성공요청'} />
            </ScrollView>
          )}
        </View>
        <View style={[DesignSystem.centerArrange]}>
          <MissionSwitch missionWaiting={missionWaiting} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Mission;

const styles = StyleSheet.create({
  flex: {flex: 1},
  screenHeaderWrap: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  missionUserNumberWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 46,
    width: '100%',
    backgroundColor: '#FCFCFC',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  userCountText: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    lineHeight: 24,
    color: '#3F3F3F',
  },
  userCountPurpleText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    lineHeight: 16,
    color: '#6C69FF',
  },
});
