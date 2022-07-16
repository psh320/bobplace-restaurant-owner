import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MissionUserCard} from '../components/mission/MissionUserCard';
import {MissionAcceptCard} from '../components/mission/MissionAcceptCard';
import {MissionSwitch} from '../components/mission/MissionSwitch';
import {DesignSystem} from '../assets/DesignSystem';
import { NotiModal } from '../modal/NotiModal';

const dummyMission = [
  {
    name: '김진범',
    userId: '0',
    time: '18:00:12',
    minCost: 10000,
    point: 500,
  },
  {
    name: '이예진',
    userId: '1',
    time: '14:01:23',
    minCost: 10000,
    point: 500,
  },
  {
    name: '박성호',
    userId: '2',
    time: '12:21:14',
    minCost: 10000,
    point: 500,
  },
  {
    name: '박성호',
    userId: '2',
    time: '12:21:14',
    minCost: 10000,
    point: 500,
  },
];

const Mission = () => {
  const [progressNow, setProgressNow] = useState(true);
  const [missionWaiting, setMissionWaiting] = useState(true);
  const [notiModal, setNotiModal] = useState(false);

  const numberOfUsers = dummyMission.length;
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>미션</Text>
          <TouchableOpacity onPress={() => setNotiModal(true)}>
            <Icon name="bell-outline" size={24} color="#323232" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          {progressNow ? (
            // 진행중 스위치
            <>
              <View style={[styles.missionUserNumberWrap]}>
                <Text style={{color: '#323232', fontSize: 16}}>현재 </Text>
                <Text style={{color: '#6C69FF', fontSize: 16}}>{numberOfUsers}명</Text>
                <Text style={{color: '#323232', fontSize: 16}}>
                  의 유저가 미션을 진행하고 있습니다
                </Text>
              </View>
              <FlatList
                contentContainerStyle={{paddingTop: 12}}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={10}
                data={dummyMission}
                renderItem={({item}) => (
                  <MissionUserCard
                    time={item.time}
                    name={item.name}
                    userId={item.userId}
                    minCost={item.minCost}
                    point={item.point}
                  />
                )}
              />
            </>
          ) : (
            // 성공요청 스위치
            <>
              <View style={[styles.missionUserNumberWrap]}>
                <Text style={{color: '#323232', fontSize: 16}}>현재 </Text>
                <Text style={{color: '#6C69FF', fontSize: 16}}>{numberOfUsers}명</Text>
                <Text style={{color: '#323232', fontSize: 16}}>
                  의 유저가 미션을 진행하고 있습니다
                </Text>
              </View>
              <FlatList
                contentContainerStyle={{paddingTop: 12}}
                scrollEventThrottle={10}
                data={dummyMission}
                renderItem={({item}) => (
                  <MissionAcceptCard
                    name={item.name}
                    time={item.time}
                    minCost={item.minCost}
                    point={item.point}
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
    paddingBottom: 14,
    paddingTop: 8,
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
  missionSeperate: {
    marginTop: 16,
  },
});
