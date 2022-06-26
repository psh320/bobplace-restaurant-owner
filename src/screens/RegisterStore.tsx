import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {RegisterHeader} from '../components';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterDone'>;

const RegisterStore = ({navigation, route}: Props) => {
  const [pageStatus, setPageStatus] = useState(0);
  const goResult = () => {
    navigation.navigate('RegisterDone', {status: 0});
  };
  return (
    <SafeAreaView>
      <RegisterHeader goBack={() => goResult} pageNum={1} />
    </SafeAreaView>
  );
};

export default RegisterStore;
