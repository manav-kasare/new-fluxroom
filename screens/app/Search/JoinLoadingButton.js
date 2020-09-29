import React from 'react';
import {ThemeContext} from '../../../shared/Context';

import Animated, {Easing, useCode, set} from 'react-native-reanimated';
import {loop, mix, useValue} from 'react-native-redash';

export default function JoinLoadingButton() {
  const {constants} = React.useContext(ThemeContext);

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
  const opacity = mix(animation, 0.25, 0.5);

  return (
    <Animated.View
      style={{
        backgroundColor: '#012470',
        opacity: opacity,
        height: 30,
        width: 50,
        position: 'absolute',
        right: 25,
        bottom: 15,
        borderRadius: 5,
      }}
    />
  );
}
