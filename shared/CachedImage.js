import React from 'react';
import FastImage from 'react-native-fast-image';

import {UserDetailsContext} from '../shared/Context';

const CachedImage = React.memo(({uri, style}) => {
  const {user} = React.useContext(UserDetailsContext);

  return (
    <FastImage
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
        headers: {Authorization: user.id},
      }}
      style={style}
    />
  );
});

export default CachedImage;
