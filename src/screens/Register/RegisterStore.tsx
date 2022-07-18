import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RegisterHeader, RegisterNextButton} from '../../components';
import {AuthStackParamList} from '../../nav';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageLibraryOptions, launchImageLibrary} from 'react-native-image-picker';
import {ImageInterface} from '../../data';
import {RenderUploadImage} from '../../components/common/RenderUploadImage';
import {DesignSystem} from '../../assets/DesignSystem';
import {postStoreAuthImages} from '../../api/register';

type imageData = {
  uri: string;
  type: string;
  name: string;
};
const options: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
};
type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStore'>;

const RegisterStore = ({navigation, route}: Props) => {
  const [imageData, setImageData] = useState<ImageInterface[]>([]);
  const [imageUri, setImageUri] = useState<imageData[]>([]);
  const goResult = () => {
    navigation.navigate('RegisterDone', {status: 0});
  };

  const goNext = async () => {
    //imageData를 formdata로 만들어서 서버에 이미지 등록하기
    // await postStoreAuthImages(imageUri);////////////////////////////////////////////////////
    navigation.navigate('RegisterDone', {status: 1});
  };

  const showImageLibrary = async () => {
    const result = await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('취소');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }
    });
    if (result.assets) {
      const data: imageData = {
        uri: result.assets[0].uri as string,
        type: result.assets[0].type as string,
        name: result.assets[0].fileName as string,
      };
      setImageUri([...imageUri, data]);
    }
    console.log(result);
  };
  const removeImage = (imageName: string) => {
    setImageUri((current) =>
      current.filter((image) => {
        return image.name !== imageName;
      }),
    );
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={() => goResult()} pageNum={1} totalPage={1} />
      <View style={[styles.flex, styles.formWrap]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.RegisterFormTitle]}>
            점포인증
            <Text style={{color: '#6C69FF'}}> *</Text>
          </Text>
          <View style={[styles.flexRow]}>
            <Text style={{color: '#6C69FF'}}>* </Text>
            <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>필수입력</Text>
          </View>
        </View>
        <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}>
          입점을 위한 점포인증 자료를 첨부해주세요.
        </Text>
        <View style={[styles.checklistWrap]}>
          <Text style={[DesignSystem.body2Lt, {color: '#1E1E1E'}]}>1. 사업자 등록증</Text>
          <Text style={[DesignSystem.body2Lt, {color: '#1E1E1E'}]}>2. 영업신고증</Text>
          <Text style={[DesignSystem.body2Lt, {color: '#1E1E1E'}]}>3. 통장사본</Text>
          <Text style={[DesignSystem.body2Lt, {color: '#1E1E1E'}]}>4. (선택) 로고</Text>
        </View>
        {/* //////////////////////////////////////이미지첨부///////////////// */}
        <View style={[styles.flexRow]}>
          <TouchableOpacity
            style={
              imageUri.length >= 3
                ? [styles.imageAddButton, {opacity: 0.2}]
                : [styles.imageAddButton]
            }
            onPress={showImageLibrary}
            disabled={imageUri.length >= 3}
          >
            <Icon name="plus" size={24} />
          </TouchableOpacity>
          {imageUri.map((data, index) => {
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
        </View>
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
    marginTop: 24,
    marginBottom: 20,
    paddingVertical: 16,
    paddingLeft: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  imageAddButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    marginRight: 8,
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
