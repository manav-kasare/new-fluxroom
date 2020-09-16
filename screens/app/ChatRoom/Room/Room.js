import React, {useContext, useReducer, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {getChatroomInfo} from '../../../../backend/database/apiCalls';
import {ThemeContext} from '../../../../shared/Context';
import RoomAvatar from './RoomAvatar';
import RoomUserOptions from './RoomUserOptions';
import RoomAvatarLoading from './RoomAvatarLoading';
import InviteToRoom from './InviteToRoom';
import RoomBottomView from './RoomBottomView';

const Room = ({route, navigation}) => {
  const {room} = route.params;
  const [_room, _setRoom] = useState(room);
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [members, setMembers] = React.useState(null);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [someoneRaisingHand, setSomeoneRaisingHand] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [inviteModal, setInviteModal] = React.useState(false);

  React.useEffect(() => {
    setMembers(room.listOfUsers);
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      title: _room.name,
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() =>
            navigation.navigate('RoomSettings', {
              room: room,
              setRoom: setRoom,
            })
          }>
          <Feather name="menu" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const setData = () => {
    getChatroomInfo(room._id).then((response) => {
      _setRoom(response);
      setMembers(response.listOfUsers);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setData();
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity key={item._id} onPress={toggleVisible}>
      <RoomUserOptions isVisible={isVisible} setIsVisible={setIsVisible} />
      <RoomAvatar
        uri={item.profilePic}
        size={constants.width * 0.25}
        name={item.username}
        isHost={false}
      />
    </TouchableOpacity>
  );

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={constants.background2}
    />
  );

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: darkTheme ? constants.background3 : constants.primary,
    },
    columnWrapperStyle: {
      justifyContent: 'space-evenly',
      width: constants.width,
    },
    flatList: {backgroundColor: constants.background1},
    screenBottomView: {
      width: constants.width,
      height: 40,
      backgroundColor: constants.background1,
    },
  });

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <InviteToRoom
          inviteModal={inviteModal}
          setInviteModal={setInviteModal}
          roomName={room.name}
        />
        <StatusBar
          backgroundColor={
            darkTheme ? constants.background1 : constants.primary
          }
        />
        <View style={{backgroundColor: constants.background1, flex: 1}}>
          {loading ? (
            <RoomAvatarLoading />
          ) : (
            <FlatList
              data={members}
              style={styles.flatList}
              columnWrapperStyle={styles.columnWrapperStyle}
              numColumns={3}
              renderItem={renderItem}
              refreshControl={refreshControl}
            />
          )}
          <RoomBottomView
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsSpeaking}
            someoneRaisingHand={someoneRaisingHand}
            setSomeoneRaisingHand={setSomeoneRaisingHand}
            setInviteModal={setInviteModal}
          />
        </View>
      </SafeAreaView>
      <View style={styles.screenBottomView} />
    </>
  );
};

export default React.memo(Room);
