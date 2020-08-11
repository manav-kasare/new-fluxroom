import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {IsSignedInContext, ThemeContext} from '../shared/Context';

export default function DrawerContent({navigation}) {
  const {setIsSignedIn} = useContext(IsSignedInContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);

  return (
    <View
      style={{
        width: constants.width * 0.2,
        flex: 1,
        backgroundColor: darkTheme ? '#0f0f0f' : '#4640C1',
        paddingTop: 50,
      }}>
      <View style={styles.drawerContent}>
        <View style={styles.drawerSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={styles.iconBackground}>
            <Icon name="home" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SettingsNavigator');
            }}
            style={styles.iconBackground}>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Friends');
            }}
            style={styles.iconBackground}>
            <Icon name="account-plus" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('JoinRoom');
            }}
            style={styles.iconBackground}>
            <Icon name="plus-circle" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateRoom');
            }}
            style={styles.iconBackground}>
            <Icon name="pencil" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomDrawerSection}>
        <TouchableOpacity
          onPress={() => setIsSignedIn(false)}
          style={styles.iconBackground}>
          <Icon name="exit-to-app" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerItem: {
    paddingVertical: 5,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 25,
    alignSelf: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    elevation: 1,
    shadowOpacity: 0.1,
    marginVertical: 10,
  },
});
