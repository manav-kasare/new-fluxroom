import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import CircleAvatar from './CircleAvatar';
import {ThemeContext} from './Context';

const Tile = React.memo(
  ({
    uri,
    onPressAvatar,
    onPressTile,
    itemName,
    heading,
    subHeading,
    onlineSpeakers,
  }) => {
    const {constants} = React.useContext(ThemeContext);

    return (
      <TouchableOpacity onPress={onPressTile}>
        <View
          style={{
            flex: 1,
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
          {onlineSpeakers ? (
            <View
              style={{
                position: 'absolute',
                right: 25,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2.5,
                  backgroundColor: 'green',
                  marginHorizontal: 5,
                }}
              />
              <Text style={{color: 'green', fontSize: 12}}>
                {onlineSpeakers} Speakers Online
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

export default Tile;
