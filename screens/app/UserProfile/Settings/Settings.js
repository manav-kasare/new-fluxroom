import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import {Switch} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {ThemeContext} from '../../../../shared/Context';

export default function Settings({navigation}) {
  const {darkTheme, toggleTheme, constants} = React.useContext(ThemeContext);

  const styles = {
    view: {
      width: constants.width,
      height: constants.height * 0.075,
      marginVertical: 10,
      backgroundColor: constants.background3,
      paddingHorizontal: 25,
      borderRadius: 5,
      justifyContent: 'center',
    },
    view_text: {color: constants.text1, marginLeft: 10, fontSize: 14},
    view_touchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
      }}>
      <Appbar.Header style={constants.header}>
        <Appbar.Content title="Settings" titleStyle={constants.headerText} />
        <Appbar.Action
          icon="menu"
          color={constants.background2}
          onPress={() => navigation.openDrawer()}
        />
      </Appbar.Header>
      <View style={{flex: 1, backgroundColor: constants.background1}}>
        <View style={styles.view}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={styles.view_touchable}>
            <View style={{flexDirection: 'row'}}>
              <Entypo name="key" size={18} color={constants.background2} />
              <Text style={styles.view_text}>Change Password</Text>
            </View>
            <Ionicons
              name="ios-arrow-forward"
              size={20}
              color={constants.background2}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          paddingVertical: 10,
          alignItems: 'center',
          width: constants.width,
          paddingHorizontal: 25,
          justifyContent: 'space-around',
        }}>
        <Text style={{color: 'grey', fontWeight: 'bold'}}>Dark Theme</Text>
        <Switch value={darkTheme} onValueChange={toggleTheme} />
      </View>
    </SafeAreaView>
  );
}
