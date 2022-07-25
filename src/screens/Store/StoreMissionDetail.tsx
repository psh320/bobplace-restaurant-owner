import React from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreStackParamList} from '../../nav/StoreNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreMissionDetailCard} from '../../components/Store/StoreMissionDetailCard';
import {DesignSystem} from '../../assets/DesignSystem';
import {queryKey} from '../../api/queryKey';
import {useQuery} from 'react-query';
import {getMissionManageDetail} from '../../api/store';
import {NoBobpool} from '../../components/common/NoBobpool';

type Props = StackScreenProps<StoreStackParamList, 'StoreMissionDetail'>;

const StoreMissionDetail = ({navigation, route}: Props) => {
  const DataMissionManageDetail = useQuery(queryKey.MISSIONMANAGEDETAIL, () =>
    getMissionManageDetail(route.params.missionId),
  );
  return (
    <>
      <View style={{flex: 0, backgroundColor: 'white'}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap, {marginBottom: 8}]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={[DesignSystem.title4Md, {color: 'black'}]}>상세정보</Text>
          <Icon name="arrow-left" size={24} color="black" style={{opacity: 0}} />
        </View>
        {DataMissionManageDetail.data?.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={DataMissionManageDetail.isLoading}
                onRefresh={() => DataMissionManageDetail.refetch()}
              />
            }
            contentContainerStyle={{backgroundColor: '#F8F8F8'}}
            scrollEventThrottle={10}
            data={DataMissionManageDetail.data}
            renderItem={({item}) => (
              <StoreMissionDetailCard
                missionId={item.missionId}
                name={item.name}
                successDate={item.successDate}
                point={item.point}
                phone={item.phone}
                navigation={navigation}
              />
            )}
            ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
            ListFooterComponent={() => <View />}
            ListFooterComponentStyle={{margin: 20}}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{flex: 1}}
            refreshControl={
              <RefreshControl
                refreshing={DataMissionManageDetail.isLoading}
                onRefresh={() => DataMissionManageDetail.refetch()}
              />
            }
          >
            <NoBobpool category={'미션상세'} />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default StoreMissionDetail;

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
  },
  missionSeperate: {
    marginTop: 8,
  },
  missionStopText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard-SemiBold',
    color: '#C8C8C8',
  },
});
