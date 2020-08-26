import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import FullPhoto from '../screens/app/ChatRoom/FullPhoto';
import HomeNavigator from './HomeNavigator';
import Search from '../screens/app/Search/Search';
import {ThemeContext} from '../shared/Context';
const SearchStack = createStackNavigator();

export default function SearchNavigator() {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: darkTheme ? constants.background1 : '#4640C1',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            height: 125,
          },
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: '700',
            fontFamily: 'Helvetica',
            color: 'white',
          },
        }}
      />
      <SearchStack.Screen
        name="FullPhoto"
        component={FullPhoto}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}
