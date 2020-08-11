import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RoomFullPhoto from "../screens/app/ChatRoom/RoomFullPhoto";
import HomeNavigator from "./HomeNavigator";
import Search from "../screens/app/Search/Search";

const SearchStack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="RoomFullPhoto"
        component={RoomFullPhoto}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}
