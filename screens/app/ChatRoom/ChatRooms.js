import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

console.disableYellowBox = true;

import globalStyles from '../../../shared/GlobalStyles';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';
import {getUserMe, getChatroomInfo} from '../../../backend/database/apiCalls';
import TilesLoading from './TilesLoading';
import {getToken} from '../../../shared/KeyChain';
import CircleAvatar from '../../../shared/CircleAvatar';
import InvitationsIcon from './InvitationsIcon';
import CreateRoom from '../JoinCreateRoom/CreateRoom';

const ChatRooms = ({navigation}) => {
  const {user, setUser} = useContext(UserDetailsContext);
  const {constants} = useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
          <TouchableOpacity
            onPress={() => setIsCreateRoomModal(true)}
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              marginRight: 20,
            }}>
            <Text style={{color: 'dodgerblue', fontSize: 18}}>Create room</Text>
          </TouchableOpacity>
          <InvitationsIcon id={user._id} navigation={navigation} />
        </View>
      ),
    });
  });

  useEffect(() => {
    setData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setData();
  };

  const setData = () => {
    if (!token) {
      getToken().then((_token) => {
        getUserMe(_token).then((response) => {
          setChatRoomList(response.user.joinedRooms);
          setloading(false);
          setUser(response.user);
          setRefreshing(false);
        });
      });
    } else {
      getUserMe(token).then((response) => {
        setChatRoomList(response.user.joinedRooms);
        setloading(false);
        setUser(response.user);
        setRefreshing(false);
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <CreateRoom
        isVisible={isCreateRoomModal}
        setIsVisible={setIsCreateRoomModal}
      />
      <StatusBar
        barStyle="light-content"
        backgroundColor={constants.background1}
      />
      {loading ? (
        <TilesLoading />
      ) : (
        <FlatList
          style={{
            width: constants.width,
            flex: 1,
            backgroundColor: constants.background1,
          }}
          data={chatRoomList}
          keyExtractor={(index) => index.toString()}
          ListEmptyComponent={() => <EmptyItem navigation={navigation} />}
          renderItem={({item}) => (
            <RenderTile item={item} navigation={navigation} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={constants.background2}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default React.memo(ChatRooms);

const RenderTile = React.memo(({item, navigation}) => {
  const {constants} = React.useContext(ThemeContext);
  const [room, setRoom] = React.useState(item);
  const [listOfUsers, setListOfUsers] = React.useState([]);

  React.useEffect(() => {
    getChatroomInfo(room._id).then((response) => {
      setRoom(response);
      setListOfUsers(response.listOfUsers);
    });
  }, []);

  const handleOnPressTile = () => {
    navigation.navigate('Room', {room: room, setRoom: setRoom});
  };

  const styles = StyleSheet.create({
    tile: {
      width: constants.width * 0.9,
      height: constants.height * 0.25,
      shadowOpacity: 0.1,
      shadowOffset: {width: 0.1, height: 0.1},
      borderRadius: 8,
      backgroundColor: constants.background3,
      alignSelf: 'center',
      marginVertical: 10,
      padding: 25,
    },
    tileSmall: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    heading: {
      color: constants.text1,
      marginLeft: 15,
      fontSize: 20,
      fontWeight: '500',
      fontFamily: 'Helvetica Neue',
    },
    description: {
      color: 'grey',
      marginLeft: 15,
      fontSize: 12,
      fontWeight: '300',
      fontFamily: 'Helvetica Neue',
    },
    listOfUsers: {
      marginTop: 10,
      marginLeft: 5,
    },
  });

  return (
    <TouchableOpacity onPress={handleOnPressTile}>
      <View style={styles.tile}>
        <View style={styles.tileSmall}>
          <CircleAvatar
            uri={room.profilePic === undefined ? undefined : room.profilePic}
            size={50}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.heading}>{room.name}</Text>
            <Text style={styles.description}>{room.description}</Text>
          </View>
        </View>
        <View style={styles.listOfUsers}>
          <FlatList
            style={styles.listOfUsers}
            scrollEnabled={false}
            data={listOfUsers}
            keyExtractor={(key, index) => index.toString()}
            renderItem={({item}) => (
              <Text style={{color: 'grey'}}>{item.username}</Text>
            )}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});

const EmptyItem = ({navigation}) => {
  const {constants, darkTheme} = useContext(ThemeContext);

  const navigate = () => {
    navigation.navigate('Search');
  };

  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 100,
        flex: 1,
        height: constants.height,
      }}>
      <View style={{marginVertical: 50, alignItems: 'center'}}>
        <Image
          source={require('/Users/manav/projects/fluxroom/assets/tree_swing.png')}
          style={{
            width: constants.width,
            height: constants.height * 0.2,
            marginVertical: 25,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: darkTheme ? 'white' : 'grey',
            fontSize: 20,
            fontWeight: '300',
          }}>
          No Rooms :(
        </Text>
      </View>
      <TouchableOpacity style={globalStyles.button} onPress={navigate}>
        <Text style={globalStyles.buttonText}>Find a Room</Text>
      </TouchableOpacity>
    </View>
  );
};
