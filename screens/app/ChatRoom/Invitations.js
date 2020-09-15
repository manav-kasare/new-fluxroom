import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

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
        navigation.navigate('Room', {room: room});
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
          <ActivityIndicator size="small" color="white" />
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
      <View
        style={{
          height: 65,
          width: 5,
          backgroundColor: '#0f6602',
          position: 'absolute',
          left: 0,
        }}
      />
      <View
        style={{
          height: 65,
          width: 5,
          backgroundColor: '#ba0000',
          position: 'absolute',
          right: 0,
        }}
      />
    </View>
  );
}

export default React.memo(Invitations);
