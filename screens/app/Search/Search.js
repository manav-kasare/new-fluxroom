import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import _ from 'lodash';
import base64 from 'react-native-base64';

import OptionsModal from './OptionsModal';
import {getUsers} from '../../../backend/database/apiCalls';
import {ThemeContext, UserDetailsContext} from '../../../shared/Context';
import Tile from '../../../shared/Tile';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Search() {
  const {user} = useContext(UserDetailsContext);
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
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
          height: 40,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: constants.lineColor,
          margin: 25,
          borderRadius: 10,
          elevation: 0,
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
          <EvilIcons name="search" size={24} color={constants.background2} />
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
              <OptionsModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                id={item.id}
              />
              <RenderTile
                username={item.username}
                description={item.description}
                profilePhoto={item.profilePhoto}
                onPressTile={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              />
              {/* <TouchableOpacity
                style={{
                  width: constants.width,
                  height: constants.height * 0.09,
                  backgroundColor: constants.background1,
                  paddingLeft: 25,
                }}
                onPress={() => {
                  setIsModalVisible(!isModalVisible);
                }}>
                <UserTile
                  username={item.username}
                  description={item.description}
                  profilePhoto={item.profilePhoto}
                />
              </TouchableOpacity> */}
            </>
          )}
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
