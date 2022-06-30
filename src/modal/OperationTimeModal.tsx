import React, {useState} from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type OperationTimeModalProps = {
  visible: boolean;
  closeOperationTimeModal: () => void;
  index: number;
  item: OperationTime;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
};

const processTime = (time: string) => {
  return time.slice(undefined, 5);
};

export const OperationTimeModal: FC<OperationTimeModalProps> = ({
  visible,
  closeOperationTimeModal,
  index,
  item,
  setRegisterData,
  registerData,
}) => {
  const [operationData, setOperationData] = useState<OperationTime>({...item});
  const submitChangedDate = () => {
    const tempData = {...registerData};
    tempData.operationTimeVO[index] = operationData;
    setRegisterData(tempData);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            width: 330,
            height: 306,
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <TouchableOpacity
            onPress={closeOperationTimeModal}
            style={{position: 'absolute', top: 16, right: 16}}
          >
            <View style={{width: 24, height: 24}}>
              <Icon name="close" size={24} color="#111111" />
            </View>
          </TouchableOpacity>

          <View style={{width: '100%', marginTop: 28}}>
            <Text style={{fontSize: 16, lineHeight: 22, marginBottom: 8}}>영업시간</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <TouchableOpacity>
                <View
                  style={{
                    width: 141,
                    height: 48,
                    borderRadius: 10,
                    borderColor: '#949494',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>{processTime(item?.startTime as string)}</Text>
                </View>
              </TouchableOpacity>
              <Text>~</Text>
              <TouchableOpacity>
                <View
                  style={{
                    width: 141,
                    height: 48,
                    borderRadius: 10,
                    borderColor: '#949494',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>{processTime(item?.endTime as string)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', marginTop: 18}}>
            <Text style={{fontSize: 16, lineHeight: 22, marginBottom: 8}}>브레이크 타임</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <TouchableOpacity>
                <View
                  style={{
                    width: 141,
                    height: 48,
                    borderRadius: 10,
                    borderColor: '#949494',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>{processTime(item?.startTime as string)}</Text>
                </View>
              </TouchableOpacity>
              <Text>~</Text>
              <TouchableOpacity>
                <View
                  style={{
                    width: 141,
                    height: 48,
                    borderRadius: 10,
                    borderColor: '#949494',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>{processTime(item?.endTime as string)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              submitChangedDate();
            }}
          >
            <View
              style={{
                width: '100%',
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 24,
                backgroundColor: '#6C69FF',
                borderRadius: 10,
              }}
            >
              <Text style={{fontSize: 16, lineHeight: 24, color: '#FFFFFF'}}>확인</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
