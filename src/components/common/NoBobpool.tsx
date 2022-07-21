import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';

export type NoBobpoolProps = {
  category: string;
};

export const NoBobpool: FC<NoBobpoolProps> = ({category}) => {
  return (
    <View style={[DesignSystem.centerArrange, {flex: 1}]}>
      <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 12}]}>
        {category === '진행중'
          ? '미션중인 유저가 없어요'
          : category === '성공요청'
          ? '성공 요청이 없어요'
          : category === '미션상세'
          ? '결제한 미션들 없음'
          : category === '리뷰'
          ? '아직 리뷰가 없어요'
          : category === '문의'
          ? '남긴 문의가 없어요'
          : category === '알림'
          ? '아직 온 알림 없음'
          : '모가더있나'}
      </Text>
      <Image source={require('../../assets/images/bobpool/cryingBob.png')} />
    </View>
  );
};
