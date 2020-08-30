import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {ThemeContext} from '../../../../shared/Context';

export default function Issues() {
  const {constants} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: constants.background1,
    },
  });

  return <SafeAreaView style={styles.screen}></SafeAreaView>;
}
