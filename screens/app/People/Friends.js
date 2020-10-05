import React from 'react';
import {View, FlatList} from 'react-native';
import {ThemeContext, UserDetailsContext} from '../../../shared/Context';
import {List} from 'react-native-paper';
import CircleAvatar from '../../../shared/CircleAvatar';

export default function Friends() {
  const {constants} = React.useContext(ThemeContext);
  const [friends, setFriends] = React.useState([]);
  const {user} = React.useContext(UserDetailsContext);

  React.useEffect(() => {}, []);

  const renderItem = ({item}) => <RenderTile item={item} />;

  return (
    <View style={{flex: 1, backgroundColor: constants.background1}}>
      <FlatList
        style={{flex: 1}}
        data={friends}
        keyExtractor={(index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const RenderTile = ({item}) => {
  const {constants} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);

  const renderPhoto = () => <CircleAvatar uri={item.profilePic} size={50} />;

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
      left={renderPhoto}
      description={item.description}
      descriptionStyle={styles.description}
    />
  );
};
