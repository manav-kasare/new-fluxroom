import React from 'react';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const CachedImage = React.memo(({uri, style, itemName}) => {
  const [soure, setSource] = React.useState(null);

  useFocusEffect(() => {
    handleStorage();
  }, []);

  const handleStorage = async () => {
    AsyncStorage.getItem(itemName).then((result) => {
      if (result === null || result !== uri) {
        AsyncStorage.setItem(itemName, uri).then(() => {
          setSource(uri);
        });
      } else {
        setSource(result);
      }
    });
  };

  return <Image source={{uri: soure}} style={style} />;
});

export default CachedImage;
