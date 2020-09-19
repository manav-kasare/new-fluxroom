import React from 'react';
import {FlatList, Text, View, Animated} from 'react-native';

import SearchRenderTile from './SearchRenderTile';
import {ThemeContext} from '../../../shared/Context';

export default function TopRooms({allRooms, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const [sortedRoomsList, setSortedRoomsList] = React.useState([]);
  const [_allRooms, _setAllRooms] = React.useState([]);

  React.useEffect(() => {
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
  }, []);

  const renderItem = ({item}) => (
    <SearchRenderTile room={item} navigation={navigation} />
  );

  const listHeaderComponent = () => (
    <View
      style={{
        width: constants.width,

        backgroundColor: constants.background3,
        paddingLeft: 25,
        paddingVertical: 15,
      }}>
      <Text style={{color: constants.text1, fontSize: 22, fontWeight: '600'}}>
        Top Rooms
      </Text>
    </View>
  );

  return (
    <FlatList
      style={{flex: 1}}
      ListHeaderComponent={listHeaderComponent}
      data={sortedRoomsList}
      renderItem={renderItem}
      keyExtractor={(key, index) => index.toString()}
    />
  );
}
