import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../../../shared/Context';

import Animated, {Easing, useCode, set} from 'react-native-reanimated';
import {loop, mix, useValue} from 'react-native-redash';

export default function TilesLoading() {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    tile: {
      height: constants.height * 0.1,
      paddingLeft: 25,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: constants.background3,
      borderBottomColor: darkTheme ? 'transparent' : constants.lineColor,
      borderBottomWidth: 0.5,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkTheme ? '#383838' : '#dddddd',
    },
    heading: {
      width: constants.width * 0.35,
      height: 15,
      backgroundColor: darkTheme ? '#383838' : '#dddddd',
      marginLeft: 15,
    },
    subHeading: {
      width: constants.width * 0.5,
      height: 5,
      backgroundColor: darkTheme ? '#383838' : '#dddddd',
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
        <View style={styles.avatar} />
        <View>
          <View style={styles.heading} />
          <View style={styles.subHeading} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.tile, {opacity}]}>
        <View style={styles.avatar} />
        <View>
          <View style={styles.heading} />
          <View style={styles.subHeading} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.tile, {opacity}]}>
        <View style={styles.avatar} />
        <View>
          <View style={styles.heading} />
          <View style={styles.subHeading} />
        </View>
      </Animated.View>
    </View>
  );
}
