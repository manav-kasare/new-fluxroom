import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import {Switch} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {ThemeContext} from '../../../../shared/Context';

export default function Settings({navigation}) {
  const {darkTheme, toggleTheme, constants} = React.useContext(ThemeContext);

  const styles = {
    view: {
      width: constants.width,
      height: 60,
      backgroundColor: constants.background3,
      paddingHorizontal: 25,
      justifyContent: 'center',
    },
    view_text: {
      color: constants.text1,
      marginLeft: 25,
      fontSize: 14,
      fontWeight: '300',
    },
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
      <View style={{flex: 1, backgroundColor: constants.background1}}>
        <View style={styles.view}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={styles.view_touchable}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="key" size={20} color={constants.background2} />
              <Text style={styles.view_text}>Change Password</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity onPress={() => {}} style={styles.view_touchable}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name="user-alt-slash" size={18} color="crimson" />
              <Text
                style={{
                  color: 'crimson',
                  marginLeft: 25,
                  fontSize: 14,
                  fontWeight: '300',
                }}>
                Delete Account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="crimson" />
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
