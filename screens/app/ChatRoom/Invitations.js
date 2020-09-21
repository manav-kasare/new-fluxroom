import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import {CustomErrorToast} from '../../../shared/CustomToast';
import {
  joinRoom,
  removeFromInvitedToRooms,
} from '../../../backend/database/apiCalls';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';
import {ActivityIndicator, Button} from 'react-native-paper';
import CircleAvatar from '../../../shared/CircleAvatar';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Invitations = ({navigation}) => {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const {token} = useContext(TokenContext);
  const [invitations, setInvitations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let invitedToRooms = [];
    user.invitedToRooms.map((room) => {
      invitedToRooms.push({...room, key: `${room._id}`});
    });
    setInvitations(invitedToRooms);
  }, [refreshing]);

  const handleAccept = (rowMap, rowKey, room) => {
    setLoadingAccept(true);
    joinRoom(room._id, token).then((response) => {
      if (response.error) {
        setLoadingAccept(false);
        CustomErrorToast('An Error Occured');
      } else {
        setLoadingAccept(false);
        navigation.navigate('Room', {
          id: room._id,
          name: room.name,
          profilePic: room.profilePic,
          description: room.description,
        });
        removeFromInvitedToRooms();
      }
    });
  };

  const handleDecline = (rowMap, rowKey, room) => {
    removeFromInvitedToRooms().then(() => {});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <FlatList
        data={invitations}
        renderItem={(data) => <Tlie room={data.item} />}
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

function Tlie({room}) {
  const {constants} = React.useContext(ThemeContext);
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
        navigation.navigate('Room', {
          id: room._id,
          name: room.name,
          profilePic: room.profilePic,
          description: room.description,
        });
        removeFromInvitedToRooms();
      }
    });
  };

  const handleDecline = (_id) => {
    setLoadingReject(true);
    removeFromInvitedToRooms();
  };

  const styles = StyleSheet.compose({
    tile: {
      flex: 1,
      height: 65,
      paddingLeft: 25,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: constants.background3,
    },
    heading: {
      color: constants.text1,
      marginLeft: 15,
      fontSize: 20,
      fontWeight: '500',
      fontFamily: 'Helvetica Neue',
    },
    subHeading: {
      color: 'grey',
      marginLeft: 15,
      fontSize: 13,
      fontWeight: '400',
      fontFamily: 'Helvetica Neue',
    },
  });

  return (
    <View style={styles.tile}>
      <View style={{flexDirection: 'row'}}>
        <CircleAvatar uri={room.profilePic} size={50} type="room" />
        <View>
          <Text style={styles.heading}>{room.name}</Text>
          <Text style={styles.subHeading}>{room.name}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        {loadingAccept ? (
          <ActivityIndicator
            color={constants.primary}
            animating={true}
            size="small"
          />
        ) : (
          <Button color={constants.primary} onPress={handleAccept}>
            Accept
          </Button>
        )}
        {loadingReject ? (
          <ActivityIndicator
            color={constants.primary}
            animating={true}
            size="small"
          />
        ) : (
          <Button color={constants.primary} onPress={handleDecline}>
            Decline
          </Button>
        )}
      </View>
    </View>
  );
}

export default React.memo(Invitations);
