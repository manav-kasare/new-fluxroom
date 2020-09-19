import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

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
import {ActivityIndicator} from 'react-native-paper';
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
    // removeFromInvitedToRooms().then(() => {
    deleteRow(rowMap, rowKey);
    // });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...invitations];
    const prevIndex = invitations.findIndex((item) => item.key === rowKey);
    console.log(prevIndex);
    newData.splice(prevIndex, 1);
    setInvitations(newData);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={[styles.rowBack, {backgroundColor: constants.background3}]}>
      <TouchableOpacity
        style={styles.backLeftBtn}
        onPress={() => handleAccept(rowMap, data.item.key, data)}>
        {loadingAccept ? (
          <ActivityIndicator
            color={constants.primary}
            size="small"
            animating={true}
          />
        ) : (
          <Text style={styles.backTextWhite}>Accept</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => handleDecline(rowMap, data.item.key, data)}>
        <Text style={styles.backTextWhite}>Decline</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <SwipeListView
        useFlatList={true}
        data={invitations}
        leftOpenValue={75}
        rightOpenValue={-75}
        renderItem={(data) => <RequestUserTile room={data.item} />}
        renderHiddenItem={renderHiddenItem}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={1000}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: 'white',
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backLeftBtn: {
    backgroundColor: '#0f6602',
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    left: 0,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#ba0000',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 0,
  },
});

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
      <View
        style={{
          height: 65,
          width: 5,
          backgroundColor: '#0f6602',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
      <View
        style={{
          height: 65,
          width: 5,
          backgroundColor: '#ba0000',
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
    </View>
  );
}

export default React.memo(Invitations);

const Tile = React.memo(
  ({uri, onPressTile, heading, subHeading, onlineSpeakers}) => {
    const {darkTheme, constants} = React.useContext(ThemeContext);

    return (
      <TouchableOpacity onPress={onPressTile}>
        <View
          style={{
            flex: 1,
            height: 65,
            paddingLeft: 25,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: constants.background3,
          }}>
          <CircleAvatar uri={uri} size={50} />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: constants.text1,
                marginLeft: 15,
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Helvetica Neue',
              }}>
              {heading}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: 15,
                fontSize: 13,
                fontWeight: '400',
                fontFamily: 'Helvetica Neue',
              }}>
              {subHeading}
            </Text>
          </View>
          {onlineSpeakers ? (
            <View
              style={{
                position: 'absolute',
                right: 25,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'green', fontSize: 12}}>
                {onlineSpeakers} Online
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);
