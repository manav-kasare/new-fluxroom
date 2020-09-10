import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {
  ThemeContext,
  TokenContext,
  UserDetailsContext,
} from '../../../shared/Context';
import {joinRoom, getUserMe} from '../../../backend/database/apiCalls';
import {CustomErrorToast} from '../../../shared/CustomToast';
import {storeUserData} from '../../../shared/AsyncStore';

export default function JoinRoom({route, navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {setUser} = React.useContext(UserDetailsContext);
  const {token} = React.useContext(TokenContext);
  const [link, setLink] = React.useState(null);
  const {id} = route.params;

  const handleJoin = () => {
    new Promise((resolve, reject) => {
      const rooms = user.joinedRooms;
      let alreadyJoined = false;
      rooms.map((room) => {
        if (room._id === id) {
          alreadyJoined = true;
        }
      });
      if (alreadyJoined) {
        resolve(true);
      } else {
        reject(false);
      }
    })
      .then(() => {
        joinRoom(id, token).then((response) => {
          getUserMe(token).then((responseUser) => {
            setUser(responseUser);
            storeUserData(responseUser);
          });
        });
      })
      .catch(() => {
        CustomErrorToast('Room already joined !');
      });
  };

  return (
    <View
      style={{
        width: constants.width,
        height: constants.height,
        backgroundColor: constants.background1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: darkTheme
              ? constants.background1
              : constants.primary,
          }}>
          <Appbar.Header style={constants.header}>
            <Appbar.Content
              title="Join Room"
              titleStyle={constants.headerText}
            />
            <Appbar.Action
              icon="menu"
              color="white"
              onPress={() => navigation.openDrawer()}
            />
          </Appbar.Header>
          <View
            style={{
              flex: 1,
              paddingVertical: 25,
              paddingHorizontal: 25,
              backgroundColor: constants.background1,
            }}>
            <Text
              style={{
                color: constants.text1,
                fontSize: 24,
                fontWeight: '400',
                fontFamily: 'Helvetica',
                marginBottom: 15,
              }}>
              Paste the link here.
            </Text>
            <View style={{alignItems: 'center'}}>
              <TextInput
                placeholder="Link"
                placeholderTextColor="grey"
                value={link}
                onChangeText={(text) => setLink(text)}
                style={constants.input}
              />
              <TouchableOpacity
                style={{
                  width: constants.width * 0.75,
                  height: 45,
                  backgroundColor: constants.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  marginTop: 10,
                }}
                onPress={handleJoin}>
                <Text style={{color: 'white'}}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <View style={{height: 50, backgroundColor: constants.background1}} />
    </View>
  );
}
