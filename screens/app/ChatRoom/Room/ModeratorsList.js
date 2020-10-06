import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import {ThemeContext} from '../../../../shared/Context';
import RoomUserOptions from './RoomUserOptions';
import RoomAvatar from './RoomAvatar';

export default function ModeratorsList({isVisible, setIsVisible}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [moderators, setModerators] = React.useState([]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item._id}
      onPress={user._id !== item ? toggleVisible : () => {}}>
      <RoomUserOptions isVisible={isVisible} setIsVisible={setIsVisible} />
      <RoomAvatar id={item} size={constants.width * 0.25} isHost={false} />
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: darkTheme ? constants.background3 : constants.primary,
    },
    columnWrapperStyle: {
      justifyContent: 'space-evenly',
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
        Moderators
      </Text>
      <FlatList
        data={moderators}
        numColumns={4}
        renderItem={renderItem}
        style={styles.flatList}
        keyExtractor={(index) => index.toString()}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </View>
  );
}
