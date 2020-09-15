import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import CircleAvatar from './CircleAvatar';
import {ThemeContext} from './Context';

const Tile = React.memo(
  ({uri, onPressTile, heading, subHeading, onlineSpeakers}) => {
    const {darkTheme, constants} = React.useContext(ThemeContext);

    return (
      <TouchableOpacity onPress={onPressTile}>
        <View
          style={{
            flex: 1,
            height: 65,
            paddingLeft: 25,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: constants.background3,
          }}>
          <CircleAvatar uri={uri} size={50} />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: constants.text1,
                marginLeft: 15,
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Helvetica Neue',
              }}>
              {heading}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: 15,
                fontSize: 13,
                fontWeight: '400',
                fontFamily: 'Helvetica Neue',
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
              <Text style={{color: 'green', fontSize: 12}}>
                {onlineSpeakers} Online
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
