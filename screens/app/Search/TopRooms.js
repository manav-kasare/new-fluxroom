import React from 'react';
import {FlatList, Text, View} from 'react-native';

import SearchRenderTile from './SearchRenderTile';
import {ThemeContext} from '../../../shared/Context';
import il8n from '../../../locales/il8n';

export default function TopRooms({allRooms, navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [sortedRoomsList, setSortedRoomsList] = React.useState([]);
  const [_allRooms, _setAllRooms] = React.useState([]);

  React.useEffect(() => {
    setData();
    return () => {
      _setAllRooms([]);
    };
  }, []);

  const setData = () => {
    allRooms.map((room) => {
      _allRooms.push({...room, listOfUsersNumber: room.listOfUsers.length});
    });
    setSortedRoomsList(
      _allRooms.sort(
        (a, b) =>
          parseFloat(b.listOfUsersNumber) - parseFloat(a.listOfUsersNumber),
      ),
    );
    setSortedRoomsList(_allRooms.slice(0, 10));
  };

  const renderItem = ({item}) => (
    <SearchRenderTile room={item} navigation={navigation} />
  );
  const listHeaderComponent = () => (
    <View
      style={{
        width: constants.width,
        backgroundColor: darkTheme
          ? constants.background1
          : constants.background3,
        paddingLeft: 25,
        paddingVertical: 15,
      }}>
      <Text style={{color: constants.text1, fontSize: 22, fontWeight: '700'}}>
        {il8n.t('screens.popularRooms')}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={{flex: 1, height: 650}}
      ListHeaderComponent={listHeaderComponent}
      data={sortedRoomsList}
      renderItem={renderItem}
      keyExtractor={(key, index) => index.toString()}
    />
  );
}
