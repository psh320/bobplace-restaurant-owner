import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {RCstoreId} from '../state';
import {getStoreId} from '../api/store';

const moveUp = (progressValue: Animated.Value) => {
  Animated.timing(progressValue, {
    toValue: 60, //
    duration: 400, //
    useNativeDriver: false,
  }).start();
};

const Splash = () => {
  const [progressValue] = useState(new Animated.Value(30));

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
      {/* <View style={[styles.textWrap]}>
        <Text style={[styles.splashTitle]}>BOB</Text>
        <Text style={[styles.splashTitle]}>PLACE.</Text>
      </View> */}

      <View style={[styles.imageWrap]}>
        <Image source={require('../assets/images/bobpool.png')} style={[styles.logoImage]} />
        <Animated.View style={[styles.postionAbs, {bottom: progressValue}]}>
          <Image source={require('../assets/images/bobpoolFace.png')} style={[styles.logoFace]} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#615DFF', alignItems: 'center'},
  splashTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    lineHeight: 38,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoImage: {
    width: 134,
    height: 88,
  },
  logoFace: {
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
  },
});

export default Splash;
