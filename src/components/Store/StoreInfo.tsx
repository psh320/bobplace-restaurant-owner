import React from 'react';

import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {ImageInterface, RegisterStoreInterface} from '../../data';
import {RenderImageList} from '../common/RenderImageList';
import {StoreTime} from './StoreTime';
import {storeGetData} from '../../state';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ImageSwiper} from '../common/ImageSwiper';
import {DesignSystem} from '../../assets/DesignSystem';
import {queryKey} from '../../api/queryKey';
import {getStoreInfo} from '../../api/store';
import {useQuery} from 'react-query';

const dummyImage: ImageInterface[] = [
  {uri: 'https://source.unsplash.com/1024x768/?food', type: 'image/jpg', name: '1.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?snack', type: 'image/jpg', name: '2.jpg'},
  {uri: 'https://source.unsplash.com/1024x768/?candy', type: 'image/jpg', name: '3.jpg'},
];
//prettier-ignore
const STORETYPE = ['', '한식당', '일식당', '중식당', '양식당', '치킨집', '분식집', '고기/구이', '도시락', '야식(족발,보쌈)', '패스트푸드', '디저트/카페', '아시안푸드'];

export const StoreInfo = () => {
  const store = useRecoilValue(storeGetData); //쿼리?
  console.log('storeInfo에서 store', store);
  // const DataStoreInfo = useQuery(queryKey.STOREINFO, getStoreInfo);
  // const [RCstoreInfo, setRCstoreInfo] = useRecoilState<RegisterStoreInterface>(DataStoreInfo.data);
  // console.log('datasroeInfo query', DataStoreInfo);
  // console.log('datasroeInfo rcrc', RCstoreInfo);

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      {/* <ImageSwiper height={220} imageList={store.sztoreImage} /> */}
      {/* 가게관리에서 가게대표 이미지수정되면 살리기 */}
      <View style={[styles.storeInfoWrap]}>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>상호명</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.storeName}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>가게 한줄 소개</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.intro}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게 주소</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.addressStreet}</Text>
          </View>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.addressDong}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게 유형</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
              {STORETYPE[store.storeTypeId]}
            </Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>테이블 수</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
              {store.tableNum === 0 ? '0~2개' : '3개 이상'}
            </Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>대표메뉴</Text>
          <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}>
            대표메뉴 미션을 위해 사용됩니다.
          </Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
              {store.representativeMenuName}
            </Text>
          </View>
        </View>

        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>대표메뉴 사진</Text>
          <View>{/* <RenderImageList imageData={store.menuImage} imageSize={100} /> */}</View>
          {/* 가게관리에서 메뉴 이미지수정되면 살리기 */}
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>운영시간</Text>
          <StoreTime operationData={store.operationTimeRes} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storeInfoWrap: {flex: 1, marginLeft: 16, marginRight: 16, marginTop: 24, marginBottom: 24},
  infoFieldWrap: {marginBottom: 28, width: '100%'},
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
