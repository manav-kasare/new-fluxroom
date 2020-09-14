import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import globalStyles from '../../../shared/GlobalStyles';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';
import Tile from '../../../shared/Tile';
import {getUserMe} from '../../../backend/database/apiCalls';
import TilesLoading from './TilesLoading';
import {getToken} from '../../../shared/KeyChain';

const ChatRooms = ({navigation}) => {
  const {setUser} = useContext(UserDetailsContext);
  const {constants} = useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);

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

const EmptyItem = React.memo(({navigation}) => {
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
});

const RenderTile = React.memo(({item, navigation}) => {
  const [room, setRoom] = React.useState(item);

  const handleOnPressTile = () => {
    navigation.navigate('Room', {room: room, setRoom: setRoom});
  };

  return (
    <Tile
      uri={room.profilePic === undefined ? undefined : room.profilePic}
      heading={room.name}
      subHeading={room.description}
      onPressTile={handleOnPressTile}
      onlineSpeakers="5"
    />
  );
});
