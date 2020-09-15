import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
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

  React.useEffect(() => {
    getChatroomInfo(room._id).then((response) => {
      setRoom(response);
      setListOfUsers(response.listOfUsers);
    });
  }, []);

  const handleOnPressTile = () => {
    navigation.navigate('Room', {room: room, setRoom: setRoom});
  };

  const toggleShowRoomDetails = () => {
    setShowRoomDetails(!showRoomDetails);
  };

  const styles = StyleSheet.create({
    tile: {
      width: constants.width * 0.9,
      shadowOpacity: 0.1,
      shadowColor: 'grey',
      shadowOffset: {width: 0.1, height: 0.1},
      borderRadius: 8,
      backgroundColor: constants.background3,
      alignSelf: 'center',
      marginVertical: 10,
      padding: 15,
    },
    tileSmall: {
      alignItems: 'center',
      flexDirection: 'row',
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
      fontSize: 14,
      fontWeight: '300',
      fontFamily: 'Helvetica Neue',
    },
    listOfUsers: {
      marginTop: 10,
      marginLeft: 5,
    },
  });

  return (
    <TouchableOpacity onPress={handleOnPressTile}>
      <View style={styles.tile}>
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
              right: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', marginRight: 15}}>x</Text>
            <TouchableOpacity onPress={toggleShowRoomDetails}>
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
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ChatRoomRenderTile);
