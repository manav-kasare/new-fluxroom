import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FullPhoto from '../screens/app/ChatRoom/FullPhoto';
import HomeNavigator from './HomeNavigator';
import Search from '../screens/app/Search/Search';

const SearchStack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
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
