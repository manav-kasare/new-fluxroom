import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {List} from 'react-native-paper';

import CircleAvatar from '../../../shared/CircleAvatar';
import {ThemeContext, UserDetailsContext} from '../../../shared/Context';

export default function Friends({navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const [friends, setFriends] = React.useState([]);
  const {user} = React.useContext(UserDetailsContext);

  React.useEffect(() => {}, []);

  const renderItem = ({item}) => <RenderTile item={item} />;

  const navigateToFriendRequests = () => {
    navigation.navigate('FriendRequests');
  };

  const styles = StyleSheet.create({
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
    <View style={{flex: 1, backgroundColor: constants.background1}}>
      <View style={styles.view}>
        <TouchableOpacity
          onPress={navigateToFriendRequests}
          style={styles.view_touchable}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 5,
            }}>
            <Text style={styles.view_text}>Friend Requests</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={constants.text1} />
        </TouchableOpacity>
      </View>
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
