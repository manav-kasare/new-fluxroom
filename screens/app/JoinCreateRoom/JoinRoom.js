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
import {ThemeContext} from '../../../shared/Context';

export default function JoinRoom({navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [link, setLink] = React.useState(null);

  const handleJoin = () => {
    Linking.openURL(link);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
        <Appbar.Header style={constants.header}>
          <Appbar.Content title="Join Room" titleStyle={constants.headerText} />
          <Appbar.Action
            icon="menu"
            color={constants.background2}
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
  );
}
