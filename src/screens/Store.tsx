import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MissionUserCard} from '../components/mission/MissionUserCard';
import {MissionAcceptCard} from '../components/mission/MissionAcceptCard';
import {MissionSwitch} from '../components/mission/MissionSwitch';
import {StoreMenuBar} from '../components/Store/StoreMenuBar';

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
];

const Store = () => {
  //0
  const [storeStatus, setStoreStatus] = useState(0);
  const [missionWaiting, setMissionWaiting] = useState(true);

  const numberOfUsers = dummyMission.length;

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 0}} />
      <SafeAreaView style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text>가게 관리</Text>
        </View>
        <StoreMenuBar
          toggleStore={() => setStoreStatus(0)}
          toggleMission={() => setStoreStatus(1)}
          toggleReview={() => setStoreStatus(2)}
          storeStatus={storeStatus}
        />
        {storeStatus ? (
          <FlatList
            contentContainerStyle={{flex: 1, backgroundColor: '#F8F8F8', marginTop: 12}}
            scrollEventThrottle={10}
            data={dummyMission}
            renderItem={({item}) => (
              <MissionAcceptCard
                name={item.name}
                time={item.time}
                minCost={item.minCost}
                point={item.point}
                status="start"
              />
            )}
            ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
          />
        ) : (
          <>
            <View style={[styles.missionUserNumberWrap]}>
              <Text>현재 </Text>
              <Text>{numberOfUsers}명</Text>
              <Text>의 유저가 미션을 진행하고 있습니다</Text>
            </View>

            <FlatList
              contentContainerStyle={{flex: 1, backgroundColor: '#F8F8F8', marginTop: 12}}
              scrollEventThrottle={10}
              data={dummyMission}
              renderItem={({item}) => (
                <MissionUserCard
                  name={item.name}
                  time={item.time}
                  minCost={item.minCost}
                  point={item.point}
                  status="start"
                />
              )}
              ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default Store;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  screenHeaderWrap: {
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
  screenStatusWrap: {flexDirection: 'row', flex: 1, backgroundColor: '#FFFFFF'},
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
