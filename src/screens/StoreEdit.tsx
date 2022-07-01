import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../components/Store/StoreMenuBar';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreStackParamList} from '../nav/StoreNavigator';
import {useForm, Controller} from 'react-hook-form';
import {StoreTime} from '../components/Store/StoreTime';
import {RenderImageList} from '../components/common/RenderImageList';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {ImageInterface, RegisterStoreInterface} from '../data';
import {storeData} from '../state';
import {useRecoilState} from 'recoil';
import {ImageSwiper} from '../components/common/ImageSwiper';
import {ImageSwiperModal} from '../modal/ImageSwiperModal';

type Props = StackScreenProps<StoreStackParamList, 'StoreEdit'>;

const dummyImage: ImageInterface[] = [
  {uri: 'https://source.unsplash.com/1024x768/?food', type: 'image/jpg', name: '1.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?snack', type: 'image/jpg', name: '2.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?candy', type: 'image/jpg', name: '3.jpg'},
];

const StoreEdit = ({navigation}: Props) => {
  const [store, setStore] = useRecoilState(storeData);
  const [storeEditData, setStoreEditData] = useState(store);
  const [imageSwiperModal, setImageSwiperModal] = useState(false);
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      storeName: store.storeName,
      storeTypeId: store.storeTypeId,
      tableNum: store.tableNum,
      address: store.addressStreet,
      representativeMenuName: store.representativeMenuName,
      storeImage: store.storeImage,
      menuImage: store.menuImage,
      description: store.description,
    },
  });

  return (
    <View style={[styles.flex, {paddingTop: insets.top}]}>
      <View style={[styles.screenHeaderWrap]}>
        <Text style={[styles.screenHeaderTitle]}>가게 관리</Text>
        <TouchableOpacity
          onPress={() => {
            setStore(storeEditData);
            navigation.goBack();
          }}
        >
          <Text style={[styles.screenHeaderTitle, {color: '#6C69FF'}]}>저장</Text>
        </TouchableOpacity>
      </View>
      <View pointerEvents="none" style={{opacity: 0.5}}>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission')}
          toggleReview={() => navigation.navigate('StoreReview')}
          storeStatus={0}
        />
      </View>

      <KeyboardAvoidingView
        style={[{flex: 1}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{backgroundColor: '#FFFFFF'}}>
          <View>
            <ImageSwiperModal
              visible={imageSwiperModal}
              closeImageSwiperModal={() => setImageSwiperModal(false)}
            />
            <ImageSwiper height={220} imageList={store.storeImage} />
            <TouchableOpacity
              style={[styles.editImageSwiperButton]}
              onPress={() => setImageSwiperModal(true)}
            >
              <View style={[styles.editImageSwiperIcon]}>
                <Icon name="pencil" size={18} color="#323232" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.storeInfoWrap]}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default StoreEdit;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
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

  storeInfoWrap: {flex: 1, marginLeft: 16, marginRight: 16, marginTop: 24, marginBottom: 24},
  infoFieldWrap: {marginBottom: 28, width: '100%'},
  fieldTitle: {fontSize: 16, lineHeight: 24, fontFamily: 'Pretendard-Regular', color: '#111111'},
  fieldSubTitle: {fontSize: 14, lineHeight: 22, fontFamily: 'Pretendard-Regular', color: '#777777'},
  fieldBox: {
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
  screenHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    lineHeight: 24,
  },

  editImageSwiperButton: {position: 'absolute', right: 20, bottom: 20},
  editImageSwiperIcon: {
    height: 24,
    width: 24,
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
