import React, {useState, useEffect} from 'react';
import {TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import {Searchbar} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import _ from 'lodash';

import UserTile from './UserTile';
import OptionsModal from './OptionsModal';
import {getUsers} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';

export default function Search() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {constants} = React.useContext(ThemeContext);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleSearch = _.debounce((query) => {
    setFilteredUsers(_.filter(users, (user) => user.username.includes(query)));
  }, 250);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
      }}>
      <FlatList
        style={{flex: 1}}
        data={filteredUsers}
        ListHeaderComponent={() => (
          <Searchbar
            inputStyle={{color: constants.text1}}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: constants.lineColor,
              margin: 25,
              borderRadius: 10,
              elevation: 0,
            }}
            placeholder="Search Username"
            placeholderTextColor="grey"
            onChangeText={(text) => handleSearch(text)}
            autoFocus={true}
            iconColor="grey"
            icon={() => (
              <EvilIcons
                name="search"
                size={24}
                color={constants.background2}
              />
            )}
          />
        )}
        CellRendererComponent={({item}) => (
          <>
            <OptionsModal
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              id={item.id}
            />
            <TouchableOpacity
              style={{
                width: constants.width,
                height: constants.height * 0.09,
                backgroundColor: constants.background1,
              }}
              onPress={() => {
                setIsModalVisible(!isModalVisible);
              }}>
              <UserTile
                username={item.username}
                description={item.description}
                profilePhoto={item.profilePhoto}
              />
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(key, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
