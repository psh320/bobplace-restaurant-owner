import React, {useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../../components/Store/StoreMenuBar';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreStackParamList} from '../../nav/StoreNavigator';
import {StoreReviewCard} from '../../components/Store/StoreReviewCard';
import {PhotoModal} from '../../modal/PhotoModal';
import {DesignSystem} from '../../assets/DesignSystem';
import {useInfiniteQuery, useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getStoreData, getStoreReviewList} from '../../api/review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IStoreReview} from '../../data/IStore';
import {NoBobpool} from '../../components/common/NoBobpool';

const dummyReviews = [
  {
    name: '박성호',
    date: '2022-07-11T15:34:55.530Z',
    rate: 3,
    images: [
      {imageUrl: 'https://source.unsplash.com/1024x768/?tree'},
      {imageUrl: 'https://source.unsplash.com/1024x768/?girl'},
      {imageUrl: 'https://source.unsplash.com/1024x768/?boy'},
    ],
    content:
      '너무 맛있어요! 최고! 포인트도 낭낭하니 많아요~~~ 추천추천 미션밥파서블 덕분에 인생폈다',
    reviewId: 1,
    reply: [],
  },
  {
    name: '이아영',
    date: '2022-07-03T15:34:55.530Z',
    rate: 3,
    images: [{imageUrl: 'https://source.unsplash.com/1024x768/?tree'}],
    content:
      '너무 맛있어요! 최고! 너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!너무 맛있어요! 최고!',
    reviewId: 12,
    reply: [
      {
        date: '2022-07-19T15:34:55.530Z',
        reply: 'ㄳ',
        reviewReplyId: 0,
      },
    ],
  },
  {
    name: '이예진',
    date: '2022-07-12T15:34:55.530Z',
    rate: 3,
    images: [
      {imageUrl: 'https://source.unsplash.com/1024x768/?girl'},
      {imageUrl: 'https://source.unsplash.com/1024x768/?boy'},
    ],
    content: '너무 맛있어요! 최고!',
    reviewId: 13,
    reply: [
      {
        date: '2022-07-23T15:34:55.530Z',
        reply: 'ㄳ',
        reviewReplyId: 0,
      },
    ],
  },
  {
    name: '박승민',
    date: '2022-07-20T15:34:55.530Z',
    rate: 3,
    images: [],
    content: '너무 맛있어요! 최고!',
    reviewId: 14,
    reply: [
      {
        date: '2022-07-25T15:34:55.530Z',
        reply: 'ㄳ',
        reviewReplyId: 0,
      },
    ],
  },
  {
    name: '김진범',
    date: '2022-07-20T15:34:55.530Z',
    rate: 3,
    images: [
      {imageUrl: 'https://source.unsplash.com/1024x768/?tree'},
      {imageUrl: 'https://source.unsplash.com/1024x768/?girl'},
      {imageUrl: 'https://source.unsplash.com/1024x768/?boy'},
    ],
    content: '너무 맛있어요! 최고!',
    reviewId: 15,
    reply: [
      {
        date: '2022-07-30T15:34:55.530Z',
        reply: 'ㄳ',
        reviewReplyId: 0,
      },
    ],
  },
];

const RATEHALFWIDTH = (Dimensions.get('screen').width - 27) / 2;
type Props = StackScreenProps<StoreStackParamList, 'StoreReview'>;

const StoreReview = ({navigation, route}: Props) => {
  const insets = useSafeAreaInsets();

  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});
  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

  const reviewList = useInfiniteQuery(
    [queryKey.STOREREVIEWLIST, route.params.storeId],
    ({pageParam}) => getStoreReviewList({pageParam}, route.params.storeId),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.result.last === false) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    },
  );
  console.log('리뷰길이 ', reviewList.data?.pages[0].data.result.content.length);
  const reviewInfo = useQuery(queryKey.STOREINFO, () => getStoreData(route.params.storeId));
  console.log('vudwjs', reviewInfo.data);
  return (
    <>
      <View style={{height: insets.top, backgroundColor: '#FFFFFF'}} />
      <View style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>가게 관리</Text>
        </View>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission', {storeId: route.params.storeId})}
          toggleReview={() => navigation.navigate('StoreReview', {storeId: route.params.storeId})}
          storeStatus={2}
        />
        <View style={[styles.rateWrap]}>
          <View style={[styles.rateBox]}>
            <View style={[styles.rateEach]}>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 6}]}>
                가게 평점
              </Text>
              <Text style={[DesignSystem.subtitle2, DesignSystem.grey17]}>
                <Icon name="star" size={20} color={'#FFDE69'} /> {reviewInfo.data.averageRate}
              </Text>
            </View>
            <View style={[styles.rateSeperateLine]} />
            <View style={[styles.rateEach]}>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 6}]}>
                리뷰 개수
              </Text>
              <Text style={[DesignSystem.subtitle2, DesignSystem.grey17]}>
                {reviewInfo.data.reviewCount}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          {/* {reviewList.data?.pages[0].data.result.content.length > 0 ? ( */}
          {dummyReviews.length > 0 ? (
            <FlatList
              contentContainerStyle={{backgroundColor: '#FFFFFF'}}
              scrollEventThrottle={10}
              data={dummyReviews}
              // data={reviewList.data?.pages}
              renderItem={({item, index}) => {
                return (
                  <>
                    <StoreReviewCard
                      name={item.name}
                      date={item.date}
                      rate={item.rate}
                      content={item.content}
                      images={item.images}
                      reply={item.reply}
                      reviewId={item.reviewId}
                      storeId={route.params.storeId}
                      openPhotoModal={openPhotoModal}
                    />
                    {/* {item.data.result.content.map((review: IStoreReview, i: number) => (
                      <View key={i + index}>
                        <StoreReviewCard
                          name={review.name}
                          date={review.date}
                          rate={review.rate}
                          content={review.content}
                          images={review.images}
                          reply={review.reply}
                          reviewId={review.reviewId}
                          storeId={route.params.storeId}
                          openPhotoModal={openPhotoModal}
                        />
                      </View>
                    ))} */}
                  </>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={{height: 8, backgroundColor: '#F8F8F8'}} />
              )}
            />
          ) : (
            <NoBobpool category={'리뷰'} />
          )}

          <PhotoModal
            imageUri={reviewPhoto}
            visible={photoModal}
            closePhotoModal={() => setPhotoModal(false)}
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
  rateWrap: {
    padding: 12,
  },
  rateBox: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    paddingVertical: 9,
  },
  rateSeperateLine: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: '#EFEFEF',
  },
  rateEach: {
    width: RATEHALFWIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
