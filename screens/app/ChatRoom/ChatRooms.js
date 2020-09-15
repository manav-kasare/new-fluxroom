import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

console.disableYellowBox = true;

import globalStyles from '../../../shared/GlobalStyles';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../../../shared/Context';
import {getUserMe} from '../../../backend/database/apiCalls';
import ChatRoomTilesLoading from './ChatRoomTilesLoading';
import {getToken} from '../../../shared/KeyChain';
import InvitationsIcon from './InvitationsIcon';
import CreateRoom from '../JoinCreateRoom/CreateRoom';
import ChatRoomRenderTile from './ChatRoomRenderTile';

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
            <Entypo size={30} color="white" name="plus" />
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
    <View
      style={{
        flex: 1,
      }}>
      <CreateRoom
        isVisible={isCreateRoomModal}
        setIsVisible={setIsCreateRoomModal}
        navigation={navigation}
      />
      <StatusBar
        barStyle="light-content"
        backgroundColor={constants.background1}
      />
      {loading ? (
        <ChatRoomTilesLoading />
      ) : (
        <FlatList
          style={{
            width: constants.width,
            flex: 1,
            backgroundColor: constants.background1,
            paddingVertical: 10,
          }}
          data={chatRoomList}
          keyExtractor={(index) => index.toString()}
          ListEmptyComponent={() => <EmptyItem navigation={navigation} />}
          renderItem={({item}) => (
            <ChatRoomRenderTile item={item} navigation={navigation} />
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
    </View>
  );
};

export default React.memo(ChatRooms);

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
