import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';

export type MyUserProps = {
  email: string;
  name: string;
};

//prettier-ignore
export const MyUser: FC<MyUserProps> = ({email, name}) => {
  return (
    <View style={[styles.userInfo]}>
      <View style={{marginLeft: 16, marginRight:16}}>
        <View style={[styles.userCard]}>
          <Image
            style={[styles.profileImg]}
            source={require('../../assets/images/bobProfile.png')} //
          />
          <View style={[styles.userWrap]}>
            <View style={[styles.username]}>
              <Text style={[DesignSystem.title3SB, styles.usernameText]}>{name}님</Text>
            </View>
            <Text style={[DesignSystem.caption1Lt, styles.userEmail]}>{email}</Text>
          </View>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    height: Platform.OS === 'ios' ? hp(calHeight(80, true)) : hp(calHeight(80)),
    backgroundColor: 'white',
    marginBottom: 8,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 18,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  username: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    color: 'black',
    marginRight: 8,
  },
  userEmail: {
    color: '#616161',
  },
});
