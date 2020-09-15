import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, FlatList, RefreshControl, Text, View} from 'react-native';
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
import SearchRenderTile from './SearchRenderTile';
import SearchTileLoading from './SearchTileLoading';

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
          height: 50,
          backgroundColor: constants.background3,
          borderBottomWidth: 1,
          borderBottomColor: constants.lineColor,
          elevation: 0,
          shadowOpacity: 0,
        }}
        placeholder="What are you intrested in ?"
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
        <SearchTileLoading />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={filteredRooms}
          renderItem={({item}) => {
            setModalItem(item);
            return (
              <SearchRenderTile
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
