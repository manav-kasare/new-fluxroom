import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';

import CustomToast from '../../../shared/CustomToast';
import UserTile from '../Search/UserTile';
import {
  getUserInfo,
  acceptFriendRequest,
  declineFriendRequest,
} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Requests() {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [idList, setIdList] = useState([]);
  const [onpress, setOnPress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getUserInfo(user.id).then((data) => {
      const list = JSON.parse(data.requests).requests;
      setIdList(list);
    });
  }, [onpress, refreshing]);

  const handleAccept = (ID) => {
    setOnPress(!onpress);
    acceptFriendRequest(user.id, ID).then((responseText) => {
      if (responseText !== 'success') {
        CustomToast('An Error Occured');
      }
    });
  };

  const handleDecline = (ID) => {
    setOnPress(!onpress);
    declineFriendRequest(user.id, ID).then((responseText) => {
      if (responseText !== 'success') {
        CustomToast('An Error Occured');
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <FlatList
        data={idList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginBottom: 5,
              }}>
              <TouchableOpacity onPress={() => handleAccept(item)}>
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
              <TouchableOpacity onPress={() => handleDecline(item)}>
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
}

function RequestUserTile({user}) {
  return (
    <View style={{paddingVertical: 10}}>
      <UserTile
        username={user.username}
        description={user.description}
        profilePhoto={user.profilePhoto}
      />
    </View>
  );
}
