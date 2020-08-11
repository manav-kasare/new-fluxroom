import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system';

export default function CachedImage({uri, style}) {
  const [source, setSource] = useState({uri: null});

  useEffect(() => {
    const name = shorthash.unique(uri);
    const caching = async () => {
      const path = `${FileSystem.cacheDirectory}${name}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        setSource({uri: image.uri});
        return;
      }

      const newImage = await FileSystem.downloadAsync(uri, path);
      setSource({uri: newImage.uri});
    };
    caching();
  }, []);

  return <Image style={style} source={source} />;
}
