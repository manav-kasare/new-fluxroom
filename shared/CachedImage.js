import React from 'react';
import FastImage from 'react-native-fast-image';

import {TokenContext} from '../shared/Context';

const CachedImage = React.memo(({uri, style, _resizeMode}) => {
  const {token} = React.useContext(TokenContext);

  return (
    <FastImage
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
        headers: {Authorization: `Bearer ${token}`},
      }}
      style={style}
      resizeMode={_resizeMode}
    />
  );
});

export default CachedImage;
