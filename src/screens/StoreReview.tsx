import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../components/Store/StoreMenuBar';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreStackParamList} from '../nav/StoreNavigator';

type Props = StackScreenProps<StoreStackParamList, 'StoreEdit'>;
const StoreReview = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{height: insets.top, backgroundColor: '#FFFFFF'}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[styles.screenHeaderTitle]}>가게 관리</Text>
        </View>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission')}
          toggleReview={() => navigation.navigate('StoreReview')}
          storeStatus={2}
        />
        <View>
          <Text>리뷰페이지</Text>
        </View>
      </View>
    </>
  );
};

export default StoreReview;

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
  screenHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    lineHeight: 24,
  },
});
