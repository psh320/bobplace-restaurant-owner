import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MissionUserCard} from '../../components/mission/MissionUserCard';
import {StoreMenuBar} from '../../components/Store/StoreMenuBar';
import {StoreInfo} from '../../components/Store/StoreInfo';
import {useNavigation} from '@react-navigation/native';

import {StoreStackParamList} from '../../nav/StoreNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreMissionCard} from '../../components/Store/StoreMissionCard';
import {MissionStopModal} from '../../modal/MissionStopModal';
import {DesignSystem} from '../../assets/DesignSystem';
import {getMissionManage, getMissionManageCount} from '../../api/store';
import {queryKey} from '../../api/queryKey';
import {useQuery} from 'react-query';

type Props = StackScreenProps<StoreStackParamList, 'StoreMission'>;

const StoreMission = ({navigation}: Props) => {
  const [missionStopModal, setMissionStopModal] = useState(false);
  const [pressedMissionGId, setPressedMissionGId] = useState(0);
  const insets = useSafeAreaInsets();
  const [eyeballs, setEyeballs] = useState(1);
  getMissionManageCount().then((res) => {
    setEyeballs(res);
  });
  const DataMissionManage = useQuery(queryKey.MISSIONMANAGE, getMissionManage);
  console.log('DataMissionManage', DataMissionManage);

  return (
    <>
      <View style={{backgroundColor: '#FFFFFF', height: insets.top}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>가게 관리</Text>
        </View>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission')}
          toggleReview={() => navigation.navigate('StoreReview')}
          storeStatus={1}
        />

        <View style={[styles.missionUserNumberWrap]}>
          <Text style={[styles.missionStatText]}>최근 7일 미션이 총 </Text>
          <Text style={[styles.missionStatPointText]}>{eyeballs}명</Text>
          <Text style={[styles.missionStatText]}> 에게 노출되었어요</Text>
        </View>
        {DataMissionManage.data?.length !== 0 ? (
          <FlatList
            contentContainerStyle={{backgroundColor: '#F8F8F8'}}
            scrollEventThrottle={10}
            data={DataMissionManage.data}
            renderItem={({item}) => (
              <StoreMissionCard
                category={item.category}
                mission={item.mission}
                missionGroupId={item.missionGroupId}
                missionGroupStatus={item.missionGroupStatus}
                name={item.name}
                point={item.point}
                navigation={navigation}
              />
            )}
            ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
            ListFooterComponent={() => (
              <TouchableOpacity
                onPress={() => {
                  setMissionStopModal(true);
                }}
                style={[styles.missionStopButtonWrap]}
              >
                <View>
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>
                    전체 배포 중지 요청
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>설정한 미션이 없는경우. 그럴수가 있나 ? ㅇㅁㅇ~</Text>
        )}
        <MissionStopModal
          visible={missionStopModal}
          closeMissionStopModal={() => {
            setMissionStopModal(false);
          }}
        />
      </View>
    </>
  );
};

export default StoreMission;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
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
    marginBottom: 16,
  },
  missionSeperate: {
    marginTop: 10,
  },
  missionStatText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Light',
    color: '#3F3F3F',
  },
  missionStatPointText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#6C69FF',
  },
  missionStopButtonWrap: {
    width: '100%',
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
