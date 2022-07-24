import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {storeData, storeImage} from '../state';
import {useRecoilState} from 'recoil';
import {ImageSwiper} from '../components/common/ImageSwiper';
import {ImageInterface, RegisterStoreInterface} from '../data';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {postStoreImages} from '../api/register';
import {patchDeleteStoreImage} from '../api/store';

type ImageSwiperModalProps = {
  visible: boolean;
  closeImageSwiperModal: () => void;
};
const options: ImageLibraryOptions = {
  mediaType: 'photo',
};
export const ImageSwiperModal: FC<ImageSwiperModalProps> = ({visible, closeImageSwiperModal}) => {
  const [imageData, setImageData] = useRecoilState(storeImage);
  const [error, setError] = useState(false);

  const storeId = 0; //리코일 storeId 가져오기

  useEffect(() => {
    if (imageData.length > 0) {
      setError(false);
    }
  }, [imageData]);

  const removeImage = (storeImageId: string) => {
    patchDeleteStoreImage(storeImageId);
  };

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
      const response = postStoreImages([data], storeId);
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
      postStoreImages([data], storeId);
    }
    console.log(result);
  };

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
              if (imageData.length <= 0) {
                setError(true);
              } else {
                closeImageSwiperModal();
              }
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
          <ScrollView horizontal>
            {imageData.map((item, index) => {
              return (
                <View key={index} style={{marginRight: 8, borderColor: '#DFDFDF', borderWidth: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      removeImage(item.storeImageId);
                    }}
                    style={{position: 'absolute', top: 5, right: 5, zIndex: 1}}
                  >
                    <View
                      style={{
                        backgroundColor: '#2A2A2A',
                        width: 18,
                        height: 18,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Icon name="close" size={14} color="#DFDFDF" />
                    </View>
                  </TouchableOpacity>
                  <Image source={{uri: item.imageURL}} style={{width: 80, height: 80}} />
                </View>
              );
            })}
          </ScrollView>
        </View>
        {error && <Text>최소 한장은 올려야합니다</Text>}
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
