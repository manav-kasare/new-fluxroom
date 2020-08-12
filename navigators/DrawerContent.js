import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {IsSignedInContext, ThemeContext} from '../shared/Context';

export default function DrawerContent(props) {
  const {setIsSignedIn} = useContext(IsSignedInContext);
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
            activeTintColor={constants.text2}
            {...props}
          />
        </DrawerContentScrollView>
      </View>

      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Icon name="exit-to-app" color="grey" size={24} />}
          style={{height: 50}}
          onPress={() => setIsSignedIn(false)}
          label="Sign Out"
          labelStyle={{color: 'grey', fontSize: 15}}
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
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    height: 50,
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
    flexDirection: 'row',
  },
});
