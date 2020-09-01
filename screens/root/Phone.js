import React from 'react';
import {TouchableOpacity, View, TextInput, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Entypo from 'react-native-vector-icons/Entypo';

import {ThemeContext} from '../../shared/Context';
import globalStyles from '../../shared/GlobalStyles';

export default function Phone({setPhone}) {
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = React.useState(null);
  const phoneInput = React.useRef(null);
  const [password, setPassword] = React.useState(null);
  const [revealPassword, setRevealPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {constants} = React.useContext(ThemeContext);

  const signUp = () => {};

  return (
    <View
      style={{
        flex: 1,
        width: constants.width,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      }}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="US"
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedPhoneNumber(text);
        }}
        containerStyle={{
          marginVertical: 10,
          borderRadius: 8,
          borderColor: 'grey',
          borderWidth: 0.3,
          width: constants.width * 0.8,
          paddingRight: 5,
          borderRadius: 8,
          padding: 2,
          backgroundColor: '#F6F8FA',
        }}
        flagButtonStyle={{backgroundColor: 'white'}}
      />
      <View style={globalStyles.input}>
        <Entypo name="key" size={22} color="#0d0c0a" />
        <TextInput
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={revealPassword ? false : true}
          style={globalStyles.textInput}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          clearButtonMode="while-editing"
        />
      </View>
      {isLoading ? (
        <View
          style={{
            height: 50,
            width: constants.width * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
          }}>
          <ActivityIndicator color="#0d0c0a" size="small" />
        </View>
      ) : (
        <TouchableOpacity style={globalStyles.button} onPress={signUp}>
          <Text style={globalStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => setPhone(false)}>
        <Text style={globalStyles.buttonText}>Use Email</Text>
      </TouchableOpacity>
    </View>
  );
}
