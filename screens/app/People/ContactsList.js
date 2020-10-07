import React from 'react';
import {View, FlatList} from 'react-native';
import Contacts from 'react-native-contacts';
import {List} from 'react-native-paper';
import * as RNLocalize from 'react-native-localize';
import _ from 'lodash';
import dialCodes from '../../../assets/countries.json';
const dialingCode = _.find(dialCodes, ['countryCode', RNLocalize.getCountry()])
  .dialCode;

import {ThemeContext} from '../../../shared/Context';
import {getUserByPhone} from '../../../backend/database/apiCalls';

export default function ContactsList({navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [allContacts, setAllContacts] = React.useState([]);

  React.useEffect(() => {
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err) {
        throw err;
      }
      console.log(contacts.length);
      setAllContacts(contacts);
    });
  }, []);

  const renderItem = ({item}) => {
    if (
      item.phoneNumbers[0] === undefined ||
      item.phoneNumbers[0].number === undefined
    ) {
      return <></>;
    } else {
      return <ContactTile item={item.phoneNumbers[0].number} />;
    }
  };

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
  const [isUser, setIsUser] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState(item);

  React.useEffect(() => {
    if (phoneNumber[0] !== '+') {
      setPhoneNumber(dialingCode + phoneNumber);
    }
    const encodedPhoneNumber = phoneNumber
      .replace(/\+/gi, '%2B')
      .replace(/\s+/g, '');
    getUserByPhone(encodedPhoneNumber).then((response) => {
      if (response.message !== 'No such user exists') {
        setIsUser(true);
      }
    });
  }, []);

  return isUser ? (
    <List.Item
      title={phoneNumber}
      titleStyle={{color: 'white'}}
      descriptionStyle={{color: 'white'}}
    />
  ) : (
    <></>
  );
};
