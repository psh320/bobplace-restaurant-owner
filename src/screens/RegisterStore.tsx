import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RegisterHeader, RegisterNextButton} from '../components';
import {AuthStackParamList} from '../nav';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageInterface} from '../data';
import {RenderUploadImage} from '../components/common/RenderUploadImage';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStore'>;

const options: ImageLibraryOptions = {
  mediaType: 'photo',
};

const RegisterStore = ({navigation, route}: Props) => {
  const [imageData, setImageData] = useState<ImageInterface[]>([]);
  const goResult = () => {
    navigation.navigate('RegisterDone', {status: 0});
  };

  const goNext = () => {
    //imageData를 formdata로 만들어서 서버에 이미지 등록하기

    navigation.navigate('RegisterDone', {status: 1});
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
      setImageData([...imageData, data]);
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
    }
    console.log(result);
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={() => goResult()} pageNum={1} totalPage={1} />
      <View style={[styles.flex, styles.formWrap]}>
        <Text style={[styles.RegisterFormTitle]}>점포인증</Text>
        <View style={[styles.spaceBetween, styles.flexRow, styles.subtitleText]}>
          <Text>대표메뉴 미션을 위해 사용됩니다.</Text>
          <View style={[styles.flexRow]}>
            <Text style={{color: '#6C69FF'}}>*</Text>
            <Text>필수입력</Text>
          </View>
        </View>
        <View style={[styles.checklistWrap]}>
          <Text style={[styles.checklistText]}>1. 사업자 등록증</Text>
          <Text style={[styles.checklistText]}>2. 영업신고증</Text>
          <Text style={[styles.checklistText]}>3. 통장사본</Text>
          <Text style={[styles.checklistText]}>4. (선택)로고</Text>
        </View>
        <TouchableOpacity
          onPress={openImagePicker}
          style={{
            width: '100%',
            borderColor: '#C4C4C4',
            borderWidth: 1,
            height: 44,
            marginTop: 50,
            marginBottom: 16,
            borderRadius: 10,
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <View style={[styles.spaceBetween, styles.flexRow]}>
            <Text>이미지 첨부</Text>
            <Icon name="plus" size={22} color="#C4C4C4" />
          </View>
        </TouchableOpacity>
        <View>
          <RenderUploadImage imageData={imageData} setImageData={setImageData} imageSize={100} />
        </View>
      </View>
      <RegisterNextButton goNext={goNext} buttonState={1} />
    </SafeAreaView>
  );
};

export default RegisterStore;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  formWrap: {marginLeft: 16, marginRight: 16},
  RegisterFormTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    marginTop: 8,
  },
  checklistWrap: {
    marginTop: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  checklistText: {
    color: '#2A2A2A',
    fontSize: 14,
    lineHeight: 22,
  },
});
