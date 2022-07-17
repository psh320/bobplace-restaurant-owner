import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MissionUserCard} from '../components/mission/MissionUserCard';
import {MissionAcceptCard} from '../components/mission/MissionAcceptCard';
import {MissionSwitch} from '../components/mission/MissionSwitch';
import {DesignSystem} from '../assets/DesignSystem';
import {NotiModal} from '../modal/NotiModal';
import {queryKey} from '../api/queryKey';
import {useQuery} from 'react-query';
import {IMission} from '../data/IMissions';
import {getMissionsProgress, getMissionsSuccess} from '../api/mission';
import {IMissionProgress} from '../data/IMissions';

const dummyMission = [
  {
    date: '2022-07-16T15:16:39.528Z',
    mission: '10000원 이상',
    missionId: 234,
    point: 500,
    userId: 1,
    userName: '김진범',
  },
  {
    date: '2022-07-16T15:16:39.528Z',
    mission: '10000원 이상',
    missionId: 23,
    point: 500,
    userId: 13,
    userName: '이예진',
  },
  {
    date: '2022-07-16T15:16:39.528Z',
    mission: '10000원 이상',
    missionId: 345345,
    point: 500,
    userId: 14,
    userName: '박성호',
  },
  {
    date: '2022-07-16T15:16:39.528Z',
    mission: '10000원 이상',
    missionId: 345345,
    point: 500,
    userId: 51,
    userName: '박성호',
  },
];

const Mission = () => {
  const [progressNow, setProgressNow] = useState(true);
  const [missionWaiting, setMissionWaiting] = useState(true);
  const [notiModal, setNotiModal] = useState(false);

  //진행중 카드 목록
  const DataMissionsProgress = useQuery<IMissionProgress>(queryKey.MISSIONSPROGRESS, getMissionsProgress);
  //성공요청 카드 목록
  const DataMissionsSuccess = useQuery<IMission[]>(queryKey.MISSIONSSUCCESS, getMissionsSuccess);
  //Data___.data.키값(result내에서) 로 접근

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>미션</Text>
          {progressNow && (
            <TouchableOpacity onPress={() => setNotiModal(true)}>
              <Icon name="bell-outline" size={24} color="#323232" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1}}>
          {progressNow ? (
            // 스위치 '진행중' 일때
            <>
              <View style={[styles.missionUserNumberWrap]}>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey12]}>현재 </Text>
                <Text style={[DesignSystem.title3SB, DesignSystem.purple5]}>_명</Text>
                {/* <Text style={[DesignSystem.title3SB, DesignSystem.purple5]}>{DataMissionsProgress.missionOnProgressCount}명</Text> */}
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey12]}>의 유저가 미션을 진행하고 있습니다</Text>
              </View>
              <FlatList
                contentContainerStyle={{paddingTop: 12, paddingBottom: 50}}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={10}
                data={dummyMission}
                renderItem={({item}) => (
                  <>
                    <MissionUserCard
                      date={item.date}
                      mission={item.mission}
                      missionId={item.missionId}
                      point={item.point}
                      userId={item.userId}
                      userName={item.userName}
                    />
                  </>
                )}
              />
            </>
          ) : (
            // 스위치 '성공요청' 일때
            <>
              <View style={[styles.missionUserNumberWrap]}>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey12]}>현재 </Text>
                <Text style={[DesignSystem.title3SB, DesignSystem.purple5]}>_명</Text>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey12]}>의 유저가 미션을 진행하고 있습니다</Text>
              </View>
              <FlatList
                contentContainerStyle={{paddingTop: 12, paddingBottom: 50}}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                scrollEventThrottle={10}
                data={dummyMission}
                renderItem={({item}) => (
                  <MissionAcceptCard
                    date={item.date}
                    mission={item.mission}
                    missionId={item.missionId}
                    point={item.point}
                    userId={item.userId}
                    userName={item.userName}
                  />
                )}
              />
            </>
          )}
        </View>
        <View style={[DesignSystem.centerArrange]}>
          <MissionSwitch
            progressnow={progressNow}
            setProgressnow={setProgressNow}
            missionWaiting={missionWaiting}
          />
        </View>
        <NotiModal visible={notiModal} closeNotiModal={() => setNotiModal(false)} />
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
