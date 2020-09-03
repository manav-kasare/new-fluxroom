import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {ThemeContext} from '../../../../shared/Context';

export default function TermsOfService() {
  const {constants} = React.useContext(ThemeContext);

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
      fontSize: 15,
      marginVertical: 5,
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
        backgroundColor: constants.background1,
        alignItems: 'center',
      }}>
      <ScrollView style={{flex: 1, paddingTop: 25, paddingBottom: 50}}>
        <Text
          style={{
            fontFamily: 'Helvetica Neue',
            fontWeight: '700',
            color: constants.text1,
            fontSize: 22,
            marginLeft: 25,
            letterSpacing: 1,
          }}>
          Fluxroom Terms of Service
        </Text>
        <View style={styles.view}>
          <Text style={styles.headerText}>
            ~ How can you use our services ?
          </Text>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              You get access to our services on sigining up on the Fluxroom app.
            </Text>
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.headerText}>~ What services do we provide ?</Text>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              We concord on providing you our services. It includes our in app
              services like audio commumncation, opportunities to connect to
              people across the globe, learn about different people and their
              cultures. Synthesizing and maintaing a safe and healthy experience
              is what we focus on(by adding hosts and moderators to the
              chatrooms). We endeavour on creating a positive, active and
              welcoming community. This constructs us to be deligently
              consistent on providing the best experience for you.
            </Text>
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.headerText}>
            ~ What you can't use Fluxroom for ?
          </Text>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              - You can't breach our terms of service.
            </Text>
            <Text style={styles.bodyText}>- You can't impersonate others.</Text>
            <Text style={styles.bodyText}>
              - You can't provide false information or indulge in any sort of
              falsehood.
            </Text>
            <Text style={styles.bodyText}>
              - You can't do anything illegal.
            </Text>
            <Text style={styles.bodyText}>
              - You can't attempt to create accounts or access or collect
              information in unauthorized ways.
            </Text>
            <Text style={styles.bodyText}>
              - You can't buy/sell or indulge in any sort of transfer of your
              accounts. You can't use other login crendentials of other users.
            </Text>
            <Text style={styles.bodyText}>
              - You can't leak confidential information or do anything that
              violates others rights.
            </Text>
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.headerText}>
            ~ What permissions do you give us ?
          </Text>
          <View style={styles.body}>
            <Text style={styles.subHeadingText}>
              - We do not claim ownership of your content, but you grant us a
              license to use it.
            </Text>
            <Text style={styles.bodyText}>
              Nothing is changing about your rights in your content. We do not
              claim ownership of your content that you post on or through the
              Service. Instead, when you share, post, or upload content that is
              covered by intellectual property rights (like photos) on or in
              connection with our service, you hereby grant to us a
              non-exclusive, royalty-free, transferable, sub-licensable,
              worldwide license to host, use, distribute, modify, run, copy,
              publicly perform or display, translate, and create derivative
              works of your content (consistent with your privacy and
              application settings). You can end this license anytime by
              deleting your content or account. However, content will continue
              to appear if you shared it with others and they have not deleted
              it.
            </Text>
            <Text style={styles.subHeadingText}>
              - Permission to use your email address or phone number, username,
              profile picture, and some personal information.
            </Text>
            <Text style={styles.bodyText}>
              You give us permission to show your email address or phone number,
              username, profile picture, and information that you provided while
              sigining us for our services.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
