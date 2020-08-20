import React from 'react';
import FastImage from 'react-native-fast-image';

const CachedImage = React.memo(({uri, style, key}) => {
  return (
    <FastImage
      source={{
        uri: uri,
        headers: {Authorization: key},
        priority: FastImage.priority.normal,
      }}
      style={style}
    />
  );
});

export default CachedImage;
