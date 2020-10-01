import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../../../../shared/Context';
import il8n from '../../../../locales/il8n';

export default function AboutUs({navigation}) {
  const {constants} = React.useContext(ThemeContext);

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
          <TouchableOpacity
            onPress={navigateDataPolicy}
            style={styles.view_touchable}>
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
