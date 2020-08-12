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

import RoomTile from './RoomTile';
import globalStyles from '../../../shared/GlobalStyles';
import {getUserChatRooms} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

var list = [];
for (var i = 0; i < 10; i++) {
  list.push(`${i}`);
}

export default function ChatRooms({navigation}) {
  const {user} = useContext(UserDetailsContext);
  const {constants, darkTheme} = useContext(ThemeContext);
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
    handleOnFocusRefresh();
    getUserChatRooms(user.id).then((roomList) => {
      setChatRoomList(roomList);
    });
  }, [refreshing]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: constants.width,
        backgroundColor: constants.background1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <StatusBar barStyle={darkTheme ? 'light-content' : 'dark-content'} />
      {onFocusRefresh ? (
        <View
          style={{
            flex: 1,
            backgroundColor: constants.background1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="small" color={constants.background2} />
        </View>
      ) : (
        <FlatList
          style={{width: constants.width}}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
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
          )}
          renderItem={({item}) => (
            <RoomTile id={item} navigation={navigation} />
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
}
