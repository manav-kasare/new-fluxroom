import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {ThemeContext} from '../../../shared/Context';

export default function RecentSearch() {
  const {constants} = React.useContext(ThemeContext);
  const [recentSearchList, setRecentSearchList] = React.useState([]);

  return (
    <FlatList
      data={recentSearchList}
      ListHeaderComponent={() => (
        <View>
          <Text
            style={{
              color: constants.text1,
              fontSize: 20,
              fontWeight: '500',
              marginLeft: 25,
            }}>
            Recent Searches
          </Text>
        </View>
      )}
      renderItem={({item}) => (
        <View
          style={{
            flexDirection: 'row',
            width: constants.width * 0.9,
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 25,
          }}>
          <Text
            style={{color: constants.text1, fontSize: 15, fontWeight: '400'}}>
            {item}
          </Text>
          <TouchableOpacity onPress={() => {}}></TouchableOpacity>
        </View>
      )}
    />
  );
}
