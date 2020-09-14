import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import OptionsModal from './OptionsModal';
import {getAllRooms, joinRoom} from '../../../backend/database/apiCalls';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../shared/Context';
import Tile from '../../../shared/Tile';
import RecentSearch from './RecentSearch';
import TilesLoading from '../ChatRoom/TilesLoading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {storeUserData} from '../../../shared/AsyncStore';
import JoinLoadingButton from './JoinLoadingButton';

const Search = React.memo(({navigation}) => {
  const [rooms, setRooms] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query, setQuery] = useState(null);
  const {constants} = React.useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);
  const [modalItem, setModalItem] = useState({id: ''});

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    getAllRooms().then((data) => {
      setRooms(data);
      setloading(false);
      setRefreshing(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRooms();
  };

  const handleSearch = _.debounce((q) => {
    setFilteredRooms(_.filter(rooms, (_room) => _.includes(_room.name, q)));
  }, 250);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
      }}>
      <OptionsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={modalItem._id}
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
        }}
        placeholder="Search Username"
        placeholderTextColor="grey"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          handleSearch(text);
        }}
        iconColor="grey"
        icon={() => (
          <Ionicons name="search" size={25} color={constants.background2} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={constants.background2}
          />
        }
      />
      {loading ? (
        <TilesLoading />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={filteredRooms}
          renderItem={({item}) => {
            setModalItem(item);
            return (
              <RenderTile
                room={item}
                navigation={navigation}
                onPressTile={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              />
            );
          }}
          ListEmptyComponent={() => <RecentSearch />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={constants.background2}
            />
          }
          keyExtractor={(key, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
});

export default Search;

const RenderTile = React.memo(({room, onPressTile, navigation}) => {
  const {constants, darkTheme} = useContext(ThemeContext);
  const {token} = useContext(TokenContext);
  const {user, setUser} = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  React.useEffect(() => {
    const rooms = user.joinedRooms;
    rooms.map((_room) => {
      console.log('[Checking Room id]');
      if (_room._id === room._id) {
        setAlreadyJoined(true);
      }
    });
  }, []);

  const handleJoin = () => {
    setLoading(true);
    joinRoom(room._id, token).then((response) => {
      console.log('[Join Room Response]', response);
      storeUserData(response).then(() => {
        setLoading(false);
        setUser(response);
        navigation.navigate('Room', {room: room});
      });
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
        backgroundColor: constants.background3,
        borderBottomColor: darkTheme ? 'transparent' : constants.lineColor,
        borderBottomWidth: 0.5,
      }}>
      <Tile
        uri={room.profilePic}
        heading={room.name}
        subHeading={room.description}
        onPressTile={onPressTile}
      />
      {loading ? (
        <JoinLoadingButton />
      ) : alreadyJoined ? (
        <View
          style={{
            backgroundColor: '#0f6602',
            width: 50,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontSize: 10}}>Joined</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleJoin}
          style={{
            backgroundColor: '#012470',
            width: 50,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontSize: 12}}>Join</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});
