import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, FlatList, RefreshControl} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import OptionsModal from './OptionsModal';
import {getAllRooms} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';
import Tile from '../../../shared/Tile';
import RecentSearch from './RecentSearch';
import TilesLoading from '../ChatRoom/TilesLoading';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Search() {
  const [rooms, setRooms] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query, setQuery] = useState(null);
  const {constants} = React.useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);
  const [modalItem, setModalItem] = useState({id: ''});

  useEffect(() => {
    getAllRooms().then((data) => {
      setRooms(data);
      setloading(false);
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
        autoFocus={true}
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
              <>
                <RenderTile
                  name={item.name}
                  description={item.description}
                  profilePic={item.profilePic}
                  onPressTile={() => {
                    setIsModalVisible(!isModalVisible);
                  }}
                />
              </>
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
}

const RenderTile = ({name, description, profilePic, onPressTile}) => {
  return (
    <Tile
      uri={profilePic}
      heading={name}
      subHeading={description}
      onPressTile={onPressTile}
      onPressTile={onPressTile}
    />
  );
};
