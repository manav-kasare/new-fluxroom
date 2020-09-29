import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
  Platform,
} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';

import {CustomErrorToast} from '../../../shared/CustomToast';
import {
  joinRoom,
  getChatroomInfo,
  declineInvitation,
  getUserMe,
} from '../../../backend/database/apiCalls';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';
import CircleAvatar from '../../../shared/CircleAvatar';

const Invitations = ({navigation}) => {
  const {constants} = React.useContext(ThemeContext);
  const {token} = React.useContext(TokenContext);
  const {user, setUser} = useContext(UserDetailsContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    getUserMe(token).then((response) => {
      setUser(response.user);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getUserInfo();
  };

  const renderItem = ({item, index}) => (
    <Tile id={item} navigation={navigation} index={index} />
  );

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={constants.background2}
      size={Platform.os === 'ios' ? 'small' : 'default'}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={constants.primary} animating={true} />
        </View>
      ) : (
        <FlatList
          data={user.invitedToRooms}
          renderItem={renderItem}
          refreshControl={refreshControl}
        />
      )}
    </SafeAreaView>
  );
};

function Tile({id, navigation, index, setInvitations, invitations}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [room, setRoom] = useState({
    name: '',
    description: '',
    profilePic: '',
  });

  React.useEffect(() => {
    getChatroomInfo(id).then((response) => {
      setRoom({...room, ...response});
    });
  }, []);

  const handleAccept = () => {
    setLoadingAccept(true);
    joinRoom(id, token).then((response) => {
      if (response.error) {
        setLoadingAccept(false);
        CustomErrorToast('An Error Occured');
      } else {
        setLoadingAccept(false);
        navigation.navigate('Room', {
          id: id,
        });
        declineInvitation(token, room.name);
      }
    });
  };

  const handleDecline = () => {
    setLoadingReject(true);
    declineInvitation(token, room.name).then((response) => {
      setInvitations(invitations.splice(index, 1));
      setLoadingReject(false);
    });
  };

  const styles = StyleSheet.create({
    tile: {
      flex: 1,
      height: 75,
      paddingLeft: 25,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: constants.background1,
      borderBottomColor: darkTheme ? '#171717' : constants.lineColor,
      borderBottomWidth: 0.2,
    },
    heading: {
      color: constants.text1,
      marginLeft: 15,
      fontSize: 18,
      fontWeight: '500',
      fontFamily: 'Helvetica Neue',
    },
    subHeading: {
      color: 'grey',
      marginLeft: 15,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: 'Helvetica Neue',
    },
  });

  return (
    <View style={styles.tile}>
      <View style={{flexDirection: 'row'}}>
        <CircleAvatar uri={room.profilePic} size={50} type="room" />
        <View style={{width: constants.width * 0.4}}>
          <Text style={styles.heading}>{room.name}</Text>
          <Text style={styles.subHeading}>{room.description}</Text>
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
