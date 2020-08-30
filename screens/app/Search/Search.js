import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import base64 from 'react-native-base64';

import OptionsModal from './OptionsModal';
import {getUsers} from '../../../backend/database/apiCalls';
import {ThemeContext, UserDetailsContext} from '../../../shared/Context';
import Tile from '../../../shared/Tile';
import RecentSearch from './RecentSearch';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Search() {
  const {user} = useContext(UserDetailsContext);
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query, setQuery] = useState(null);
  const {constants} = React.useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [onFocusRefresh, setOnFocusRefresh] = useState(true);

  const onRefresh = React.useCallback(() => {
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
    getUsers().then((data) => {
      setUsers(data);
    });
  }, [refreshing]);

  const handleSearch = _.debounce((q) => {
    setFilteredUsers(
      _.filter(users, (_user) =>
        user.id !== _user.id ? _user.username.includes(q) : null,
      ),
    );
  }, 250);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
      }}>
      <Searchbar
        autoCapitalize="none"
        inputStyle={{color: constants.text1, fontSize: 15}}
        style={{
          height: 60,
          backgroundColor: 'rgba(255,255,255,0.05)',
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
          style={{flex: 1}}
          data={filteredUsers}
          renderItem={({item}) => (
            <>
              <RenderTile
                username={item.username}
                description={item.description}
                profilePhoto={item.profilePhoto}
                onPressTile={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              />
              <OptionsModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                id={item.id}
              />
            </>
          )}
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

const RenderTile = ({username, description, profilePhoto, onPressTile}) => {
  const [_profilePhoto, setProfilePhoto] = useState(undefined);

  useEffect(() => {
    setProfilePhoto(
      profilePhoto !== null ? base64.decode(profilePhoto) : undefined,
    );
  }, []);
  return (
    <Tile
      uri={_profilePhoto}
      heading={username}
      subHeading={description}
      onPressTile={onPressTile}
      itemName="tileAvatar"
      onPressTile={onPressTile}
    />
  );
};
