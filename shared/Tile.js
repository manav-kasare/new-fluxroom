import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import CircleAvatar from './CircleAvatar';
import {ThemeContext} from './Context';

const Tile = React.memo(
  ({uri, onPressAvatar, onPressTile, itemName, heading, subHeading}) => {
    const {constants} = React.useContext(ThemeContext);

    return (
      <TouchableOpacity onPress={onPressTile}>
        <View
          style={{
            width: constants.width,
            height: constants.height * 0.1,
            marginLeft: 25,
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomColor: constants.lineColor,
            borderBottomWidth: 0.5,
          }}>
          <TouchableOpacity onPress={onPressAvatar}>
            <CircleAvatar uri={uri} itemName={itemName} size={50} />
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: constants.text1,
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '600',
              }}>
              {heading}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '400',
              }}>
              {subHeading}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default Tile;
