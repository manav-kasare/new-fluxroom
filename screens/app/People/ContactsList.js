import React from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Contacts from 'react-native-contacts';
import {List} from 'react-native-paper';

import {ThemeContext} from '../../../shared/Context';
import {getUserByPhone} from '../../../backend/database/apiCalls';

export default function ContactsList({navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [allContacts, setAllContacts] = React.useState([]);

  React.useEffect(() => {
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      setAllContacts(contacts);
    });
  }, []);

  const renderItem = ({item}) => <ContactTile item={item} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkTheme
          ? constants.background1
          : constants.background3,
      }}>
      <FlatList style={{flex: 1}} data={allContacts} renderItem={renderItem} />
    </View>
  );
}

const ContactTile = ({item}) => {
  const [isUser, setIsUser] = React.useState(false);

  React.useEffect(() => {
    console.log(item.phoneNumbers[0].number);
    const encodedPhoneNumber = item.phoneNumbers[0].number.replace(
      /\+/gi,
      '%2B',
    );
    getUserByPhone(encodedPhoneNumber).then((response) => {
      if (response.message !== 'No such user exists') {
        setIsUser(true);
      }
    });
  }, []);

  return isUser ? (
    <List.Item
      title={item.givenName}
      description={item.phoneNumbers[0].number}
    />
  ) : (
    <></>
  );
};
