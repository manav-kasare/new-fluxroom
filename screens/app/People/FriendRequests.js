import React from 'react';
import {View, FlatList} from 'react-native';
import {List, Button} from 'react-native-paper';

import {ThemeContext} from '../../../shared/Context';

export default function FriendRequests({navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [friendRequests, setFriendRequests] = React.useState([]);

  const renderItem = ({item}) => <RenderTile item={item} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkTheme
          ? constants.background1
          : constants.background3,
      }}>
      <FlatList
        style={{flex: 1}}
        data={friendRequests}
        renderItem={renderItem}
      />
    </View>
  );
}

const RenderTile = ({item}) => {
  const {constants} = React.useContext(ThemeContext);

  const renderButtons = () => (
    <View style={{flexDirection: 'row'}}>
      <Button color={constants.primary}>Accept</Button>
      <Button color={constants.primary}>Decline</Button>
    </View>
  );

  return (
    <List.Item
      title={item.givenName}
      description={item.phoneNumbers[0].number}
      right={renderButtons}
    />
  );
};
