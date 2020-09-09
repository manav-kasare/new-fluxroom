import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {ThemeContext, TokenContext} from '../../../shared/Context';
import {joinRoom} from '../../../backend/database/apiCalls';

export default function JoinRoom({navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {token} = React.useContext(TokenContext);
  const [link, setLink] = React.useState(null);
  const id = '5f566358472e6000177f70b6';

  const handleJoin = () => {
    joinRoom(id, token);
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
