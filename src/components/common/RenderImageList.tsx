import React from 'react';
import type {FC} from 'react';
import {ImageInterface} from '../../data';
import {Image, ScrollView, View} from 'react-native';

type RenderUploadImageProps = {
  imageData: ImageInterface[];
  imageSize: number;
};

export const RenderImageList: FC<RenderUploadImageProps> = ({imageData, imageSize}) => {
  return (
    <ScrollView horizontal>
      {imageData.map((item, index) => {
        return (
          <View key={index} style={{marginRight: 8, borderColor: '#DFDFDF', borderWidth: 1}}>
            <Image source={{uri: item.uri}} style={{width: imageSize, height: imageSize}} />
          </View>
        );
      })}
    </ScrollView>
  );
};
