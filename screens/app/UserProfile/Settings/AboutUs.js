import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import {ThemeContext} from '../../../../shared/Context';
import il8n from '../../../../locales/il8n';

export default function AboutUs({navigation}) {
  const {constants} = React.useContext(ThemeContext);

  const openLink = async () => {
    try {
      const url = 'https://www.google.com';
      InAppBrowser.isAvailable().then((response) => {
        console.log(response);
      });
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error) {
      alert(error.message);
    }
  };

  const styles = {
    view: {
      width: constants.width,
      height: 60,
      backgroundColor: constants.background3,
      paddingRight: 25,
      justifyContent: 'center',
    },
    view_text: {
      color: constants.text1,
      marginLeft: 25,
      fontSize: 14,
      fontWeight: '500',
    },
    view_touchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };

  const navigateDataPolicy = () => {
    navigation.navigate('DataPolicy');
  };
  const navigateTermsOfService = () => {
    navigation.navigate('TermsOfService');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
      }}>
      <View style={{flex: 1, backgroundColor: constants.background1}}>
        <View style={styles.view}>
          <TouchableOpacity onPress={openLink} style={styles.view_touchable}>
            <Text style={styles.view_text}>
              {il8n.t('settings.dataPolicy')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity
            onPress={navigateTermsOfService}
            style={styles.view_touchable}>
            <Text style={styles.view_text}>
              {il8n.t('settings.termsOfService')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
