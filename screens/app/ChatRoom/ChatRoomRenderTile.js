import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

console.disableYellowBox = true;

import {ThemeContext} from '../../../shared/Context';
import {getChatroomInfo} from '../../../backend/database/apiCalls';
import CircleAvatar from '../../../shared/CircleAvatar';

const ChatRoomRenderTile = ({item, navigation}) => {
  const {constants} = React.useContext(ThemeContext);
  const [room, setRoom] = React.useState(item);
  const [showRoomDetails, setShowRoomDetails] = React.useState(false);
  const [listOfUsers, setListOfUsers] = React.useState([]);

  const y = React.useRef(new Animated.Value(0)).current;
  const width = React.useRef(new Animated.Value(0)).current;
  const height = React.useRef(new Animated.Value(0)).current;

  const translateY = y.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const scaleX = width.interpolate({
    inputRange: [0.85, 1],
    outputRange: [0.85, 1],
  });

  const scaleY = height.interpolate({
    inputRange: [0.85, 1],
    outputRange: [0.85, 1],
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(y, {
        toValue: 1,
        damping: 500,
        useNativeDriver: true,
      }),
      Animated.spring(width, {
        toValue: 1,
        damping: 500,
        useNativeDriver: true,
      }),
      Animated.spring(height, {
        toValue: 1,
        damping: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  React.useEffect(() => {
    getChatroomInfo(room._id).then((response) => {
      setRoom(response);
      setListOfUsers(response.listOfUsers);
    });
  }, []);

  const handleOnPressTile = () => {
    navigation.push('Room', {room: room, setRoom: setRoom});
  };

  const toggleShowRoomDetails = () => {
    setShowRoomDetails(!showRoomDetails);
  };

  const styles = StyleSheet.create({
    tile: {
      width: constants.width * 0.9,
      shadowOpacity: 0.1,
      shadowColor: 'black',
      shadowOffset: {width: 0.1, height: 0.1},
      borderRadius: 8,
      backgroundColor: constants.background3,
      alignSelf: 'center',
      marginVertical: 10,
      elevation: 1,
      padding: 15,
      transform: [{translateY}, {scaleX}, {scaleY}],
    },
    tileSmall: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    heading: {
      color: constants.text1,
      marginLeft: 15,
      fontSize: 20,
      fontWeight: '600',
    },
    description: {
      color: 'grey',
      marginLeft: 15,
      fontSize: 14,
      fontWeight: '400',
    },
    listOfUsers: {
      marginTop: 10,
      marginLeft: 5,
    },
  });

  return (
    <TouchableOpacity onPress={handleOnPressTile}>
      <Animated.View style={styles.tile}>
        <View style={styles.tileSmall}>
          <CircleAvatar
            uri={room.profilePic === undefined ? undefined : room.profilePic}
            size={75}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.heading}>{room.name}</Text>
            <View style={{width: constants.width * 0.4}}>
              {room.description.length <= 30 ? (
                <Text style={styles.description}>{room.description}</Text>
              ) : showRoomDetails ? (
                <Text style={styles.description}>{room.description}</Text>
              ) : (
                <Text style={styles.description}>
                  {room.description.substr(0, 30)}....
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', marginRight: 15}}>x</Text>
            <TouchableOpacity
              onPress={toggleShowRoomDetails}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {showRoomDetails ? (
                <Ionicons
                  name="chevron-up"
                  size={24}
                  color={constants.background2}
                />
              ) : (
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={constants.background2}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showRoomDetails ? (
          <FlatList
            style={styles.listOfUsers}
            ListHeaderComponent={() => (
              <Text style={{color: 'green', fontWeight: '500'}}>
                x Speaking of {item.listOfUsers.length}
              </Text>
            )}
            scrollEnabled={false}
            data={listOfUsers}
            keyExtractor={(key, index) => index.toString()}
            renderItem={({item}) => (
              <Text style={{color: 'grey'}}>{item.username}</Text>
            )}
          />
        ) : (
          <></>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default React.memo(ChatRoomRenderTile);
