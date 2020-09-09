import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../shared/Context';
import {deleteToken} from '../shared/KeyChain';
import {logOutUser} from '../backend/database/apiCalls';

export default function DrawerContent(props) {
  const {setUser} = React.useContext(UserDetailsContext);
  const {token} = React.useContext(TokenContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);

  const signOut = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        logOutUser(token);
        deleteToken();
        AsyncStorage.clear();
        setLoading(false);
        setUser(null);
      });
  };

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
        {loading ? (
          <ActivityIndicator color={constants.backroung2} size="small" />
        ) : (
          <DrawerItem
            icon={() => <Icon name="exit-to-app" color="white" size={24} />}
            style={{
              height: 50,
              backgroundColor: constants.primary,
              justifyContent: 'center',
            }}
            onPress={signOut}
            label="Sign Out"
            labelStyle={{color: 'grey', fontSize: 14, color: 'white'}}
          />
        )}
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
