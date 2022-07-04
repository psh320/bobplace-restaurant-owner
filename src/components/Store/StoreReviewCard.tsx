import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type StoreReviewCardProps = {
  images: {uri: string; id: number}[] | [];
  name: string;
  date: string;
  rate: number;
  review: string;
  openPhotoModal: (imageSource: string) => void;
};

export const StoreReviewCard: FC<StoreReviewCardProps> = ({
  images,
  name,
  date,
  rate,
  review,
  openPhotoModal,
}) => {
  const [openReply, setOpenReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const renderedImage = (imagedata: {uri: string; id: number}[]) => {
    return (
      <View style={[styles.reviewRow3]}>
        {imagedata.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => openPhotoModal(item.uri)}>
              <View style={[styles.reviewImageWrap]} key={item.id}>
                <FastImage source={{uri: item.uri}} style={[styles.imageSize]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={[styles.reviewWrap]}>
      <View style={[styles.reviewRow1]}>
        <Text>{name}</Text>
        <Text>{date}</Text>
      </View>
      <View style={[styles.reviewRow2]}>
        {[...Array(rate)].map((e, i) => (
          <Icon name="star" size={18} color={'#FFDE69'} />
        ))}
      </View>
      <View style={[styles.reviewRow3]}>
        <Text style={[styles.reviewText]}>{review}</Text>
      </View>
      {renderedImage(images)}
      {openReply && (
        <TextInput
          style={[styles.replyContent]}
          multiline={true}
          placeholder={'취소 사유 작성'}
          selectionColor={'#6C69FF'}
          onChangeText={(text: string) => {
            setReplyContent(text);
          }}
          value={replyContent}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          if (openReply) {
            //post 올리기

            setReplyContent('');
            setOpenReply(false);
          } else {
            setOpenReply(true);
          }
        }}
        style={replyContent !== '' ? styles.replyButtonConfrim : styles.replayButton}
      >
        <Text>답글 달기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewListWrap: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  reviewWrap: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
    paddingTop: 24,
  },
  reviewRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  reviewRow2: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  reviewRow3: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  reviewImageWrap: {marginRight: 8},
  reviewText: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  reviewRate: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    marginLeft: 4,
  },
  imageSize: {
    height: 80,
    width: 80,
  },
  replayButton: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  replyContent: {
    width: '100%',
    height: 90,
    flexWrap: 'wrap',
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    borderRadius: 10,
    marginTop: 8,
  },
  replyButtonConfrim: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#6C69FF',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
