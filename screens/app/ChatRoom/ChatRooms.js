import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
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
import CachedImage from '../../../shared/CachedImage';
import TilesLoading from './TilesLoading';

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
    getUserMe(token).then((response) => {
      setChatRoomList(response.user.joinedRooms);
      setloading(false);
      setUser(response.user);
      setRefreshing(false);
    });
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
          ListEmptyComponent={() => <EmptyItem />}
          renderItem={({item}) => (
            <RenderTile room={item} navigation={navigation} />
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
        <CachedImage
          style={{
            width: constants.width,
            height: constants.height * 0.2,
            marginVertical: 25,
          }}
          _resizeMode="contain"
          uri="/Users/manav/projects/fluxroom/assets/tree_swing.png"
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

const RenderTile = React.memo(({room, navigation}) => {
  const handleOnPressTile = () => {
    navigation.navigate('Room', {room: room});
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
