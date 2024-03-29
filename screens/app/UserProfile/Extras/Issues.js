import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ThemeContext} from '../../../../shared/Context';
import globalStyles from '../../../../shared/GlobalStyles';
import il8n from '../../../../locales/il8n';

export default function Issues() {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [issue, setIssue] = React.useState(null);

  return (
    <KeyboardAwareScrollView
      style={{
        width: constants.width,
        height: constants.height,
        backgroundColor: constants.background1,
      }}>
      <SafeAreaView
        style={{
          width: constants.width,
          height: constants.height,
          backgroundColor: constants.background1,
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: constants.text1, marginTop: 50, fontSize: 20}}>
            {il8n.t('issues.heading')}
          </Text>
          <Text style={{color: 'grey', marginTop: 15}}>
            {il8n.t('issues.subHeading')}
          </Text>
        </View>
        <TextInput
          multiline={true}
          placeholder={il8n.t('placeholders.issue')}
          placeholderTextColor="grey"
          style={{
            width: constants.width * 0.8,
            height: constants.height * 0.3,
            borderRadius: 8,
            backgroundColor: darkTheme
              ? constants.background3
              : 'rgba(130,130,130, 0.1)',
            marginTop: 50,
            color: constants.text1,
            padding: 10,
            marginBottom: 25,
          }}
          value={issue}
          onChangeText={(text) => setIssue(text)}
        />
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>
            {il8n.t('buttons.submit')}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
