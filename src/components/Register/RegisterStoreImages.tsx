import React from 'react';
import type {FC} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageInterface} from '../../data';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {registerStoreImage} from '../../state';
import {ScrollView} from 'react-native-gesture-handler';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
  maxHeight: 1600,
  maxWidth: 1000,
};

type RegisterStoreImagesProps = {
  onChange: (...event: any[]) => void;
  value: ImageInterface[];
  error: boolean;
};

export const RegisterStoreImages: FC<RegisterStoreImagesProps> = ({onChange, value, error}) => {
  const [storeImages, setStoreImages] = useRecoilState(registerStoreImage);
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

  const removeImage = (imageName: string) => {
    setStoreImages((current) =>
      current.filter((image) => {
        return image.name !== imageName;
      }),
    );
  };

  return (
    <View style={[styles.ImageSelectContainer]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게사진</Text>
          <Text style={{color: '#6C69FF'}}> * </Text>
          <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}> {storeImages.length}/10</Text>
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
        <TouchableOpacity
          style={
            storeImages.length > 9
              ? [styles.imageAddButton, {opacity: 0.2}]
              : [styles.imageAddButton]
          }
          onPress={openImagePicker}
          disabled={storeImages.length > 9}
        >
          <Icon name="plus" color="#111111" size={24} />
        </TouchableOpacity>
        <ScrollView horizontal>
          {storeImages.map((data, index) => {
            return (
              <View style={{marginRight: 8}} key={index}>
                <TouchableOpacity
                  onPress={() => {
                    removeImage(data.name);
                  }}
                  style={{position: 'absolute', top: 5, right: 5, zIndex: 1}}
                >
                  <View style={[styles.removeImageX]}>
                    <Icon name="close" size={14} color="#DFDFDF" />
                  </View>
                </TouchableOpacity>
                <Image source={{uri: data.uri}} style={{width: 80, height: 80}} />
              </View>
            );
          })}
        </ScrollView>
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
  removeImageX: {
    backgroundColor: '#2A2A2A',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
