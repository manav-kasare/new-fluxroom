import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';

import CustomToast, {CustomErrorToast} from '../../../shared/CustomToast';
import Tile from '../../../shared/Tile';
import {
  joinRoom,
  removeFromInvitedToRooms,
} from '../../../backend/database/apiCalls';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';
import {LoadingAccept, LoadingReject} from './LoadingAcceptReject';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Invitations = ({navigation}) => {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);

  const [invitations, setInvitations] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setInvitations(user.invitedToRooms);
  }, [refreshing]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <FlatList
        data={invitations}
        keyExtractor={(index) => index.toString()}
        renderItem={({item}) => <RequestUserTile room={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={constants.background2}
          />
        }
      />
    </SafeAreaView>
  );
};

function RequestUserTile({room}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const handleAccept = (room) => {
    setLoadingAccept(true);
    joinRoom(room._id, token).then((response) => {
      if (response.error) {
        setLoadingAccept(false);
        CustomErrorToast('An Error Occured');
      } else {
        setLoadingAccept(false);
        navigation.navigate('Room', {room: room});
        removeFromInvitedToRooms();
      }
    });
  };

  const handleReject = (_id) => {
    setLoadingReject(true);
    removeFromInvitedToRooms();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: constants.background3,
        borderBottomColor: darkTheme ? 'transparent' : constants.lineColor,
        borderBottomWidth: 0.5,
      }}>
      <Tile
        uri={room.profilePic}
        heading={room.name}
        subHeading={room.description}
      />
      <View style={{flexDirection: 'row'}}>
        {loadingAccept ? (
          <LoadingAccept />
        ) : (
          <TouchableOpacity
            onPress={handleAccept}
            style={{
              width: 75,
              height: 65,
              backgroundColor: '#0f6602',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Accept</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleReject}
          style={{
            width: 75,
            height: 65,
            backgroundColor: '#ba0000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loadingReject ? (
            <LoadingReject />
          ) : (
            <Text style={{color: 'white'}}>Decline</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(Invitations);
