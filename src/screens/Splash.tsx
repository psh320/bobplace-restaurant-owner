import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, SafeAreaView, Animated} from 'react-native';
import {useRecoilState} from 'recoil';
import {RCstoreId} from '../state';
import {getStoreId} from '../api/store';

const moveUp = (progressValue: Animated.Value) => {
  Animated.timing(progressValue, {
    toValue: 60, //
    duration: 300, //
    useNativeDriver: false,
  }).start();
};

const Splash = () => {
  const [progressValue] = useState(new Animated.Value(50));

  setTimeout(() => {
    moveUp(progressValue);
  }, 300);

  const [storeId, setStoreId] = useRecoilState(RCstoreId);
  const getStoreIdRc = async () => {
    const re = await getStoreId();
    setStoreId(re);
  };
  useEffect(() => {
    getStoreIdRc();
  }, []);
  console.log('storeId 저장됨 ? ', storeId);

  return (
    <SafeAreaView style={[styles.flex]}>
      <View style={[styles.imageWrap]}>
        <Image source={require('../assets/images/splashAll.png')} style={[styles.logoImage]} />
        <Animated.View style={[styles.postionAbs, {bottom: progressValue}]}>
          <Image source={require('../assets/images/bobpoolFace.png')} style={[styles.logoFace]} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#2A2A2A', alignItems: 'center'},
  splashTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    lineHeight: 38,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoImage: {
    width: 230,
    height: 151,
  },
  logoFace: {
    right: 4,
    width: 24,
    height: 10,
  },
  postionAbs: {
    position: 'absolute',
  },
  textWrap: {
    marginTop: 200,
  },
  imageWrap: {
    marginTop: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
