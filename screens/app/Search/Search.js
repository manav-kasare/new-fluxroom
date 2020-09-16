import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Searchbar, Appbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import {getAllRooms} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';
import SearchRenderTile from './SearchRenderTile';
import SearchTileLoading from './SearchTileLoading';
import TopRooms from './TopRooms';

const Search = React.memo(({navigation}) => {
  const [rooms, setRooms] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState(null);
  const [query, setQuery] = useState(null);
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);

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

  const renderItem = ({item}) => (
    <SearchRenderTile room={item} navigation={navigation} />
  );

  const refreshControl = () => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={constants.background2}
    />
  );

  const styles = StyleSheet.create({
    searchBar: {
      height: 50,
      backgroundColor: constants.background3,
      borderBottomColor: constants.lineColor,
      borderBottomWidth: 0.2,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerStyle: {
      backgroundColor: darkTheme ? constants.background3 : '#4640C1',
      borderWidth: 0,
      borderColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      height: 100,
    },
    headerContentStyle: {
      position: 'absolute',
      left: 15,
    },
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: '700',
      color: 'white',
    },
  });

  return (
    <>
      <Appbar.Header style={styles.headerStyle}>
        <Appbar.Content
          style={styles.headerContentStyle}
          titleStyle={styles.headerTitleStyle}
          title="Find Rooms"
        />
      </Appbar.Header>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: constants.background1,
        }}>
        <Searchbar
          inputStyle={{color: constants.text1, fontSize: 15}}
          style={styles.searchBar}
          placeholder="What are you intrested in ?"
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
        {loading ? (
          <SearchTileLoading />
        ) : (
          <FlatList
            style={{flex: 1}}
            data={filteredRooms}
            ListEmptyComponent={() => (
              <TopRooms allRooms={rooms} navigation={navigation} />
            )}
            renderItem={renderItem}
            refreshControl={refreshControl}
            keyExtractor={(index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </>
  );
});

export default Search;
