import React from 'react';
import {SafeAreaView, Modal, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function Loading({isLoading}) {
  return (
    <Modal visible={isLoading} transparent={true}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}>
        <ActivityIndicator animating={true} size="small" color="white" />
      </SafeAreaView>
    </Modal>
  );
}
