import React, {useContext} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import UserProfilePhoto from './UserProfilePhoto';
import {ScrollView} from 'react-native-gesture-handler';

export default function UserProfile({navigation}) {
  const {user, setUser} = useContext(UserDetailsContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const styles = {
    view: {
      width: constants.width,
      height: 60,
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
        alignItems: 'center',
      }}>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.3,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: darkTheme ? constants.background1 : '#4640C1',
        }}
      />
      <ScrollView style={{top: 0, position: 'absolute'}}>
        <UserProfileComponent navigation={navigation} />
        <View
          style={{
            width: constants.width,
          }}>
          <View style={styles.view}>
            <TouchableOpacity onPress={() => {}} style={styles.view_touchable}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign
                  name="star"
                  size={20}
                  color={constants.background2}
                />
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
              onPress={() => navigation.navigate('Issues')}
              style={styles.view_touchable}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const UserProfileComponent = ({navigation}) => {
  const {constants} = React.useContext(ThemeContext);
  return (
    <View
      style={{
        alignItems: 'center',
        width: constants.width,
        height: constants.height * 0.5,
      }}>
      <UserProfilePhoto />
      <Text
        style={{
          color: 'white',
          fontWeight: '700',
          fontFamily: 'Helvetica Neue',
          fontSize: 25,
          marginVertical: 10,
          marginTop: 20,
        }}>
        Manav Kasare
      </Text>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          backgroundColor: 'white',
          width: 50,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={{color: 'black'}}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};
