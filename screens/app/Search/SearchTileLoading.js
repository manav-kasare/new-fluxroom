import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../../../shared/Context';

import Animated, {Easing, useCode, set} from 'react-native-reanimated';
import {loop, mix, useValue} from 'react-native-redash';

export default function SearchTileLoading() {
  const {constants, darkTheme} = React.useContext(ThemeContext);

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

  const styles = StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
    },
    heading: {
      width: constants.width * 0.2,
      height: 15,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
      marginLeft: 15,
    },
    subHeading: {
      width: constants.width * 0.4,
      height: 5,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
      marginLeft: 15,
      marginTop: 10,
    },
    tileSmall: {
      width: constants.width,
      height: 65,
      paddingLeft: 25,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rightView: {
      marginRight: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    tileSmallLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    users: {
      height: 10,
      width: 25,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
      marginRight: 10,
    },
    chevron: {
      width: 20,
      height: 20,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
    },
    topHeading: {
      marginVertical: 10,
      marginLeft: 25,
      width: 100,
      height: 30,
      backgroundColor: darkTheme ? '#1e1e1e' : '#dddddd',
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: constants.background1}}>
      <Animated.View style={[styles.topHeading, {opacity}]} />
      <View style={styles.tileSmall}>
        <View style={styles.tileSmallLeft}>
          <Animated.View style={[styles.avatar, {opacity}]} />
          <View style={{flexDirection: 'column'}}>
            <Animated.View style={[styles.heading, {opacity}]} />
            <Animated.View style={[styles.subHeading, {opacity}]} />
          </View>
        </View>
        <View style={styles.rightView}>
          <Animated.View style={[styles.users, {opacity}]} />
          <Animated.View style={[styles.chevron, {opacity}]} />
        </View>
      </View>

      <View style={styles.tileSmall}>
        <View style={styles.tileSmallLeft}>
          <Animated.View style={[styles.avatar, {opacity}]} />
          <View style={{flexDirection: 'column'}}>
            <Animated.View style={[styles.heading, {opacity}]} />
            <Animated.View style={[styles.subHeading, {opacity}]} />
          </View>
        </View>
        <View style={styles.rightView}>
          <Animated.View style={[styles.users, {opacity}]} />
          <Animated.View style={[styles.chevron, {opacity}]} />
        </View>
      </View>

      <View style={styles.tileSmall}>
        <View style={styles.tileSmallLeft}>
          <Animated.View style={[styles.avatar, {opacity}]} />
          <View style={{flexDirection: 'column'}}>
            <Animated.View style={[styles.heading, {opacity}]} />
            <Animated.View style={[styles.subHeading, {opacity}]} />
          </View>
        </View>
        <View style={styles.rightView}>
          <Animated.View style={[styles.users, {opacity}]} />
          <Animated.View style={[styles.chevron, {opacity}]} />
        </View>
      </View>
    </View>
  );
}
