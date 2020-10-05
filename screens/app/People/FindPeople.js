import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Searchbar, ActivityIndicator} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {List, Button} from 'react-native-paper';

import {ThemeContext} from '../../../shared/Context';
import {getUsers} from '../../../backend/database/apiCalls';
import CircleAvatar from '../../../shared/CircleAvatar';

export default function FindPeople({navigation}) {
  const [query, setQuery] = React.useState('');
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [allUsers, setAllUsers] = React.useState([]);
  const [filteredUsers, setFileredUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers().then((response) => {
      setAllUsers(response);
    });
  }, []);

  const handleSearch = _.debounce((q) => {
    if (q === '') {
      setFileredUsers([]);
    } else {
      setFileredUsers(
        _.filter(allUsers, (_user) => _.includes(_user.username, q)),
      );
    }
  }, 250);

  const navigateToContacts = () => {
    navigation.navigate('ContactsList');
  };

  const renderItem = ({item}) => <RenderTile item={item} />;

  const styles = StyleSheet.create({
    searchBar: {
      height: 50,
      backgroundColor: constants.background3,
      borderBottomColor: constants.lineColor,
      borderBottomWidth: 0.5,
      borderTopColor: constants.lineColor,
      borderTopWidth: 0.5,
      elevation: 0,
      shadowOpacity: 0,
    },
    view: {
      width: constants.width,
      height: 60,
      paddingHorizontal: 25,
      justifyContent: 'center',
      borderBottomColor: constants.lineColor,
      borderBottomWidth: 0.3,
    },
    view_text: {
      color: constants.text1,
      marginLeft: 25,
      fontSize: 14,
      fontWeight: '500',
    },
    view_touchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkTheme
          ? constants.background1
          : constants.background3,
      }}>
      <Searchbar
        inputStyle={{color: constants.text1, fontSize: 15}}
        style={styles.searchBar}
        placeholder="Search Username"
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
      <View style={styles.view}>
        <TouchableOpacity
          onPress={navigateToContacts}
          style={styles.view_touchable}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 5,
            }}>
            <AntDesign name="contacts" size={20} color={constants.text1} />
            <Text style={styles.view_text}>Get from Contacts</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={constants.text1} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={filteredUsers}
          style={{flex: 1, width: constants.width}}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const RenderTile = ({item}) => {
  const {constants} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);

  const handleRequest = () => {};

  const friendRequestButton = () => loading ? <ActivityIndicator color={constants.primary}  animating={true} /> : (
    <Button color={constants.primary} onPress={handleRequest}>
      Request
    </Button>
  );

  const styles = StyleSheet.create({
    title: {
      fontWeight: '600',
      color: constants.text1,
      fontSize: 20,
    },
    description: {
      color: 'grey',
    },
  });

  return (
    <List.Item
      title={item.username}
      titleStyle={styles.title}
      left={() => <CircleAvatar uri={item.profilePic} size={50} />}
      description={item.description}
      descriptionStyle={styles.description}
      right={friendRequestButton}
    />
  );
};
