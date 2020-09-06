import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import globalStyles from '../../../shared/GlobalStyles';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import Tile from '../../../shared/Tile';
import {
  getUserChatRooms,
  getChatroomInfo,
} from '../../../backend/database/apiCalls';
import {getToken} from '../../../shared/KeyChain';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ChatRooms = ({navigation}) => {
  const {user} = useContext(UserDetailsContext);
  const {constants} = useContext(ThemeContext);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [onFocusRefresh, setOnFocusRefresh] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleOnFocusRefresh = () => {
    setTimeout(() => {
      setOnFocusRefresh(false);
    }, 500);
  };

  useEffect(() => {
    getUserChatRooms(user._id).then((response) => {
      setChatRoomList(response);
    });
  }, []);

  useEffect(() => {
    getToken().then((token) => console.log(token));
    handleOnFocusRefresh();
  }, [refreshing]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={constants.background1}
      />
      {onFocusRefresh ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: constants.background1,
          }}>
          <ActivityIndicator size="small" color={constants.background2} />
        </View>
      ) : (
        <FlatList
          style={{
            width: constants.width,
            flex: 1,
            backgroundColor: constants.background1,
          }}
          data={chatRoomList}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <EmptyItem />}
          renderItem={({item}) => (
            <RenderTile id={item._id} navigation={navigation} />
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

const EmptyItem = React.memo(() => {
  const {constants, darkTheme} = useContext(ThemeContext);
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
          style={{
            width: constants.width,
            height: constants.height * 0.2,
            marginVertical: 25,
          }}
          resizeMode="contain"
          source={require('/Users/manav/projects/fluxroom/assets/tree_swing.png')}
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
      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Find a Room</Text>
      </TouchableOpacity>
    </View>
  );
});

const RenderTile = React.memo(({id, navigation}) => {
  const [room, setRoom] = React.useState(null);

  useEffect(() => {
    getChatroomInfo(id).then((response) => {
      setRoom(response);
    });
  }, []);

  const handleOnPressTile = () => {
    navigation.navigate('Room', {room: room});
  };
  const handleOnPressAvatar = () => {
    navigation.navigate('FullPhoto', {uri: room.profilePhoto});
  };

  return (
    <Tile
      uri={room.profilePhoto}
      heading={room.name}
      subHeading={room.description}
      onPressTile={handleOnPressTile}
      onPressAvatar={handleOnPressAvatar}
      itemName="tileAvatar"
      onlineSpeakers="5"
    />
  );
});
