import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {Searchbar} from 'react-native-paper';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeContext, TokenContext} from '../../../../shared/Context';
import globalStyles from '../../../../shared/GlobalStyles';
import {
  getUsers,
  inviteUserToRoom,
} from '../../../../backend/database/apiCalls';
import CircleAvatar from '../../../../shared/CircleAvatar';
import {CustomErrorToast} from '../../../../shared/CustomToast';

export default function InviteToRoom({inviteModal, setInviteModal, roomName}) {
  const {constants} = React.useContext(ThemeContext);
  const [query, setQuery] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState(null);
  const [fileredUsers, setFilteredUsers] = React.useState(null);

  React.useEffect(() => {
    getUsers().then((response) => {
      setAllUsers(response);
    });
  }, []);

  const handleSearch = _.debounce((q) => {
    setFilteredUsers(
      _.filter(allUsers, (_user) => _.includes(_user.username, q)),
    );
  }, 250);

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
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              width: constants.width,
              height: 50,
              paddingHorizontal: 25,
              alignItems: 'center',
            }}>
            <CircleAvatar uri={item.profilePic} size={30} />
            <Text style={{marginLeft: 25, color: constants.text1}}>
              {item.username}
            </Text>
            <SendInviteButton user={item} roomName={roomName} />
          </View>
        )}
      />
    </Modal>
  );
}

const SendInviteButton = ({user, roomName}) => {
  const [alreadyInvited, setAlreadyInvited] = React.useState(false);
  const {token} = React.useContext(TokenContext);
  const {constants} = React.useContext(ThemeContext);

  React.useEffect(() => {
    const invitedToRooms = user.invitedToRooms;
    invitedToRooms.map((room) => {
      if (room.name === roomName) {
        setAlreadyInvited(true);
      }
    });
  }, []);

  const handleInvite = () => {
    inviteUserToRoom(user.username, roomName, token).then((response) => {
      if (response.message === `Either room or user doesn't exist`) {
        Keyboard.dismiss();
        CustomErrorToast(`Either room or user does not exist`);
      } else {
        setAlreadyInvited(true);
      }
    });
  };

  if (alreadyInvited) {
    <View
      style={{
        borderColor: 'grey',
        borderWidth: 1,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
      }}>
      <Text style={{color: constants.text1, fontSize: 10}}>Invited</Text>
    </View>;
  } else {
    <TouchableOpacity
      onPress={handleInvite}
      style={{
        borderColor: 'grey',
        borderWidth: 1,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
      }}>
      <Text style={{color: constants.text1, fontSize: 12}}>Join</Text>
    </TouchableOpacity>;
  }
};
