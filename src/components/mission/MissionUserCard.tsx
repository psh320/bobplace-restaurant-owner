import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {IMissionDtoType} from '../../data/IMissions';

//prettier-ignore
export const MissionUserCard: FC<IMissionDtoType> = ({mission, missionId, phone, point, startDate, userId, userName}) => {
    //const navigation = useNavigation();
    return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
              <Text style={[DesignSystem.body2Lt, {color: '#558FFF'}]}>{startDate.slice(11,16)} 미션시작</Text>
              <Text style={[DesignSystem.title3SB, {color: '#2A2A2A'}]}>{userName}</Text>
              <Text style={[DesignSystem.body2Lt, {color: '#616161', marginBottom: 8}]}>{phone}</Text>
          </View>
          <View>
            <Text>
              <Text style={[DesignSystem.title4Md, {color: 'black'}]}>{mission} </Text>
              <Text style={[DesignSystem.body1Lt, {color: 'black'}]}>결제시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  missionCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameBox: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 0.5,
    marginBottom: 16,
  },
  missionButtonView: {
    borderWidth: 2,
  },
});
