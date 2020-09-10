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
import {joinRoom, acceptInvitation} from '../../../backend/database/apiCalls';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Invitations = () => {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const {token} = useContext(TokenContext);
  const [invitations, setInvitations] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setInvitations(user.invitedToRooms);
  }, [refreshing]);

  const handleAccept = (_id) => {
    joinRoom(_id, token).then((response) => {
      if (response.error) {
        CustomErrorToast('An Error Occured');
      } else {
        acceptInvitation();
      }
    });
  };

  const handleDecline = (_id) => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <FlatList
        data={invitations}
        keyExtractor={(index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginBottom: 5,
              }}>
              <TouchableOpacity onPress={() => handleAccept(item._id)}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'dodgerblue',
                    fontFamily: 'Helvetica',
                  }}>
                  Accept
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: constants.text1,
                  fontFamily: 'Helvetica',
                  marginHorizontal: 5,
                }}>
                |
              </Text>
              <TouchableOpacity onPress={() => handleDecline(item._id)}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'crimson',
                    fontFamily: 'Helvetica',
                  }}>
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
            <RequestUserTile user={user} />
          </View>
        )}
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

function RequestUserTile({user}) {
  return (
    <View style={{paddingVertical: 10}}>
      <Tile
        uri={details.profilePhoto}
        heading={details.username}
        subHeading={details.description}
      />
    </View>
  );
}

export default React.memo(Invitations);
