import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import Modal from 'react-native-modal';
import {Searchbar} from 'react-native-paper';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  ThemeContext,
  TokenContext,
  UserDetailsContext,
} from '../../../../shared/Context';
import {
  getUsers,
  inviteUserToRoom,
  getChatroomInfo,
} from '../../../../backend/database/apiCalls';
import CircleAvatar from '../../../../shared/CircleAvatar';
import {CustomErrorToast} from '../../../../shared/CustomToast';
import {fcmService} from '../../../../firebase/FCMService';

export default function InviteToRoom({
  inviteModal,
  setInviteModal,
  roomName,
  id,
}) {
  const {constants} = React.useContext(ThemeContext);
  const [query, setQuery] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState([]);
  const [fileredUsers, setFilteredUsers] = React.useState(null);
  const [listOfUsers, setListOfUsers] = React.useState(null);

  React.useEffect(() => {
    getChatroomInfo(id).then((response) => {
      setListOfUsers(response.listOfUsers);
    });
    getUsers().then((_allUsers) => {
      setAllUsers(_allUsers);
    });
  }, []);

  const handleSearch = _.debounce((q) => {
    if (q === '') {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(
        _.filter(allUsers, (_user) => _.includes(_user.username, q)),
      );
    }
  }, 250);

  const renderItem = ({item}) => (
    <Tile
      item={item}
      roomName={roomName}
      listOfUsers={listOfUsers}
      roomId={id}
    />
  );

  return (
    <Modal
      isVisible={inviteModal}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      style={{
        width: constants.width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: constants.height * 0.2,
        backgroundColor: constants.background3,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 25,
      }}
      onBackdropPress={() => setInviteModal(false)}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown">
      <View
        style={{
          backgroundColor: 'grey',
          height: 5,
          width: 50,
          alignSelf: 'center',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
        }}
      />
      <Searchbar
        autoCapitalize="none"
        inputStyle={{color: constants.text1, fontSize: 15}}
        style={{
          height: 60,
          backgroundColor: constants.background3,
          borderBottomWidth: 1,
          borderBottomColor: constants.lineColor,
          elevation: 0,
          shadowOpacity: 0,
          paddingRight: 25,
        }}
        autoFocus={true}
        placeholder="Search Username"
        placeholderTextColor="grey"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          handleSearch(text);
        }}
        iconColor="grey"
        icon={() => (
          <Ionicons name="search" size={20} color={constants.background2} />
        )}
      />
      <FlatList
        style={{marginTop: 15}}
        data={fileredUsers}
        keyExtractor={(key, index) => index.toString()}
        renderItem={renderItem}
      />
    </Modal>
  );
}

const Tile = ({item, roomName, listOfUsers, roomId}) => {
  const {constants} = React.useContext(ThemeContext);

  if (listOfUsers.indexOf(item._id) !== -1) {
    return <></>;
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: constants.width,
          height: 50,
          paddingHorizontal: 25,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CircleAvatar uri={item.profilePic} size={30} />
          <Text style={{marginLeft: 25, color: constants.text1}}>
            {item.username}
          </Text>
        </View>
        <SendInviteButton userProp={item} roomName={roomName} roomId={roomId} />
      </View>
    );
  }
};

const SendInviteButton = ({userProp, roomName, roomId}) => {
  const [alreadyInvited, setAlreadyInvited] = React.useState(false);
  const {token} = React.useContext(TokenContext);
  const {user} = React.useContext(UserDetailsContext);

  React.useEffect(() => {
    if (userProp.invitedToRooms.indexOf(roomId) !== -1) {
      setAlreadyInvited(true);
    } else {
      setAlreadyInvited(false);
    }
  }, []);

  const handleInvite = () => {
    inviteUserToRoom(userProp.username, roomName, token).then((response) => {
      if (response.message === `Either room or user doesn't exist`) {
        Keyboard.dismiss();
        CustomErrorToast(`Either room or user does not exist`);
      } else {
        setAlreadyInvited(true);
        sendNotification();
      }
    });
  };

  const sendNotification = () => {
    fcmService.sendNotification(
      {url: `fluxroom://invitations`},
      [userProp.notificationID],
      roomName,
      `${user.username} invited you !`,
    );
  };

  if (alreadyInvited) {
    return (
      <View
        style={{
          backgroundColor: '#0f6602',
          width: 50,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontSize: 10}}>Invited</Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={handleInvite}
        style={{
          backgroundColor: '#012470',
          width: 50,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontSize: 12}}>Invite</Text>
      </TouchableOpacity>
    );
  }
};
