import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../../../shared/Context';

import Animated, {Easing, useCode, set} from 'react-native-reanimated';
import {loop, mix, useValue} from 'react-native-redash';

export default function TilesLoading() {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    tile: {
      width: constants.width * 0.9,
      height: constants.height * 0.25,
      shadowOpacity: 0.1,
      shadowOffset: {width: 0.1, height: 0.1},
      borderRadius: 8,
      backgroundColor: constants.background3,
      alignSelf: 'center',
      marginVertical: 10,
      padding: 25,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
    },
    heading: {
      width: constants.width * 0.35,
      height: 15,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
      marginLeft: 15,
    },
    subHeading: {
      width: constants.width * 0.5,
      height: 5,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
      marginLeft: 15,
      marginTop: 10,
    },
    tileSmall: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    listOfUsers: {
      marginTop: 10,
      marginLeft: 5,
      height: 100,
      width: 50,
    },
    user: {
      width: constants.width * 0.3,
      height: 5,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
      marginLeft: 15,
      marginTop: 10,
    },
  });

  const animation = useValue(0);

  useCode(
    () =>
      set(
        animation,
        loop({
          duration: 1000,
          easing: Easing.inOut(Easing.ease),

          // the animation goes from 0 to 1 and then
          // from 1 to 0 in the next cycle
          boomerang: true,
          autoStart: true,
        }),
      ),
    [animation],
  );

  // Interpolate the node from 0 to 1 without clamping
  const opacity = mix(animation, 0.5, 0.75);

  return (
    <View style={{flex: 1, backgroundColor: constants.background1}}>
      <Animated.View style={[styles.tile, {opacity}]}>
        <View style={styles.tileSmall}>
          <Animated.View style={[styles.avatar, {opacity}]} />
          <View>
            <Animated.View style={[styles.heading, {opacity}]} />
            <Animated.View style={[styles.subHeading, {opacity}]} />
          </View>
        </View>
        <View style={styles.listOfUsers}>
          <View style={styles.user} />
          <View style={styles.user} />
          <View style={styles.user} />
          <View style={styles.user} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.tile, {opacity}]}>
        <View style={styles.tileSmall}>
          <Animated.View style={[styles.avatar, {opacity}]} />
          <View>
            <Animated.View style={[styles.heading, {opacity}]} />
            <Animated.View style={[styles.subHeading, {opacity}]} />
          </View>
        </View>
        <View style={styles.listOfUsers}>
          <View style={styles.user} />
          <View style={styles.user} />
          <View style={styles.user} />
          <View style={styles.user} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.tile, {opacity}]}>
        <View style={styles.tileSmall}>
          <Animated.View style={[styles.avatar, {opacity}]} />
          <View>
            <Animated.View style={[styles.heading, {opacity}]} />
            <Animated.View style={[styles.subHeading, {opacity}]} />
          </View>
        </View>
        <View style={styles.listOfUsers}>
          <View style={styles.user} />
          <View style={styles.user} />
          <View style={styles.user} />
          <View style={styles.user} />
        </View>
      </Animated.View>
    </View>
  );
}
