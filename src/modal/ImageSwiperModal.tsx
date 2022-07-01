import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {storeData} from '../state';
import {useRecoilState} from 'recoil';
import {ImageSwiper} from '../components/common/ImageSwiper';
import {RenderUploadImage} from '../components/common/RenderUploadImage';
import {ImageInterface} from '../data';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';

type ImageSwiperModalProps = {
  visible: boolean;
  closeImageSwiperModal: () => void;
};
const options: ImageLibraryOptions = {
  mediaType: 'photo',
};
export const ImageSwiperModal: FC<ImageSwiperModalProps> = ({visible, closeImageSwiperModal}) => {
  const [store, setStore] = useRecoilState(storeData);
  const [imageData, setImageData] = useState(store.storeImage);

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
      setImageData([...imageData, data]);
      //onChange([...value, data]);
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
      setImageData([...imageData, data]);
      //onChange([...value, data]);
    }
    console.log(result);
  };

  useEffect(() => {
    setStore({...store, storeImage: imageData});
  }, [imageData]);
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.modalHeader]}>
          <TouchableOpacity onPress={closeImageSwiperModal}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.storeHeaderText]}>가게 대표 사진</Text>
          <TouchableOpacity
            onPress={() => {
              setStore({...store, storeImage: imageData});
              closeImageSwiperModal();
            }}
          >
            <View style={[styles.backButton]}>
              <Text>저장</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ImageSwiper height={220} imageList={imageData} />
        <View style={[styles.flexRow, {alignItems: 'center'}]}>
          <TouchableOpacity style={[styles.imageAddButton]} onPress={openImagePicker}>
            <Icon name="plus" size={24} />
          </TouchableOpacity>
          <RenderUploadImage imageData={imageData} setImageData={setImageData} imageSize={80} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  backButton: {
    margin: 10,
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  storeHeaderText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
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
});
