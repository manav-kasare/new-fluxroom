import React, {useState, useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import {joinRoom} from '../../../backend/database/apiCalls';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../shared/Context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {storeUserData} from '../../../shared/AsyncStore';
import CircleAvatar from '../../../shared/CircleAvatar';

const SearchRenderTile = React.memo(({room, onPressTile, navigation}) => {
  const {constants, darkTheme} = useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const {user, setUser} = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [listOfUsers, setListOfUsers] = React.useState([]);

  React.useEffect(() => {
    setListOfUsers(room.listOfUsers);
    const rooms = user.joinedRooms;
    rooms.map((_room) => {
      if (_room._id === room._id) {
        setAlreadyJoined(true);
      }
    });
  }, []);

  const handleJoin = () => {
    setLoading(true);
    joinRoom(room._id, token).then((response) => {
      console.log('[Join Room Response]', response);
      storeUserData(response).then(() => {
        setLoading(false);
        setUser(response);
        navigation.navigate('Room', {room: room});
      });
    });
  };

  const toggleShowRoomDetails = () => {
    setShowRoomDetails(!showRoomDetails);
  };

  const styles = StyleSheet.create({
    tile: {
      width: constants.width,
      paddingVertical: 10,
      backgroundColor: constants.background3,
      borderBottomColor: darkTheme ? 'transparent' : constants.lineColor,
      borderBottomWidth: 0.25,
    },
    tileSmall: {
      width: constants.width,
      height: 65,
      paddingLeft: 25,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: constants.background3,
    },
    tileSmallLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    chevron: {
      width: 30,
      height: 30,
      marginRight: 20,
    },
    heading: {
      color: constants.text1,
      marginLeft: 15,
      fontSize: 20,
      fontWeight: '500',
      fontFamily: 'Helvetica Neue',
    },
    description: {
      color: 'grey',
      marginLeft: 15,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: 'Helvetica Neue',
    },
    listOfUsers: {
      marginTop: 5,
      marginLeft: 25,
    },
    joinButton: {
      width: 50,
      height: 30,
      position: 'absolute',
      right: 25,
      bottom: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
  });

  return (
    <>
      <View style={styles.tile}>
        <View style={styles.tileSmall}>
          <View style={styles.tileSmallLeft}>
            <CircleAvatar
              uri={room.profilePic === undefined ? undefined : room.profilePic}
              size={50}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.heading}>{room.name}</Text>
              <View style={{width: constants.width * 0.5}}>
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
          </View>
          {showRoomDetails ? (
            <TouchableOpacity onPress={toggleShowRoomDetails}>
              <Ionicons
                name="chevron-up"
                size={24}
                color={constants.background2}
                style={styles.chevron}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleShowRoomDetails}>
              <Ionicons
                name="chevron-down"
                size={24}
                style={styles.chevron}
                color={constants.background2}
              />
            </TouchableOpacity>
          )}
        </View>

        {showRoomDetails ? (
          <View style={styles.listOfUsers}>
            <FlatList
              style={styles.listOfUsers}
              scrollEnabled={false}
              data={listOfUsers}
              keyExtractor={(key, index) => index.toString()}
              renderItem={({item}) => (
                <Text style={{color: 'grey'}}>{item.username}</Text>
              )}
            />
          </View>
        ) : (
          <></>
        )}

        {showRoomDetails ? (
          loading ? (
            <JoinLoadingButton />
          ) : alreadyJoined ? (
            <View style={[styles.joinButton, {backgroundColor: '#0f6602'}]}>
              <Text style={{color: 'white', fontSize: 10}}>Joined</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleJoin}
              style={[styles.joinButton, {backgroundColor: '#012470'}]}>
              <Text style={{color: 'white', fontSize: 12}}>Join</Text>
            </TouchableOpacity>
          )
        ) : (
          <></>
        )}
      </View>
    </>
  );
});

export default SearchRenderTile;
