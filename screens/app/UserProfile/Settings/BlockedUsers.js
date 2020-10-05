import React from 'react';
import {View, FlatList} from 'react-native';
import {List, Button} from 'react-native-paper';

import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../../shared/Context';
import {getUserMe} from '../../../../backend/database/apiCalls';

export default function BlockedUsers() {
  const {constants} = React.useContext(ThemeContext);
  const {token} = React.useContext(TokenContext);
  const [blockeUsers, setBlockedUsers] = React.useState([]);

  React.useEffect(() => {
    getUserMe(token).then((response) => {
      setBlockedUsers(response.blockeUsers);
    });
  }, []);

  const renderItem = ({item}) => <RenderTile item={item} />;

  return (
    <View style={{flex: 1, backgroundColor: constants.background1}}>
      <FlatList
        keyExtractor={(index) => index.toString()}
        data={blockeUsers}
        style={{flex: 1, width: constants.width}}
        renderItem={renderItem}
      />
    </View>
  );
}

const RenderTile = ({item}) => {
  const {constants} = React.useContext(ThemeContext);
  const {user} = React.useContext(UserDetailsContext);
  const [loading, setLoading] = React.useState(false);

  const handleRequest = () => {};

  const unBlockButton = () =>
    loading ? (
      <ActivityIndicator color={constants.primary} animating={true} />
    ) : (
      <Button color={constants.primary} onPress={handleRequest}>
        Unblock
      </Button>
    );

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
      right={unBlockButton}
    />
  );
};
