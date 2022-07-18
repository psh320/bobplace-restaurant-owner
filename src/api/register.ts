import {customAxios} from './customAxios';
import {Platform} from 'react-native';

type imageData = {
  uri: string;
  type: string;
  name: string;
};
export const postStoreAuthImages = async (imageList: imageData[]) => {
  var formdata = new FormData();
  imageList.map((image) => {
    let photo;
    Platform.OS === 'ios'
      ? (photo = {
          uri: image.uri.replace('file://', ''),
          type: 'image/jpg',
          name: 'image',
        })
      : (photo = {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'image',
        });
    formdata.append('authImage', photo);
  });

  const response = await customAxios().post(
    '/api/v1/stores/store-authentication-images',
    formdata,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
  console.log('register.ts', response);
  return response;
};
