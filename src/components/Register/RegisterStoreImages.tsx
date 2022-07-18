import React from 'react';
import type {FC} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageInterface} from '../../data';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RenderUploadImage} from '../common/RenderUploadImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
};

type RegisterStoreImagesProps = {
  setStoreImages: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
  storeImages: ImageInterface[];
  onChange: (...event: any[]) => void;
  value: ImageInterface[];
  error: boolean;
};

export const RegisterStoreImages: FC<RegisterStoreImagesProps> = ({
  setStoreImages,
  storeImages,
  onChange,
  value,
  error,
}) => {
  //이미지 등록 시작!
  const openImagePicker = () => {
    Alert.alert('사진', '어떻게 가져올까요?', [
      {
        text: '카메라 ',
        onPress: () => selectImageFromCamera(),
      },
      {text: '갤러리 선택', onPress: () => selectImageFromGallery()},
    ]);
  };

  const selectImageFromGallery = async () => {
    const result = await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('취소');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }
    });
    if (result.assets) {
      const data: ImageInterface = {
        uri: result.assets[0].uri as string,
        type: result.assets[0].type as string,
        name: result.assets[0].fileName as string,
      };
      setStoreImages([...storeImages, data]);
      onChange([...value, data]);
    }
    console.log(result);
  };

  const selectImageFromCamera = async () => {
    const result = await launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('취소');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }
    });
    if (result.assets) {
      const data: ImageInterface = {
        uri: result.assets[0].uri as string,
        type: result.assets[0].type as string,
        name: result.assets[0].fileName as string,
      };
      setStoreImages([...storeImages, data]);
      onChange([...value, data]);
    }
    console.log(result);
  };
  //여기까지 이미지 등록!

  return (
    <View style={[styles.ImageSelectContainer]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게사진</Text>
          <Text style={{color: '#6C69FF'}}> * </Text>
          <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}> 1/3</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#6C69FF'}}>* </Text>
          <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>필수입력</Text>
        </View>
      </View>
      <Text style={[DesignSystem.body2Lt, DesignSystem.grey9, {marginBottom: 12}]}>
        가게를 대표하는 사진을 첨부해주세요!
      </Text>

      <View style={[styles.flexRow, {alignItems: 'center'}]}>
        <TouchableOpacity style={[styles.imageAddButton]} onPress={openImagePicker}>
          <Icon name="plus" size={24} />
        </TouchableOpacity>
        <RenderUploadImage imageData={storeImages} setImageData={setStoreImages} imageSize={80} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageAddButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    marginRight: 8,
  },
  flexRow: {
    flexDirection: 'row',
  },
  ImageSelectContainer: {
    width: '100%',
    marginTop: 24,
  },
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  formSubText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#777777',
  },
});
