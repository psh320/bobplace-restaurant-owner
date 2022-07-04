import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../components/Store/StoreMenuBar';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreStackParamList} from '../nav/StoreNavigator';
import {StoreReviewCard} from '../components/Store/StoreReviewCard';

const dummyReviews = [
  {
    name: '박성호',
    date: '2022-06-16',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?tree', id: 0},
      {uri: 'https://source.unsplash.com/1024x768/?girl', id: 1},
      {uri: 'https://source.unsplash.com/1024x768/?boy', id: 2},
    ],
    review:
      '너무 맛있어요! 최고! 포인트도 낭낭하니 많아요~~~ 추천추천 미션밥파서블 덕분에 인생폈다',
  },
  {
    name: '이아영',
    date: '2022-06-14',
    rate: 3,
    images: [{uri: 'https://source.unsplash.com/1024x768/?tree', id: 3}],
    review:
      '너무 맛있어요! 최고! 너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!',
  },
  {
    name: '이예진',
    date: '2022-06-13',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?girl', id: 4},
      {uri: 'https://source.unsplash.com/1024x768/?boy', id: 5},
    ],
    review: '너무 맛있어요! 최고!',
  },
  {
    name: '박승민',
    date: '2022-06-12',
    rate: 3,
    images: [],
    review: '너무 맛있어요! 최고!',
  },
  {
    name: '김진범',
    date: '2022-06-10',
    rate: 3,
    images: [
      {uri: 'https://source.unsplash.com/1024x768/?tree', id: 6},
      {uri: 'https://source.unsplash.com/1024x768/?girl', id: 7},
      {uri: 'https://source.unsplash.com/1024x768/?boy', id: 8},
    ],
    review: '너무 맛있어요! 최고!',
  },
];

type Props = StackScreenProps<StoreStackParamList, 'StoreReview'>;
const StoreReview = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();

  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});
  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

  const renderedReviews = (data: any) => {
    return (
      <>
        {data.map((item: any, index: number) => {
          return (
            <StoreReviewCard
              key={index}
              name={item.name}
              date={item.date}
              rate={item.rate}
              review={item.review}
              images={item.images}
              openPhotoModal={openPhotoModal}
            />
          );
        })}
      </>
    );
  };

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
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{backgroundColor: '#FFFFFF'}}
            scrollEventThrottle={10}
            data={dummyReviews}
            renderItem={({item, index}) => (
              <StoreReviewCard
                key={index}
                name={item.name}
                date={item.date}
                rate={item.rate}
                review={item.review}
                images={item.images}
                openPhotoModal={openPhotoModal}
              />
            )}
          />
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

  screenHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    lineHeight: 24,
  },
});
