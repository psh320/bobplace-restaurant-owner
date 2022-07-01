import React from 'react';

import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {ImageInterface} from '../../data';
import {RenderImageList} from '../common/RenderImageList';
import {StoreTime} from './StoreTime';
import {storeData} from '../../state';
import {useRecoilValue} from 'recoil';
const dot = () => {
  const dotStyle = {
    backgroundColor: '#ffffffb2',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={dotStyle} />;
};
const activeDot = () => {
  const activeDotStyle = {
    backgroundColor: '#6C69FF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: -10,
  };
  return <View style={activeDotStyle} />;
};

const dummyImage: ImageInterface[] = [
  {uri: 'https://source.unsplash.com/1024x768/?food', type: 'image/jpg', name: '1.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?snack', type: 'image/jpg', name: '2.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?candy', type: 'image/jpg', name: '3.jpg'},
];

export const StoreInfo = () => {
  const store = useRecoilValue(storeData);
  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={{height: 220, width: '100%'}}>
        <Swiper
          dot={dot()}
          activeDot={activeDot()}
          showsButtons={false}
          removeClippedSubviews={false}
          scrollEnabled={true}
        >
          <FastImage
            source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
            style={{width: '100%', height: 220}}
          />
          <FastImage
            source={{uri: 'https://source.unsplash.com/1024x768/?water'}}
            style={{width: '100%', height: 220}}
          />
          <FastImage
            source={{uri: 'https://source.unsplash.com/1024x768/?girl'}}
            style={{width: '100%', height: 220}}
          />
          <FastImage
            source={{uri: 'https://source.unsplash.com/1024x768/?tree'}}
            style={{width: '100%', height: 220}}
          />
        </Swiper>
      </View>
      <View style={[styles.storeInfoWrap]}>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>상호명</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[styles.fieldTitle]}>{store.storeName}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>가게 한줄 소개</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[styles.fieldTitle]}>{store.storeName}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>가게주소</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[styles.fieldTitle]}>{store.addressStreet}</Text>
          </View>
          <View style={[styles.fieldBox]}>
            <Text style={[styles.fieldTitle]}>{store.addressDong}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>가게 유형</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[styles.fieldTitle]}>{store.storeTypeId}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>테이블 수</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[styles.fieldTitle]}>{store.tableNum}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>대표메뉴</Text>
          <Text style={[styles.fieldSubTitle, {fontWeight: '300'}]}>
            대표메뉴 미션을 위해 사용됩니다.
          </Text>
          <View style={[styles.fieldBox]}>
            <Text style={[styles.fieldTitle]}>{store.representativeMenuName}</Text>
          </View>
        </View>

        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>대표메뉴 사진</Text>
          <View>
            <RenderImageList imageData={dummyImage} imageSize={100} />
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[styles.fieldTitle, {fontWeight: '500'}]}>운영시간</Text>
          <StoreTime operationData={store.operationTimeVO} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});
