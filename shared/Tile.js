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
    const {darkTheme, constants} = React.useContext(ThemeContext);

    return (
      <TouchableOpacity onPress={onPressTile}>
        <View
          style={{
            flex: 1,
            height: constants.height * 0.1,
            paddingLeft: 25,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: constants.background3,
            borderBottomColor: darkTheme
              ? constants.background1
              : constants.lineColor,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity onPress={onPressAvatar}>
            <CircleAvatar uri={uri} itemName={itemName} size={50} />
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: constants.text1,
                marginLeft: 15,
                fontSize: 20,
                fontWeight: '700',
                fontFamily: 'Helvetica Neue',
              }}>
              {heading}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: 15,
                fontSize: 14,
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
