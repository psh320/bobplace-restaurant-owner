import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';

export type NoBobpoolProps = {
  category: string;
};

export const NoBobpool: FC<NoBobpoolProps> = ({category}) => {
  return (
    <View style={[DesignSystem.centerArrange]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 12}]}>
        {category === '리뷰'
          ? '아직 리뷰가 없어요'
          : category === '문의'
          ? '문의가 없어요'
          : '그다음은 모지'}
      </Text>
      <Image source={require('../../assets/images/bobpool/cryingBob.png')} />
    </View>
  );
};
