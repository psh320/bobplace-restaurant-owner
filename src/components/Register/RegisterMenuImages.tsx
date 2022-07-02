import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageInterface, RegisterStoreInterface} from '../../data';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RenderUploadImage} from '../common/RenderUploadImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
};

type RegisterMenuImagesProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
  onChange: (...event: any[]) => void;
  value: number;
};

export const RegisterMenuImages: FC<RegisterMenuImagesProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
}) => {
  const [menuImages, setMenuImages] = useState(registerData.menuImage);
  console.log(value);
  useEffect(() => {
    setRegisterData({...registerData, menuImage: menuImages});
    onChange(menuImages.length);
  }, [menuImages]);

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
      setMenuImages([...menuImages, data]);
      onChange(menuImages.length);
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
      setMenuImages([...menuImages, data]);
      onChange(menuImages.length);
    }
    console.log(result);
  };
  //여기까지 이미지 등록!

  return (
    <View style={[styles.ImageSelectContainer]}>
      <View style={[styles.flexRow, {alignItems: 'baseline'}]}>
        <Text style={[styles.formHeadText]}>대표메뉴 사진</Text>
        <Text style={[styles.formSubText]}> 1/8</Text>
      </View>
      <Text style={[styles.formSubText, {marginBottom: 12}]}>
        가게를 대표하는 사진을 첨부해주세요!
      </Text>

      <View style={[styles.flexRow, {alignItems: 'center'}]}>
        <TouchableOpacity style={[styles.imageAddButton]} onPress={openImagePicker}>
          <Icon name="plus" size={24} />
        </TouchableOpacity>
        <RenderUploadImage imageData={menuImages} setImageData={setMenuImages} imageSize={80} />
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
