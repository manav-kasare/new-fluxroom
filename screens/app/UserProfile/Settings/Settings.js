import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import {Switch, ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import {
  UserDetailsContext,
  TokenContext,
  ThemeContext,
} from '../../../../shared/Context';
import {deleteToken} from '../../../../shared/KeyChain';
import {logOutUser} from '../../../../backend/database/apiCalls';

export default function Settings({navigation}) {
  const {darkTheme, toggleTheme, constants} = React.useContext(ThemeContext);
  const {setUser} = React.useContext(UserDetailsContext);
  const {token} = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(false);

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
      fontWeight: '400',
    },
    view_touchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };

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

  const navigateAboutUsNavigator = () => {
    navigation.navigate('AboutUs');
  };

  const navigateIssues = () => {
    navigation.navigate('Issues');
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
            onPress={navigateAboutUsNavigator}
            style={styles.view_touchable}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <FontAwesome5
                name="info"
                size={20}
                color={constants.background2}
              />
              <Text style={styles.view_text}>About Us</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.view_touchable}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <AntDesign name="star" size={20} color={constants.background2} />
              <Text style={styles.view_text}>Rate Us</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity
            onPress={navigateIssues}
            style={styles.view_touchable}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <MaterialCommunityIcons
                name="emoticon-frown"
                size={20}
                color={constants.background2}
              />
              <Text style={styles.view_text}>Did you face any issues ?</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.view_touchable}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name="user-alt-slash" size={18} color="crimson" />
              <Text
                style={{
                  color: 'crimson',
                  marginLeft: 25,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                Delete Account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="crimson" />
          </TouchableOpacity>
        </View>

        <View style={styles.view}>
          <TouchableOpacity style={styles.view_touchable} onPress={signOut}>
            {loading ? (
              <ActivityIndicator
                color={constants.primary}
                size="small"
                animating={true}
              />
            ) : (
              <Text
                style={{
                  color: 'crimson',
                  marginLeft: 25,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                Sign Out
              </Text>
            )}
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
        <Text style={{color: 'grey', fontWeight: 'bold'}}>Dark Mode</Text>
        <Switch value={darkTheme} onValueChange={toggleTheme} />
      </View>
    </SafeAreaView>
  );
}
