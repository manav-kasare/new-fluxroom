import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {UserDetailsContext, ThemeContext} from '../shared/Context';

export default function DrawerContent(props) {
  const {setUser} = React.useContext(UserDetailsContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkTheme ? '#0f0f0f' : '#f5f5f5',
        paddingTop: 50,
      }}>
      <View style={styles.drawerContent}>
        <DrawerContentScrollView {...props} style={styles.drawerSection}>
          <DrawerItemList
            inactiveTintColor="grey"
            activeBackgroundColor={constants.primary}
            activeTintColor="white"
            {...props}
          />
        </DrawerContentScrollView>
      </View>

      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Icon name="exit-to-app" color="white" size={24} />}
          style={{
            height: 50,
            backgroundColor: constants.primary,
            justifyContent: 'center',
          }}
          onPress={() => {
            AsyncStorage.clear().then(() => {
              setUser(null);
            });
          }}
          label="Sign Out"
          labelStyle={{color: 'grey', fontSize: 14, color: 'white'}}
        />
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
    height: 50,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 25,
    alignSelf: 'center',
  },
});
