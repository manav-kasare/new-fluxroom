import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {ThemeContext} from '../../../../shared/Context';
import {ScrollView} from 'react-native-gesture-handler';

export default function DataPolicy() {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    view: {
      width: constants.width,
      paddingHorizontal: 25,
      paddingVertical: 25,
    },
    headerText: {
      fontFamily: 'Helvetica Neue',
      fontWeight: '700',
      color: constants.text1,
      fontSize: 20,
      letterSpacing: 1,
    },
    bodyText: {
      fontFamily: 'Helvetica Neue',
      fontWeight: '300',
      color: constants.text1,
      fontSize: 12,
      marginLeft: 5,
      letterSpacing: 1,
    },
    subHeadingText: {
      fontFamily: 'Helvetica Neue',
      fontWeight: '700',
      color: constants.text1,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 5,
      letterSpacing: 1,
    },
    body: {
      marginVertical: 10,
      marginRight: 25,
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkTheme ? 'black' : 'white',
        alignItems: 'center',
      }}>
      <ScrollView style={{flex: 1, paddingTop: 25, paddingBottom: 50}}>
        <View style={styles.view}>
          <Text style={styles.headerText}>
            What information do we collect ?
          </Text>
          <View style={styles.body}>
            <Text style={styles.subHeadingText}>
              - Information and content you provide :
            </Text>
            <Text style={styles.bodyText}>
              We collect the content and your personal information you provide
              us while signing in to fluxroom. This can include your email
              address, phone number, password, profile photo. Signing in through
              a social media providers like Google or Apple gives us access to
              some of your data that they provide in their API's.
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.subHeadingText}>- Device Information :</Text>
            <Text style={styles.bodyText}>
              Information about operations and behaviors performed on the
              device, such as whether the app is foregrounded or backgrounded,
              screen touches and swipes. We access the local storage to store
              some user data such as ID's and cached images for a overall better
              user experience for you. This also includes access to the
              microphone of your device so that we can provide basic features of
              our app.
            </Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.headerText}>How do we use the information ?</Text>
          <View style={styles.body}>
            <Text style={styles.subHeadingText}>- Personal Information :</Text>
            <Text style={styles.bodyText}>
              Email address or phone numbers are expected, so that there is an
              avoidance of multiple or fake accounting and to provide a pleasant
              experience for you.
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.subHeadingText}>- Microphone :</Text>
            <Text style={styles.bodyText}>
              We access the microphone so that you can have a peer to peer audio
              communication in the chatrooms that you joined.
            </Text>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.headerText}>
            How can I manage or delete my information that I shared ?
          </Text>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              We provide an option to delete your account. We store your
              information in our databases in the cloud. Deleting your account
              would result in deletion of all your personal information you
              shared with us for the account.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
