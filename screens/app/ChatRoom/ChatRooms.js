import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  RefreshControl,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

console.disableYellowBox = true;

import globalStyles from '../../../shared/GlobalStyles';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';
import {getUserMe} from '../../../backend/database/apiCalls';
import {getToken} from '../../../shared/KeyChain';
import CreateRoom from '../JoinCreateRoom/CreateRoom';
import ChatRoomRenderTile from './ChatRoomRenderTile';
import ChatRoomsHeader from './ChatRoomsHeader';

export default function ChatRooms({navigation}) {
  const {user, setUser} = useContext(UserDetailsContext);
  const {constants, darkTheme} = useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const [chatRoomList, setChatRoomList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);
  const isFocused = useIsFocused();

  console.log(isFocused);

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
          setUser(response.user);
          setRefreshing(false);
          setloading(false);
        });
      });
    } else {
      getUserMe(token).then((response) => {
        setChatRoomList(response.user.joinedRooms);
        setUser(response.user);
        setRefreshing(false);
        setloading(false);
      });
    }
  };

  const listEmptyComponent = () => <EmptyItem navigation={navigation} />;

  const renderItem = ({item}) => (
    <ChatRoomRenderTile item={item} navigation={navigation} />
  );

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{
        backgroundColor: darkTheme ? constants.background3 : constants.primary,
      }}
      tintColor="white"
      size={Platform.os === 'ios' ? 'small' : 'default'}
    />
  );

  return (
    <View
      style={{
        width: constants.width,
        height: constants.height,
        backgroundColor: constants.background1,
      }}>
      <CreateRoom
        isVisible={isCreateRoomModal}
        setIsVisible={setIsCreateRoomModal}
        navigation={navigation}
      />
      <ChatRoomsHeader
        id={user._id}
        navigation={navigation}
        setIsCreateRoomModal={setIsCreateRoomModal}
      />
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          darkTheme
            ? isFocused
              ? constants.background1
              : constants.background3
            : constants.primary
        }
      />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={constants.primary} animating={true} />
        </View>
      ) : (
        <FlatList
          style={{
            width: constants.width,
            flex: 1,
            marginBottom: 75,
            backgroundColor: constants.background1,
          }}
          data={chatRoomList}
          keyExtractor={(key, index) => index.toString()}
          ListEmptyComponent={listEmptyComponent}
          scroll
          renderItem={renderItem}
          refreshControl={refreshControl}
        />
      )}
    </View>
  );
}

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
          source={require('../../../assets/tree_swing.png')}
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
