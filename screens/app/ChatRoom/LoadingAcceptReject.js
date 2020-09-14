import React from 'react';
import {View} from 'react-native';
import Animated, {Easing, useCode, set} from 'react-native-reanimated';
import {loop, mix, useValue} from 'react-native-redash';

export const LoadingAccept = () => {
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
  const opacity = mix(animation, 0.75, 1);

  return (
    <Animated.View
      style={{
        width: 75,
        height: 65,
        backgroundColor: '#0f6602',
        opacity: opacity,
      }}
    />
  );
};

export const LoadingReject = () => {
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
  const opacity = mix(animation, 0.75, 1);

  return (
    <Animated.View
      style={{
        width: 75,
        height: 65,
        backgroundColor: '#012470',
        opacity: opacity,
      }}
    />
  );
};
