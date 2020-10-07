import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import {ThemeContext, UserDetailsContext} from '../../../../shared/Context';
import RoomUserOptions from './RoomUserOptions';
import RoomAvatar from './RoomAvatar';

export default function ListenersList({
  isVisible,
  setIsVisible,
  listenersProp,
}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [listeners, setListeners] = React.useState(listenersProp);
  const {user} = React.useContext(UserDetailsContext);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item._id}
      onPress={user._id !== item ? toggleVisible : () => {}}>
      <RoomUserOptions isVisible={isVisible} setIsVisible={setIsVisible} />
      <RoomAvatar id={item} size={constants.width * 0.2} isHost={false} />
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: darkTheme ? constants.background3 : constants.primary,
    },
    columnWrapperStyle: {
      width: constants.width,
    },
    flatList: {backgroundColor: constants.background1},
    container: {
      marginTop: 25,
      marginLeft: 25,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{color: constants.text1, fontSize: 25, fontWeight: '700'}}>
        Listeners
      </Text>
      <FlatList
        data={listeners}
        numColumns={4}
        renderItem={renderItem}
        style={styles.flatList}
        keyExtractor={(index) => index.toString()}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </View>
  );
}
