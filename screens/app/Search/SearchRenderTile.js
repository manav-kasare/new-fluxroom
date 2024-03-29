import React, {useState, useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {Button, ActivityIndicator} from 'react-native-paper';
import {
  mix,
  useTransition,
  useValue,
  onGestureEvent,
} from 'react-native-redash';
import Animated, {useCode, cond, not, eq, set} from 'react-native-reanimated';

import {joinRoom, getUserInfo} from '../../../backend/database/apiCalls';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../shared/Context';
import {storeUserData} from '../../../shared/AsyncStore';
import CircleAvatar from '../../../shared/CircleAvatar';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import il8n from '../../../locales/il8n';
import CachedImage from '../../../shared/CachedImage';

const SearchRenderTile = React.memo(({navigation, room}) => {
  const {constants, darkTheme} = useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const {user, setUser} = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [formattedListOfUsers, setFormattedListOfUsers] = React.useState(
    room.listOfUsers.slice(0, 4),
  );

  const showRoomDetails = useValue(0);
  const state = useValue(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({state});
  const transition = useTransition(showRoomDetails);
  const height = mix(transition, 0, constants.height * 0.15);
  const rotateZ = mix(transition, 0, Math.PI);

  useCode(
    () =>
      cond(eq(state, State.END), set(showRoomDetails, not(showRoomDetails))),
    [showRoomDetails, state],
  );

  React.useEffect(() => {
    const rooms = user.joinedRooms;
    rooms.map((_room) => {
      if (_room === room._id) {
        setAlreadyJoined(true);
      }
    });
  }, []);

  const handleJoin = () => {
    setLoading(true);
    joinRoom(room._id, token).then((response) => {
      storeUserData(response).then(() => {
        setLoading(false);
        setUser(response);
        setAlreadyJoined(true);
        navigation.navigate('Room', {
          id: room._id,
        });
      });
    });
  };

  const renderSpeaker = ({item}) => <RenderSpeaker id={item} />;

  const renderFooter = () =>
    room.listOfUsers.length > 4 ? (
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: constants.primary,
        }}>
        <Text style={{color: 'white'}}>+{room.listOfUsers.length - 4}</Text>
      </View>
    ) : (
      <></>
    );

  const nothing = () => {};

  const styles = StyleSheet.create({
    tile: {
      width: constants.width,
      paddingVertical: 10,
      backgroundColor: darkTheme
        ? constants.background1
        : constants.background3,
      borderBottomColor: darkTheme ? '#171717' : constants.lineColor,
      borderBottomWidth: 0.2,
    },
    tileSmall: {
      width: constants.width,
      height: 65,
      paddingLeft: 25,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: darkTheme
        ? constants.background1
        : constants.background3,
    },
    tileSmallLeft: {
      flexDirection: 'row',
      alignItems: 'center',
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
    noOfUsers: {
      color: 'grey',
      marginRight: 10,
    },
    memberTile: {
      width: constants.width,
      height: 30,
      paddingLeft: 10,
      justifyContent: 'center',
    },

    chevron: {
      position: 'absolute',
      right: 5,
      bottom: 0,
    },
    joinRoomButton: {
      marginRight: 25,
    },
  });

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={styles.tile}>
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

          <View style={styles.joinRoomButton}>
            {loading ? (
              <ActivityIndicator
                color={constants.primary}
                animating={true}
                size="small"
              />
            ) : alreadyJoined ? (
              <Button mode="text" color={constants.primary} onPress={nothing}>
                {il8n.t('buttons.joinedRoom')}
              </Button>
            ) : (
              <Button
                mode="text"
                color={constants.primary}
                onPress={handleJoin}>
                {il8n.t('buttons.joinRoom')}
              </Button>
            )}
          </View>

          <Animated.View style={[styles.chevron, {transform: [{rotateZ}]}]}>
            <Ionicons
              name="chevron-down"
              size={20}
              color={constants.background2}
            />
          </Animated.View>
        </View>
        <Animated.View
          style={{
            height,
            opacity: showRoomDetails,
            paddingLeft: 50,
          }}>
          <Text
            style={{marginVertical: 5, color: constants.text1, maringLeft: 25}}>
            3 Speaking
          </Text>
          <FlatList
            style={styles.listOfUsers}
            horizontal={true}
            scrollEnabled={false}
            data={formattedListOfUsers}
            keyExtractor={(key, index) => index.toString()}
            renderItem={renderSpeaker}
            ListFooterComponent={renderFooter}
          />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
});

const RenderSpeaker = ({id}) => {
  const [profilePic, setProfilePic] = React.useState('');

  React.useEffect(() => {
    getUserInfo(id).then((response) => {
      setProfilePic(response.profilePic);
    });
  }, []);

  return (
    <View
      style={{
        height: 50,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CachedImage
        style={{
          height: 50,
          width: 50,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        uri={profilePic}
      />
    </View>
  );
};

export default SearchRenderTile;
