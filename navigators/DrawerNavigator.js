import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import EditProfile from "../screens/app/UserProfile/EditProfile";
import DrawerContent from "./DrawerContent";
import Friends from "../screens/app/UserProfile/Friends";
import JoinRoom from "../screens/app/JoinCreateRoom/JoinRoom";
import CreateRoom from "../screens/app/JoinCreateRoom/CreateRoom";
import SettingsNavigator from "./SettingsNavigator";
import HomeNavigator from "./HomeNavigator";
import constants from "../shared/constants";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      edgeWidth={constants.width}
      drawerType="back"
      drawerPosition="right"
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}
      drawerStyle={{
        width: constants.width * 0.2,
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="SettingsNavigator" component={SettingsNavigator} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Friends" component={Friends} />
      <Drawer.Screen name="JoinRoom" component={JoinRoom} />
      <Drawer.Screen name="CreateRoom" component={CreateRoom} />
    </Drawer.Navigator>
  );
}
