import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreStackParamList} from '../nav/StoreNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {CancelPointModal} from '../modal/CancelPointModal';

type Props = StackScreenProps<StoreStackParamList, 'StoreMissionPayment'>;

const dummyPurchase = {
  userName: '박승민',
  purchaseDate: '2022.02.02 월요일 12:07:13',
  point: 500,
  purchaseId: 1223,
};

const StoreMissionPayment = ({navigation, route}: Props) => {
  const [cancelPointModal, setCancelPointModal] = useState(false);
  const [cancelContent, setCancelContent] = useState('');
  const insets = useSafeAreaInsets();
  const missionList = route.params.purchaseId; //이 미션 아이디로 get 하기.
  return (
    <>
      {cancelPointModal ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 10,
          }}
        />
      ) : (
        <View />
      )}
      <View style={{backgroundColor: '#FFFFFF', height: insets.top}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={[styles.screenHeaderTitle]}>결제 취소 요청</Text>
          <Icon name="arrow-left" size={24} color="black" style={{opacity: 0}} />
        </View>

        <View style={[styles.missionCard]}>
          <View style={[styles.cancelWrap]}>
            <Text style={[styles.headText]}>상세정보</Text>
          </View>

          <View style={[styles.seperateLine]} />

          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>고객명</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.userName}</Text>
          </View>
          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>결제일</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.purchaseDate}</Text>
          </View>
          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>포인트</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.point}P</Text>
          </View>
          <View style={[styles.infoRow]}>
            <Text style={[styles.fieldText]}>구분번호</Text>
            <Text style={[styles.normalText]}>{dummyPurchase.purchaseId}</Text>
          </View>
        </View>
        <View style={[styles.cancelBox]}>
          <Text style={[styles.headText]}>취소사유</Text>
          <TextInput
            style={[styles.cancelContent]}
            multiline={true}
            placeholder={'취소 사유 작성'}
            selectionColor={'#6C69FF'}
            onChangeText={(text) => {
              setCancelContent(text);
            }}
            value={cancelContent}
          />
        </View>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            setCancelPointModal(true);
          }}
          style={{margin: 16}}
        >
          <View
            style={{
              width: '100%',
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#6C69FF',
              borderRadius: 10,
            }}
          >
            <Text style={styles.submitText}>결제 취소 신청</Text>
          </View>
        </TouchableOpacity>
        <CancelPointModal
          visible={cancelPointModal}
          closeCancelPointModal={() => setCancelPointModal(false)}
        />
      </View>
    </>
  );
};

export default StoreMissionPayment;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F6F6FA'},
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
    marginTop: 8,
  },
  screenHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    lineHeight: 24,
  },
  missionStopText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard-SemiBold',
    color: '#C8C8C8',
  },

  missionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    padding: 16,
  },
  cancelWrap: {justifyContent: 'center', alignItems: 'flex-start'},
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#DFDFDF',
    marginBottom: 12,
  },
  nameText: {
    fontFamily: 'Pretendard-Medium',
    color: '#111111',
    fontSize: 16,
    lineHeight: 24,
  },
  fieldText: {
    fontFamily: 'Pretendard-Light',
    color: '#616161',
    fontSize: 16,
    lineHeight: 24,
  },
  headText: {
    fontFamily: 'Pretendard-Medium',
    color: '#111111',
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
  },

  normalText: {fontFamily: 'Pretendard-Medium', color: '#111111', fontSize: 16, lineHeight: 24},
  cancelBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  cancelContent: {
    width: '100%',
    height: 164,
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  submitText: {
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 26,
  },
});
