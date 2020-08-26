import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import {Appbar} from 'react-native-paper';

import CustomToast from '../../../shared/CustomToast';
import {getUserInfo, removeFriend} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import Tile from '../../../shared/Tile';
import {constant} from 'lodash';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Friends({navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [idList, setIdList] = useState([]);
  const [onpress, setOnPress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getUserInfo(user.id).then((data) => {
      const list = JSON.parse(data.friends).friends;
      setIdList(list);
    });
  }, [onpress, refreshing]);

  const handleRemove = (ID) => {
    setOnPress(!onpress);
    removeFriend(user.id, ID).then((responseText) => {
      if (responseText !== 'success') {
        CustomToast('An Error Occured');
      }
    });
  };

  return (
    <View
      style={{
        width: constants.width,
        height: constants.height,
        backgroundColor: constants.background1,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: darkTheme
            ? constants.background1
            : constants.primary,
        }}>
        <Appbar.Header style={constants.header}>
          <Appbar.Content title="Friends" titleStyle={constants.headerText} />
          <Appbar.Action
            icon="menu"
            color="white"
            onPress={() => navigation.openDrawer()}
          />
        </Appbar.Header>
        <View style={{flex: 1, backgroundColor: constants.background1}}>
          <FlatList
            data={idList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <>
                <View style={{marginLeft: 10, marginBottom: 5}}>
                  <TouchableOpacity onPress={() => handleRemove(item)}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'crimson',
                        fontFamily: 'Helvetica',
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
                <FriendsList id={item} />
              </>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={constants.background2}
              />
            }
          />
        </View>
      </SafeAreaView>
      {Platform.OS === 'ios' ? (
        <View style={{height: 50, backgroundColor: constants.background1}} />
      ) : (
        <></>
      )}
    </View>
  );
}

function FriendsList({id}) {
  const [details, setDetails] = useState({
    username: '',
    description: '',
    profilePhoto: undefined,
  });

  useEffect(() => {
    getUserInfo(id).then((data) => {
      setDetails({
        username: data.username,
        description: data.description,
        profilePhoto: data.profilePhoto,
      });
    });
  }, []);

  return (
    <View style={{paddingVertical: 10}}>
      <Tile
        uri={details.profilePhoto}
        itemName="avatar"
        heading={details.username}
        subHeading={details.description}
      />
    </View>
  );
}
