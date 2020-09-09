import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ThemeContext} from '../../../../shared/Context';

import Animated, {Easing, useCode, set} from 'react-native-reanimated';
import {loop, mix, useValue} from 'react-native-redash';

export default function RoomAvatarLoading() {
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
      width: 100,
      height: 100,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkTheme ? '#383838' : '#dddddd',
      marginBottom: 10,
    },
    name: {
      height: 10,
      width: 50,
      backgroundColor: darkTheme ? '#383838' : '#dddddd',
      alignSelf: 'center',
    },
  });

  return (
    <View style={{flex: 1, width: constants.width}}>
      <FlatList
        data={['1', '2', '3']}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
          width: constants.width,
        }}
        renderItem={() => (
          <View style={{marginVertical: 10}}>
            <Animated.View style={[styles.avatar, {opacity}]} />
            <Animated.View style={[styles.name, {opacity}]} />
          </View>
        )}
      />
    </View>
  );
}
